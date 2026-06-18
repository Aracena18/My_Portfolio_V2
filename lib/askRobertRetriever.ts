import {
  KnowledgeSource,
  knowledgeSources,
} from "@/content/askRobert";

const stopWords = new Set([
  "a",
  "about",
  "and",
  "are",
  "as",
  "for",
  "from",
  "has",
  "have",
  "his",
  "how",
  "is",
  "me",
  "of",
  "on",
  "or",
  "robert",
  "show",
  "tell",
  "the",
  "to",
  "what",
  "with",
]);

export type RetrievedKnowledgeSource = KnowledgeSource & {
  snippet: string;
  score: number;
};

export function retrieveKnowledge(
  question: string,
  limit = 4,
): RetrievedKnowledgeSource[] {
  const terms = tokenize(question);

  if (terms.length === 0) {
    return knowledgeSources.slice(0, limit).map((source) => ({
      ...source,
      snippet: createSnippet(source.content),
      score: 0,
    }));
  }

  return knowledgeSources
    .map((source) => ({
      ...source,
      snippet: createSnippet(source.content),
      score: scoreSource(source, terms),
    }))
    .filter((source) => source.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function formatSourcesForModel(sources: RetrievedKnowledgeSource[]) {
  return sources
    .map(
      (source, index) =>
        `[${index + 1}] ${source.title}\nSection: ${source.section}\n` +
        `${source.projectId ? `Project ID: ${source.projectId}\n` : ""}` +
        `Content: ${source.snippet}`,
    )
    .join("\n\n");
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+/\s-]/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1 && !stopWords.has(term));
}

function scoreSource(source: KnowledgeSource, terms: string[]) {
  const title = source.title.toLowerCase();
  const haystack =
    `${source.title} ${source.content} ${source.tags.join(" ")}`.toLowerCase();

  return terms.reduce((score, term) => {
    if (source.tags.some((tag) => tag.includes(term))) return score + 4;
    if (title.includes(term)) return score + 3;
    if (haystack.includes(term)) return score + 1;
    return score;
  }, 0);
}

function createSnippet(content: string, maxLength = 900) {
  const normalized = content.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trim()}...`;
}
