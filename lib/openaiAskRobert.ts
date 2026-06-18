import { AssistantPortfolioResponse } from "@/content/askRobert";
import {
  AssistantMode,
  retrieveKnowledge,
  validateAssistantResponse,
} from "@/lib/askRobertEngine";

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
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

export async function answerWithOpenAI({
  question,
  mode,
  fallback,
}: {
  question: string;
  mode: AssistantMode;
  fallback: AssistantPortfolioResponse;
}) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const sources = retrieveKnowledge(question, 6);
  const sourceText = sources
    .map(
      (source) =>
        `Source: ${source.title}\nSection: ${source.section}\nContent: ${source.content}`,
    )
    .join("\n\n");

  const result = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Ask Robert, the AI portfolio assistant for Robert Jhon D. Aracena. Only answer using the provided portfolio sources. Do not invent achievements, links, employers, awards, metrics, contact details, or project results. If the source material is missing something, say the portfolio does not currently prove it. Keep answers concise, recruiter-friendly, and honest. Never claim to send messages or perform external actions.",
        },
        {
          role: "user",
          content:
            `Assistant mode: ${mode}\n\nQuestion:\n${question}\n\nPortfolio sources:\n${sourceText}\n\nReturn only the structured JSON response.`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "ask_robert_response",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!result.ok) {
    throw new Error(`OpenAI provider failed with ${result.status}`);
  }

  const payload = (await result.json()) as OpenAIResponsePayload;
  const text =
    payload.output_text ??
    payload.output?.flatMap((item) => item.content ?? []).find((item) => item.text)
      ?.text;

  if (!text) {
    throw new Error("OpenAI provider did not return text output.");
  }

  const parsed = JSON.parse(text) as unknown;

  return validateAssistantResponse(parsed, {
    ...fallback,
    sources: fallback.sources ?? sources.map((source) => source.title),
  });
}
