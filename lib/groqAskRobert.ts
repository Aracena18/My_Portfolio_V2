import "server-only";

import { AssistantPortfolioResponse } from "@/content/askRobert";
import { AssistantMode, validateAssistantResponse } from "@/lib/askRobertEngine";
import {
  formatSourcesForModel,
  retrieveKnowledge,
} from "@/lib/askRobertRetriever";

type GroqChatCompletionPayload = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

const responseSchema = {
  type: "object",
  properties: {
    answer: { type: "string" },
    targetSection: {
      type: "string",
      enum: [
        "about",
        "projects",
        "skills",
        "resume",
        "timeline",
        "contact",
        "recruiter",
      ],
    },
    targetProjectId: {
      type: ["string", "null"],
    },
    sources: {
      type: "array",
      items: { type: "string" },
    },
    suggestedFollowUps: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "answer",
    "targetSection",
    "targetProjectId",
    "sources",
    "suggestedFollowUps",
  ],
  additionalProperties: false,
};

export async function answerWithGroq({
  question,
  mode,
  fallback,
}: {
  question: string;
  mode: AssistantMode;
  fallback: AssistantPortfolioResponse;
}) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.GROQ_MODEL ?? "openai/gpt-oss-20b";
  const sources = retrieveKnowledge(question, 6);
  const sourceText = formatSourcesForModel(sources);

  const result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.35,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content:
            "You are Ask Robert, the AI portfolio assistant for Robert Jhon D. Aracena. " +
            "Answer only from the provided curated portfolio sources. Be conversational, concise, and recruiter-friendly. " +
            "Do not invent awards, links, employers, metrics, contact details, private details, production outcomes, or qualifications. " +
            "If the sources do not prove something, say the portfolio does not currently prove it. " +
            "Never claim to send messages or perform external actions. " +
            "Choose the targetSection and targetProjectId that should open in the portfolio UI. " +
            "Always provide 3 to 4 concise suggestedFollowUps a recruiter can click next. " +
            "Make each follow-up a complete question or command about Robert's proof, projects, skills, role fit, resume, or contact options.",
        },
        {
          role: "user",
          content:
            `Assistant mode: ${mode}\n\n` +
            `Question:\n${question}\n\n` +
            `Curated portfolio sources:\n${sourceText || "No matching curated source was found."}\n\n` +
            "Return only a JSON object with this exact shape: " +
            "{ answer: string, targetSection: about|projects|skills|resume|timeline|contact|recruiter, " +
            "targetProjectId: string|null, sources: string[], suggestedFollowUps: string[] }.",
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ask_robert_response",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!result.ok) {
    throw new Error(`Groq provider failed with ${result.status}`);
  }

  const payload = (await result.json()) as GroqChatCompletionPayload;
  const text = payload.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("Groq provider did not return text output.");
  }

  const parsed = JSON.parse(stripJsonFence(text)) as unknown;
  const validated = validateAssistantResponse(parsed, {
    ...fallback,
    sources: fallback.sources ?? sources.map((source) => source.title),
  });

  return {
    ...validated,
    sources: normalizeProviderSources(validated.sources, sources, fallback.sources),
  };
}

function stripJsonFence(value: string) {
  return value
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function normalizeProviderSources(
  candidateSources: string[] | undefined,
  retrievedSources: ReturnType<typeof retrieveKnowledge>,
  fallbackSources: string[] | undefined,
) {
  const sourceTitles = retrievedSources.map((source) => source.title);
  const normalized = (candidateSources ?? [])
    .map((source) => {
      const value = source.trim();
      const numericReference = value.match(/^\[?(\d+)\]?$/);

      if (numericReference) {
        const index = Number(numericReference[1]) - 1;
        return sourceTitles[index];
      }

      return sourceTitles.find(
        (title) => title.toLowerCase() === value.toLowerCase(),
      );
    })
    .filter((source): source is string => Boolean(source));

  if (normalized.length > 0) {
    return Array.from(new Set(normalized));
  }

  return fallbackSources?.length ? fallbackSources : sourceTitles;
}
