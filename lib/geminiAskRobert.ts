import "server-only";

import { AssistantPortfolioResponse } from "@/content/askRobert";
import { AssistantMode, validateAssistantResponse } from "@/lib/askRobertEngine";
import {
  formatSourcesForModel,
  retrieveKnowledge,
} from "@/lib/askRobertRetriever";

type GeminiResponsePayload = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

const responseSchema = {
  type: "OBJECT",
  properties: {
    answer: { type: "STRING" },
    targetSection: {
      type: "STRING",
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
      type: "STRING",
      nullable: true,
    },
    sources: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
    suggestedFollowUps: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
  },
  required: [
    "answer",
    "targetSection",
    "targetProjectId",
    "sources",
    "suggestedFollowUps",
  ],
  propertyOrdering: [
    "answer",
    "targetSection",
    "targetProjectId",
    "sources",
    "suggestedFollowUps",
  ],
};

export async function answerWithGemini({
  question,
  mode,
  fallback,
}: {
  question: string;
  mode: AssistantMode;
  fallback: AssistantPortfolioResponse;
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-flash-latest";
  const sources = retrieveKnowledge(question, 6);
  const sourceText = formatSourcesForModel(sources);
  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/` +
    `${encodeURIComponent(model)}:generateContent`;

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text:
              "You are Ask Robert, the AI portfolio assistant for Robert Jhon D. Aracena. " +
              "Answer only from the provided curated portfolio sources. Be conversational, concise, and recruiter-friendly. " +
              "Do not invent awards, links, employers, metrics, contact details, private details, production outcomes, or qualifications. " +
              "If the sources do not prove something, say the portfolio does not currently prove it. " +
              "Never claim to send messages or perform external actions. " +
              "Choose the targetSection and targetProjectId that should open in the portfolio UI.",
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                `Assistant mode: ${mode}\n\n` +
                `Question:\n${question}\n\n` +
                `Curated portfolio sources:\n${sourceText || "No matching curated source was found."}\n\n` +
                "Return only the JSON object that matches the provided schema.",
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens: 900,
        responseMimeType: "application/json",
        responseSchema,
      },
    }),
  });

  if (!result.ok) {
    throw new Error(`Gemini provider failed with ${result.status}`);
  }

  const payload = (await result.json()) as GeminiResponsePayload;
  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini provider did not return text output.");
  }

  const parsed = JSON.parse(stripJsonFence(text)) as unknown;

  return validateAssistantResponse(parsed, {
    ...fallback,
    sources: fallback.sources ?? sources.map((source) => source.title),
  });
}

function stripJsonFence(value: string) {
  return value
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}
