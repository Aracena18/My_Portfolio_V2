import {
  AssistantPortfolioResponse,
  contactTemplates,
  contactOptions,
  getAssistantResponse,
  projects,
  robertProfile,
  roleFits,
  skillGroups,
} from "@/content/askRobert";
import {
  RetrievedKnowledgeSource,
  retrieveKnowledge,
} from "@/lib/askRobertRetriever";

export type AssistantMode =
  | "guide"
  | "recruiter"
  | "project-explainer"
  | "ux-critic"
  | "opportunity-fit"
  | "contact";

export type AskRobertRequest = {
  question: string;
  mode?: AssistantMode;
};

const portfolioSections = new Set([
  "about",
  "projects",
  "skills",
  "resume",
  "timeline",
  "contact",
  "recruiter",
]);

export function answerAskRobert({
  question,
  mode = "guide",
}: AskRobertRequest): AssistantPortfolioResponse {
  const cleanQuestion = question.trim();
  const normalized = cleanQuestion.toLowerCase();
  const retrieved = retrieveKnowledge(cleanQuestion);

  if (isClearlyUnsupported(normalized)) {
    return withSources(getAssistantResponse(cleanQuestion), retrieved);
  }

  if (mode === "opportunity-fit" || isJobDescriptionQuestion(normalized)) {
    return withSources(analyzeOpportunityFit(cleanQuestion), retrieved);
  }

  if (mode === "contact" || isContactDraftQuestion(normalized)) {
    return withSources(createContactDraft(cleanQuestion), retrieved);
  }

  if (isProjectListQuestion(normalized)) {
    return withSources(listProjects(), retrieved);
  }

  if (mode === "project-explainer" || normalized.includes("explain")) {
    return withSources(explainProject(cleanQuestion), retrieved);
  }

  if (mode === "ux-critic" || normalized.includes("design decision")) {
    return withSources(explainUxThinking(cleanQuestion), retrieved);
  }

  if (mode === "recruiter") {
    return withSources(createRecruiterSummary(), retrieved);
  }

  return withSources(getAssistantResponse(cleanQuestion), retrieved);
}

export function validateAssistantResponse(
  value: unknown,
  fallback: AssistantPortfolioResponse,
): AssistantPortfolioResponse {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const candidate = value as Partial<AssistantPortfolioResponse>;
  const targetSection =
    typeof candidate.targetSection === "string" &&
    portfolioSections.has(candidate.targetSection)
      ? candidate.targetSection
      : fallback.targetSection;

  return {
    answer:
      typeof candidate.answer === "string" && candidate.answer.trim()
        ? candidate.answer.slice(0, 1600)
        : fallback.answer,
    targetSection: targetSection as AssistantPortfolioResponse["targetSection"],
    targetProjectId:
      typeof candidate.targetProjectId === "string"
        ? candidate.targetProjectId
        : fallback.targetProjectId,
    sources: Array.isArray(candidate.sources)
      ? candidate.sources
          .filter((source): source is string => typeof source === "string")
          .slice(0, 6)
      : fallback.sources,
    suggestedFollowUps: Array.isArray(candidate.suggestedFollowUps)
      ? candidate.suggestedFollowUps
          .filter((followUp): followUp is string => typeof followUp === "string")
          .slice(0, 4)
      : fallback.suggestedFollowUps,
  };
}

function withSources(
  response: AssistantPortfolioResponse,
  sources: RetrievedKnowledgeSource[],
): AssistantPortfolioResponse {
  const sourceTitles = sources.map((source) => source.title);

  return {
    ...response,
    sources:
      response.sources && response.sources.length > 0
        ? response.sources
        : sourceTitles,
  };
}

function isJobDescriptionQuestion(normalized: string) {
  return (
    normalized.includes("job description") ||
    normalized.includes("jd") ||
    normalized.includes("requirements") ||
    normalized.includes("role match") ||
    normalized.includes("fit analysis")
  );
}

function isContactDraftQuestion(normalized: string) {
  return (
    normalized.includes("draft") ||
    normalized.includes("message") ||
    normalized.includes("reach out") ||
    normalized.includes("email")
  );
}

export function isProjectListQuestion(normalized: string) {
  const asksForProjects =
    normalized.includes("project") ||
    normalized.includes("built") ||
    normalized.includes("build") ||
    normalized.includes("portfolio work") ||
    normalized.includes("case stud");
  const asksForList =
    normalized.includes("show") ||
    normalized.includes("list") ||
    normalized.includes("what") ||
    normalized.includes("which") ||
    normalized.includes("all");
  const asksForSpecificProject = projects.some(
    (project) =>
      normalized.includes(project.id) ||
      normalized.includes(project.title.toLowerCase()),
  );

  return asksForProjects && asksForList && !asksForSpecificProject;
}

function isClearlyUnsupported(normalized: string) {
  const unsupportedSignals = [
    "favorite",
    "birthday",
    "movie",
    "relationship",
    "salary expectation",
    "private",
    "password",
    "secret",
  ];
  const portfolioSignals = [
    "project",
    "skill",
    "resume",
    "hire",
    "role",
    "job",
    "internship",
    "contact",
    "ai",
    "agriculture",
    "ui",
    "ux",
    "hackathon",
  ];

  return (
    unsupportedSignals.some((signal) => normalized.includes(signal)) &&
    !portfolioSignals.some((signal) => normalized.includes(signal))
  );
}

function listProjects(): AssistantPortfolioResponse {
  return {
    targetSection: "projects",
    answer:
      `Robert's portfolio currently includes ${projects.length} projects:\n\n` +
      projects
        .map(
          (project, index) =>
            `${index + 1}. ${project.title} - ${project.summary} Robert's role: ${project.role}.`,
        )
        .join("\n\n"),
    sources: projects.map((project) => `${project.title} Project`),
    suggestedFollowUps: [
      "Explain TanimPro",
      "Explain AgriSense",
      "Show UI/UX and hackathon experience",
    ],
  };
}

function analyzeOpportunityFit(question: string): AssistantPortfolioResponse {
  const normalized = question.toLowerCase();
  const allSkills = skillGroups.flatMap((group) => group.skills);
  const matchedSkills = allSkills.filter((skill) =>
    normalized.includes(skill.toLowerCase()),
  );
  const matchedProjects = projects.filter((project) =>
    [
      project.title,
      project.category,
      project.summary,
      project.techStack.join(" "),
      project.highlights.join(" "),
    ]
      .join(" ")
      .toLowerCase()
      .split(/\s+/)
      .some((term) => normalized.includes(term) && term.length > 3),
  );

  const skillText =
    matchedSkills.length > 0
      ? matchedSkills.slice(0, 8).join(", ")
      : "frontend development, UI/UX, AI assistant thinking, system analysis, research, and documentation";
  const projectText =
    matchedProjects.length > 0
      ? matchedProjects.map((project) => project.title).join(", ")
      : "TanimPro, ARCriculture, RealiTech, ARMS, and AgriSense";
  const roleFit = roleFits.find((fit) =>
    normalized.includes(fit.role.toLowerCase().split(" ")[0]),
  );
  const detectedGaps = [
    normalized.includes("cloud") || normalized.includes("certification")
      ? "Cloud certification is not currently proven by the portfolio."
      : "",
    normalized.includes("senior") || normalized.includes("advanced backend")
      ? "Senior-level backend ownership is not currently proven by the portfolio."
      : "",
    normalized.includes("production") || normalized.includes("professional experience")
      ? "Production employment history should be confirmed with Robert directly."
      : "",
  ].filter(Boolean);
  const gapText = [
    ...(roleFit?.gaps ?? []),
    ...detectedGaps,
  ].join(" ") || "If the role requires production employment history, advanced backend ownership, cloud certifications, or tools not listed in the portfolio, the current portfolio does not prove those yet.";

  return {
    targetSection: "recruiter",
    answer:
      `Role match summary: Robert appears strongest for opportunities involving ${skillText}. Relevant project proof includes ${projectText}. ` +
      `Possible gaps should be checked honestly against the job description: ${gapText} Recommended review path: recruiter summary, skills, then the most relevant project case study.`,
    suggestedFollowUps: [
      "Show relevant projects",
      "Show technical skills",
      "Draft an internship message",
    ],
  };
}

function createContactDraft(question: string): AssistantPortfolioResponse {
  const purpose =
    contactOptions.find((option) =>
      question.toLowerCase().includes(option.toLowerCase().split(" ")[0]),
    ) ?? "professional opportunity";
  const template = contactTemplates.find(
    (item) => item.purpose.toLowerCase() === purpose.toLowerCase(),
  );

  return {
    targetSection: "contact",
    answer:
      `Here is a message draft for ${withArticle(purpose.toLowerCase())}:\n\nSubject: ${template?.subject ?? "Professional opportunity for Robert Jhon Aracena"}\n\n${template?.message ?? "Hi Robert, I found your portfolio and was interested in your work across AI, agriculture technology, UI/UX, and practical software systems. I would like to discuss a possible professional opportunity and learn more about your project experience, especially the work shown in Ask Robert. Please let me know the best way to connect."}\n\nThe assistant only prepares this draft; it does not send anything automatically.`,
    suggestedFollowUps: [
      "View resume",
      "Show project proof",
      "Why should we hire Robert?",
    ],
  };
}

function withArticle(value: string) {
  return /^[aeiou]/.test(value) ? `an ${value}` : `a ${value}`;
}

function explainProject(question: string): AssistantPortfolioResponse {
  const normalized = question.toLowerCase();
  const project =
    projects.find(
      (item) =>
        normalized.includes(item.id) ||
        normalized.includes(item.title.toLowerCase()),
    ) ?? projects[0];

  return {
    targetSection: "projects",
    targetProjectId: project.id,
    answer:
      `${project.title} is best understood as ${project.summary} Robert's role was ${project.role}. ` +
      `The key proof points are: ${project.highlights.join(" ")} Tech direction: ${project.techStack.join(", ")}. ` +
      "A recruiter should look at the project card and case-study route to understand the problem, Robert's role, and the value of the solution.",
    suggestedFollowUps: [
      `Open ${project.title} case study`,
      "Show related skills",
      "Why is this useful for recruiters?",
    ],
  };
}

function explainUxThinking(question: string): AssistantPortfolioResponse {
  const normalized = question.toLowerCase();
  const uxProjects = projects.filter(
    (project) =>
      project.category === "UI/UX + Hackathon" ||
      project.techStack.some((tech) => tech.toLowerCase().includes("ui")),
  );
  const targetProject = normalized.includes("realitech")
    ? projects.find((project) => project.id === "realitech")
    : uxProjects[0];

  return {
    targetSection: "projects",
    targetProjectId: targetProject?.id,
    answer:
      "Robert's UX direction emphasizes clarity, guided flows, and reducing the amount of thinking a visitor or user has to do before taking action. RealiTech is the strongest UI/UX proof because it shows interface decisions and product communication under hackathon constraints. The Ask Robert rebrand follows the same idea: suggested prompts, short answers, and visible proof sections.",
    suggestedFollowUps: [
      "Show RealiTech",
      "Show skills overview",
      "Why hire Robert for UI/UX?",
    ],
  };
}

function createRecruiterSummary(): AssistantPortfolioResponse {
  return {
    targetSection: "recruiter",
    answer:
      `${robertProfile.name} is strongest for roles that need a student builder who can connect frontend implementation, UI/UX thinking, AI assistant concepts, agriculture technology, and practical system design. ` +
      "The clearest proof path is: review the skills panel, inspect TanimPro or ARCriculture for AI + agriculture direction, inspect RealiTech for UX and hackathon experience, then inspect ARMS for workflow and system-design thinking.",
    suggestedFollowUps: [
      "Analyze this job description",
      "Show project proof",
      "Draft an internship message",
    ],
  };
}
