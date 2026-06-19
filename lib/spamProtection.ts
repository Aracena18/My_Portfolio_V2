type SpamRecord = {
  normalizedQuestion: string;
  createdAt: number;
};

type ClientSpamState = {
  records: SpamRecord[];
  blockedUntil: number;
};

type SpamCheckResult =
  | {
      allowed: true;
    }
  | {
      allowed: false;
      reason: string;
      status: 400 | 429;
      retryAfterSeconds: number;
      message: string;
    };

const spamStates = new Map<string, ClientSpamState>();

const burstWindowMs = 15_000;
const duplicateWindowMs = 90_000;
const stateTtlMs = 10 * 60_000;
const maxBurstMessages = 6;
const maxDuplicateMessages = 3;
const blockDurationMs = 60_000;

export function checkQuestionSpam({
  key,
  question,
}: {
  key: string;
  question: string;
}): SpamCheckResult {
  const now = Date.now();
  const normalizedQuestion = normalizeQuestion(question);
  const state = getSpamState(key, now);

  if (state.blockedUntil > now) {
    return blockResult({
      reason: "temporary-block",
      retryAfterMs: state.blockedUntil - now,
    });
  }

  const contentViolation = detectSpamContent(question, normalizedQuestion);

  if (contentViolation) {
    state.blockedUntil = now + contentViolation.blockMs;
    return blockResult({
      reason: contentViolation.reason,
      retryAfterMs: contentViolation.blockMs,
      status: contentViolation.status,
      message: contentViolation.message,
    });
  }

  state.records = state.records.filter(
    (record) => now - record.createdAt <= stateTtlMs,
  );

  const recentBurstCount = state.records.filter(
    (record) => now - record.createdAt <= burstWindowMs,
  ).length;

  if (recentBurstCount >= maxBurstMessages) {
    state.blockedUntil = now + blockDurationMs;
    return blockResult({
      reason: "rapid-burst",
      retryAfterMs: blockDurationMs,
    });
  }

  const duplicateCount = state.records.filter(
    (record) =>
      record.normalizedQuestion === normalizedQuestion &&
      now - record.createdAt <= duplicateWindowMs,
  ).length;

  if (duplicateCount >= maxDuplicateMessages - 1) {
    state.blockedUntil = now + blockDurationMs;
    return blockResult({
      reason: "duplicate-question",
      retryAfterMs: blockDurationMs,
      message:
        "That question has been sent repeatedly. Please wait a minute before trying again.",
    });
  }

  state.records.push({
    normalizedQuestion,
    createdAt: now,
  });

  return {
    allowed: true,
  };
}

function getSpamState(key: string, now: number) {
  cleanupExpiredStates(now);

  const existing = spamStates.get(key);

  if (existing) {
    return existing;
  }

  const state: ClientSpamState = {
    records: [],
    blockedUntil: 0,
  };

  spamStates.set(key, state);
  return state;
}

function cleanupExpiredStates(now: number) {
  if (spamStates.size < 500) return;

  for (const [key, state] of spamStates.entries()) {
    const hasRecentRecord = state.records.some(
      (record) => now - record.createdAt <= stateTtlMs,
    );

    if (!hasRecentRecord && state.blockedUntil <= now) {
      spamStates.delete(key);
    }
  }
}

function detectSpamContent(
  question: string,
  normalizedQuestion: string,
):
  | {
      reason: string;
      blockMs: number;
      status: 400 | 429;
      message?: string;
    }
  | null {
  const urlCount = (question.match(/https?:\/\/|www\./gi) ?? []).length;

  if (question.length > 1200) {
    return {
      reason: "message-too-long",
      blockMs: 20_000,
      status: 400,
      message:
        "That message is too long for the portfolio assistant. Please ask a shorter, specific question about Robert.",
    };
  }

  if (urlCount > 2) {
    return {
      reason: "too-many-links",
      blockMs: blockDurationMs,
      status: 429,
      message:
        "That looks like link spam. Please send a normal portfolio question without multiple links.",
    };
  }

  if (/(.)\1{24,}/.test(normalizedQuestion)) {
    return {
      reason: "repeated-characters",
      blockMs: blockDurationMs,
      status: 429,
    };
  }

  const tokens = normalizedQuestion.split(/\s+/).filter(Boolean);
  const repeatedTokenCount = countMostCommonToken(tokens);

  if (tokens.length >= 25 && repeatedTokenCount / tokens.length > 0.65) {
    return {
      reason: "repeated-words",
      blockMs: blockDurationMs,
      status: 429,
    };
  }

  return null;
}

function normalizeQuestion(question: string) {
  return question
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s?!.@:/-]/gu, "")
    .trim();
}

function countMostCommonToken(tokens: string[]) {
  const counts = new Map<string, number>();
  let max = 0;

  for (const token of tokens) {
    const count = (counts.get(token) ?? 0) + 1;
    counts.set(token, count);
    max = Math.max(max, count);
  }

  return max;
}

function blockResult({
  reason,
  retryAfterMs,
  status = 429,
  message = "The assistant is receiving messages too quickly. Please wait a moment and try again.",
}: {
  reason: string;
  retryAfterMs: number;
  status?: 400 | 429;
  message?: string;
}): SpamCheckResult {
  return {
    allowed: false,
    reason,
    status,
    retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    message,
  };
}
