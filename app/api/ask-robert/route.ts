import { NextRequest, NextResponse } from "next/server";
import {
  AssistantMode,
  answerAskRobert,
  isProjectListQuestion,
} from "@/lib/askRobertEngine";
import { answerWithGroq } from "@/lib/groqAskRobert";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";
import { checkQuestionSpam } from "@/lib/spamProtection";

const validModes = new Set<AssistantMode>([
  "guide",
  "recruiter",
  "project-explainer",
  "ux-critic",
  "opportunity-fit",
  "contact",
]);

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 12;

export function GET() {
  return NextResponse.json({
    ok: true,
    name: "Ask Robert API",
    aiEnabled:
      process.env.AI_PORTFOLIO_ENABLED === "true" && Boolean(process.env.GROQ_API_KEY),
    provider: "groq",
    fallback: "local-rag-fallback",
  });
}

export async function POST(request: NextRequest) {
  try {
    const clientKey = getClientKey(request);
    const rateLimit = checkRateLimit({
      key: clientKey,
      limit: rateLimitMaxRequests,
      windowMs: rateLimitWindowMs,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many assistant requests. Please wait a moment and try again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimit.resetAt - Date.now()) / 1000,
            ).toString(),
            "X-RateLimit-Limit": rateLimitMaxRequests.toString(),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: "Invalid assistant request.",
        },
        { status: 400 },
      );
    }

    const question =
      typeof body.question === "string" ? body.question.slice(0, 4000) : "";
    const requestedMode =
      typeof body.mode === "string" && validModes.has(body.mode)
        ? (body.mode as AssistantMode)
        : "guide";

    if (!question.trim()) {
      return NextResponse.json(
        {
          error: "Question is required.",
        },
        { status: 400 },
      );
    }

    const spamCheck = checkQuestionSpam({
      key: clientKey,
      question,
    });

    if (!spamCheck.allowed) {
      return NextResponse.json(
        {
          error: spamCheck.message,
          reason: spamCheck.reason,
        },
        {
          status: spamCheck.status,
          headers: {
            "Retry-After": spamCheck.retryAfterSeconds.toString(),
          },
        },
      );
    }

    const localResponse = answerAskRobert({
      question,
      mode: requestedMode,
    });
    const shouldUseProvider =
      process.env.AI_PORTFOLIO_ENABLED === "true" &&
      Boolean(process.env.GROQ_API_KEY) &&
      !isProjectListQuestion(question.toLowerCase());
    const providerResponse = shouldUseProvider
      ? await answerWithGroq({
          question,
          mode: requestedMode,
          fallback: localResponse,
        }).catch(() => null)
      : null;
    const response = providerResponse ?? localResponse;

    return NextResponse.json({
      ...response,
      mode: requestedMode,
      aiEnabled: shouldUseProvider,
      engine: providerResponse ? "groq-rag" : "local-rag-fallback",
      rateLimit: {
        remaining: rateLimit.remaining,
        resetAt: rateLimit.resetAt,
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "The assistant could not process that request. The local portfolio sections are still available.",
      },
      { status: 500 },
    );
  }
}
