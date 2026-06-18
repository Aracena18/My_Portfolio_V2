export type PortfolioSection =
  | "about"
  | "projects"
  | "skills"
  | "resume"
  | "timeline"
  | "contact"
  | "recruiter";

export type ProjectCategory =
  | "AI + Agriculture"
  | "UI/UX + Hackathon"
  | "Systems"
  | "IoT + Edge AI";

export type RobertProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  role: string;
  techStack: string[];
  highlights: string[];
  proof: string;
  route?: string;
};

export type SuggestedPrompt = {
  label: string;
  prompt: string;
  targetSection: PortfolioSection;
};

export type AssistantPortfolioResponse = {
  answer: string;
  targetSection: PortfolioSection;
  targetProjectId?: string;
  sources?: string[];
  suggestedFollowUps: string[];
};

export type KnowledgeSource = {
  id: string;
  title: string;
  section: PortfolioSection;
  projectId?: string;
  content: string;
  tags: string[];
};

export type ResumeHighlight = {
  label: string;
  value: string;
  detail: string;
  relatedSection: PortfolioSection;
};

export type RoleFit = {
  role: string;
  match: string;
  proof: string[];
  gaps: string[];
};

export type ContactTemplate = {
  purpose: string;
  subject: string;
  message: string;
};

export const robertProfile = {
  name: "Robert Jhon D. Aracena",
  productName: "Ask Robert",
  title:
    "Computer Science Student, Developer, UI/UX Designer, and AI + AgriTech Builder",
  location: "Davao City, Philippines",
  university: "University of Mindanao",
  college: "College of Computing Education",
  program: "BS Computer Science",
  summary:
    "Robert Jhon D. Aracena is a Computer Science student from the University of Mindanao who builds practical software around AI, agriculture technology, UI/UX design, systems thinking, and community-centered innovation.",
  strengths: [
    "Software development",
    "UI/UX design",
    "AI-assisted systems",
    "Agriculture technology",
    "IoT and edge concepts",
    "Research and documentation",
    "Leadership and project coordination",
  ],
};

export const projects: RobertProject[] = [
  {
    id: "tanimpro",
    title: "TanimPro",
    category: "AI + Agriculture",
    summary:
      "An agriculture-focused platform concept designed to help farmers through AI, IoT, and accessible digital workflows.",
    role: "Developer, Designer, and Concept Lead",
    techStack: ["React", "Tailwind CSS", "AI concepts", "IoT concepts"],
    highlights: [
      "Frames real agricultural problems as usable digital workflows.",
      "Prioritizes farmer accessibility instead of technology for its own sake.",
      "Connects AI guidance with practical farm decision support.",
    ],
    proof:
      "Shows Robert's direction in community-centered AI and agriculture technology.",
    route: "/projects/tanimpro",
  },
  {
    id: "agrisense",
    title: "AgriSense",
    category: "IoT + Edge AI",
    summary:
      "A tomato disease diagnosis assistant direction combining AI, retrieval, and edge-device thinking for farm contexts.",
    role: "AI and system concept builder",
    techStack: ["Python", "RAG concepts", "Computer vision", "Edge AI"],
    highlights: [
      "Focuses on fast crop disease support for farmers.",
      "Connects AI answers to agriculture knowledge sources.",
      "Explores offline and edge-friendly deployment constraints.",
    ],
    proof:
      "Shows Robert's interest in applying AI where connectivity and expert access can be limited.",
    route: "/projects/agrisense",
  },
  {
    id: "realitech",
    title: "RealiTech",
    category: "UI/UX + Hackathon",
    summary:
      "A hackathon project recognized for strong user experience and interface design.",
    role: "Project Manager and UI/UX Contributor",
    techStack: ["Figma", "UI/UX", "Web development", "Presentation"],
    highlights: [
      "Recognized for strong UX interface direction.",
      "Built under hackathon constraints with fast decisions.",
      "Shows Robert's ability to guide product thinking and team output.",
    ],
    proof:
      "Useful for recruiters evaluating Robert's design thinking, collaboration, and execution under time pressure.",
    route: "/projects/realitech",
  },
  {
    id: "arcriculture",
    title: "ARCriculture",
    category: "AI + Agriculture",
    summary:
      "An AI-powered agriculture assistant concept focused on helping farmers make better decisions.",
    role: "Concept Developer and UI Designer",
    techStack: ["AI assistant design", "Prompt engineering", "UI/UX"],
    highlights: [
      "Centers the assistant experience around practical farmer questions.",
      "Connects agriculture support with approachable conversational UI.",
      "Explores how AI can guide users without overwhelming them.",
    ],
    proof:
      "Shows Robert's ability to turn AI concepts into user-facing product ideas.",
    route: "/projects/arcriculture",
  },
  {
    id: "arms",
    title: "ARMS",
    category: "Systems",
    summary:
      "An Auto Repair Management System for organizing repair shop services, records, and operations.",
    role: "Developer and System Designer",
    techStack: ["Web development", "Database design", "System analysis"],
    highlights: [
      "Models a real business workflow as a structured system.",
      "Highlights Robert's practical full-stack and database thinking.",
      "Focuses on operations, records, and service management.",
    ],
    proof:
      "Good evidence for system design, business workflow understanding, and implementation planning.",
    route: "/projects/arms",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend + Systems",
    skills: ["Database design", "API planning", "System analysis", "Workflow modeling"],
  },
  {
    title: "AI + Data",
    skills: ["AI assistants", "RAG concepts", "Prompt engineering", "Computer vision"],
  },
  {
    title: "Design",
    skills: ["Figma", "UI/UX", "Wireframing", "Prototyping", "User flows"],
  },
  {
    title: "Professional",
    skills: ["Leadership", "Research", "Documentation", "Project management"],
  },
];

export const timeline = [
  {
    label: "Education",
    value: "BS Computer Science at the University of Mindanao.",
  },
  {
    label: "Product Direction",
    value:
      "Builds around AI, agriculture technology, software systems, and accessible user experiences.",
  },
  {
    label: "Team Experience",
    value:
      "Has project management and hackathon experience, including UI/UX-focused work.",
  },
];

export const contactOptions = [
  "Internship opportunity",
  "Collaboration",
  "Freelance design",
  "Hackathon team",
  "Academic or school event",
  "General message",
];

export const resumeHighlights: ResumeHighlight[] = [
  {
    label: "Education",
    value: "BS Computer Science",
    detail:
      "Currently positioned around software development, systems thinking, UI/UX, and AI/agriculture technology.",
    relatedSection: "about",
  },
  {
    label: "Technical Direction",
    value: "Frontend + Systems",
    detail:
      "React, Next.js, TypeScript, Tailwind CSS, database design, API planning, and workflow modeling.",
    relatedSection: "skills",
  },
  {
    label: "AI Direction",
    value: "Assistant + AgriTech Concepts",
    detail:
      "TanimPro, ARCriculture, and AgriSense show a focus on useful, grounded AI experiences for agriculture contexts.",
    relatedSection: "projects",
  },
  {
    label: "Design Direction",
    value: "UI/UX + Product Clarity",
    detail:
      "RealiTech and this Ask Robert interface show an emphasis on guided flows, scannability, and recruiter-friendly UX.",
    relatedSection: "projects",
  },
  {
    label: "Professional Signal",
    value: "Leadership + Documentation",
    detail:
      "The portfolio positions Robert as a builder who can explain decisions, document work, and coordinate project direction.",
    relatedSection: "recruiter",
  },
];

export const roleFits: RoleFit[] = [
  {
    role: "Frontend Internship",
    match:
      "Strong fit for student-level frontend roles that value React, Next.js, TypeScript, Tailwind CSS, responsive UI, and product clarity.",
    proof: [
      "Ask Robert portfolio shell",
      "TanimPro interface direction",
      "ARMS workflow/system planning",
    ],
    gaps: [
      "Add production deployment links for each project when available.",
      "Add final resume PDF and public GitHub links when ready.",
    ],
  },
  {
    role: "UI/UX Internship",
    match:
      "Strong fit for UI/UX opportunities that value user flows, Figma, hackathon product decisions, and clear interface communication.",
    proof: [
      "RealiTech UX/hackathon experience",
      "Ask Robert guided prompt flow",
      "ARCriculture assistant UX direction",
    ],
    gaps: [
      "Add screenshots, Figma case-study images, or design process artifacts when public.",
    ],
  },
  {
    role: "AI / AgriTech Project",
    match:
      "Good fit for exploratory AI/agriculture projects where Robert can help with assistant UX, prompt design, RAG concepts, and practical farmer-facing workflows.",
    proof: [
      "TanimPro",
      "ARCriculture",
      "AgriSense",
    ],
    gaps: [
      "Avoid claiming production ML outcomes until they are validated and documented.",
      "Add datasets, demos, or papers only when they are publicly available.",
    ],
  },
];

export const contactTemplates: ContactTemplate[] = [
  {
    purpose: "Internship opportunity",
    subject: "Internship opportunity for Robert Jhon Aracena",
    message:
      "Hi Robert, I found your Ask Robert portfolio and was interested in your work across frontend development, UI/UX, AI assistant concepts, and agriculture technology. I would like to discuss a possible internship opportunity and learn more about your project experience. Please let me know the best way to connect.",
  },
  {
    purpose: "Collaboration",
    subject: "Collaboration inquiry",
    message:
      "Hi Robert, I saw your portfolio and your direction around AI, agriculture technology, UI/UX, and practical software systems. I would like to discuss a possible collaboration and see whether our project goals align.",
  },
  {
    purpose: "Hackathon team",
    subject: "Hackathon team opportunity",
    message:
      "Hi Robert, I found your RealiTech and Ask Robert portfolio work interesting, especially your mix of UI/UX, product clarity, and development. I would like to connect about a possible hackathon team opportunity.",
  },
];

export const knowledgeSources: KnowledgeSource[] = [
  {
    id: "profile",
    title: "Profile Summary",
    section: "about",
    content: `${robertProfile.name} is a ${robertProfile.program} student at ${robertProfile.university} in ${robertProfile.location}. ${robertProfile.summary} Strengths include ${robertProfile.strengths.join(", ")}.`,
    tags: ["profile", "about", "education", "background", "strengths"],
  },
  {
    id: "resume-summary",
    title: "Resume Summary",
    section: "resume",
    content:
      `Robert's resume profile highlights BS Computer Science education, frontend and system development, UI/UX design, AI-assisted systems, agriculture technology, leadership, research, and documentation. Resume highlights: ${resumeHighlights.map((item) => `${item.label}: ${item.value}`).join("; ")}. A final public PDF resume can be added when ready.`,
    tags: ["resume", "cv", "education", "recruiter", "summary"],
  },
  {
    id: "recruiter-fit",
    title: "Recruiter Fit",
    section: "recruiter",
    content:
      `Robert is a good fit for opportunities that value frontend development, UI/UX, AI assistant thinking, agriculture technology, workflow systems, research, documentation, and project coordination. Role fits include ${roleFits.map((item) => item.role).join(", ")}. The portfolio should be honest about unsupported requirements and avoid exaggerating qualifications.`,
    tags: ["recruiter", "hire", "fit", "internship", "role"],
  },
  {
    id: "contact-guide",
    title: "Contact Guide",
    section: "contact",
    content:
      `Visitors can contact Robert for internships, collaborations, freelance design, hackathon teams, academic events, and general professional opportunities. Available contact templates include ${contactTemplates.map((item) => item.purpose).join(", ")}. The assistant can draft a message, but it should never send automatically.`,
    tags: ["contact", "email", "message", "collaboration", "internship"],
  },
  ...projects.map((project) => ({
    id: `project-${project.id}`,
    title: `${project.title} Project`,
    section: "projects" as PortfolioSection,
    projectId: project.id,
    content: `${project.title}: ${project.summary} Robert's role: ${project.role}. Category: ${project.category}. Tech stack: ${project.techStack.join(", ")}. Highlights: ${project.highlights.join(" ")} Proof: ${project.proof}`,
    tags: [
      "project",
      project.id,
      project.title.toLowerCase(),
      project.category.toLowerCase(),
      ...project.techStack.map((tech) => tech.toLowerCase()),
    ],
  })),
  ...skillGroups.map((group) => ({
    id: `skills-${group.title.toLowerCase().replaceAll(" ", "-").replaceAll("+", "plus")}`,
    title: `${group.title} Skills`,
    section: "skills" as PortfolioSection,
    content: `${group.title} skills: ${group.skills.join(", ")}.`,
    tags: ["skills", group.title.toLowerCase(), ...group.skills.map((skill) => skill.toLowerCase())],
  })),
];

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    label: "Who is Robert?",
    prompt: "Who is Robert Jhon Aracena?",
    targetSection: "about",
  },
  {
    label: "Show his projects",
    prompt: "What projects has Robert built?",
    targetSection: "projects",
  },
  {
    label: "Why hire Robert?",
    prompt: "Why should we hire Robert?",
    targetSection: "recruiter",
  },
  {
    label: "AI + Agriculture work",
    prompt: "Show Robert's AI and agriculture technology projects.",
    targetSection: "projects",
  },
  {
    label: "UI/UX and hackathon experience",
    prompt: "Show Robert's UI/UX and hackathon experience.",
    targetSection: "projects",
  },
  {
    label: "View resume",
    prompt: "Summarize Robert's resume.",
    targetSection: "resume",
  },
  {
    label: "Skills overview",
    prompt: "What are Robert's strongest technical and design skills?",
    targetSection: "skills",
  },
  {
    label: "Contact Robert",
    prompt: "How can I contact Robert?",
    targetSection: "contact",
  },
];

const responseMap: Record<string, AssistantPortfolioResponse> = {
  about: {
    targetSection: "about",
    answer:
      "Robert Jhon D. Aracena is a Computer Science student at the University of Mindanao. His portfolio sits at the intersection of software development, UI/UX design, AI-assisted systems, agriculture technology, and community-centered innovation.",
    suggestedFollowUps: [
      "Show his strongest skills",
      "Show his best projects",
      "Why should we hire Robert?",
    ],
  },
  projects: {
    targetSection: "projects",
    answer:
      "Robert's project work includes AI and agriculture concepts, UI/UX and hackathon work, IoT and edge AI directions, and practical management systems. Start with TanimPro or ARCriculture for AI + agriculture, RealiTech for UX and hackathon proof, and ARMS for system design.",
    suggestedFollowUps: [
      "Show AI + Agriculture work",
      "Show UI/UX and hackathon experience",
      "Explain ARMS",
    ],
  },
  recruiter: {
    targetSection: "recruiter",
    answer:
      "Robert is strongest when a role needs a builder who can connect code, design, research, and real-world problem framing. His proof points are AI + agriculture concepts, UI/UX-focused hackathon work, practical system design, and leadership-oriented project execution.",
    suggestedFollowUps: [
      "View resume",
      "Show project proof",
      "What roles fit Robert?",
    ],
  },
  resume: {
    targetSection: "resume",
    answer:
      "Robert's resume profile should highlight his BS Computer Science background, frontend and system development experience, UI/UX skills, AI/agriculture project direction, leadership, and research/documentation strengths. The resume panel summarizes the key points for recruiters.",
    suggestedFollowUps: [
      "Show technical skills",
      "Why should we hire Robert?",
      "Contact Robert",
    ],
  },
  skills: {
    targetSection: "skills",
    answer:
      "Robert's strongest skill clusters are frontend development, UI/UX design, AI-assisted systems, agriculture technology, system analysis, research, documentation, and leadership. The skills panel connects those skills to portfolio proof.",
    suggestedFollowUps: [
      "Show projects using AI",
      "Show UI/UX proof",
      "Show system design work",
    ],
  },
  timeline: {
    targetSection: "timeline",
    answer:
      "Robert's current timeline starts with his BS Computer Science path at the University of Mindanao, then moves into product work around AI, agriculture technology, software systems, and accessible user experiences. The timeline panel keeps that progression scannable.",
    suggestedFollowUps: [
      "Show his projects",
      "View resume",
      "Why should we hire Robert?",
    ],
  },
  contact: {
    targetSection: "contact",
    answer:
      "You can contact Robert for internships, collaborations, freelance design, hackathon opportunities, academic work, or general professional conversations. The contact panel helps shape the reason for reaching out.",
    suggestedFollowUps: [
      "Draft an internship message",
      "View resume",
      "Show recruiter summary",
    ],
  },
  agriculture: {
    targetSection: "projects",
    targetProjectId: "tanimpro",
    answer:
      "Robert's AI + agriculture direction includes TanimPro, ARCriculture, and AgriSense-style work. These projects focus on making intelligent tools useful for farmers and agriculture workflows, not just adding AI as a feature.",
    suggestedFollowUps: [
      "Explain TanimPro",
      "Explain ARCriculture",
      "What makes Robert different?",
    ],
  },
  ux: {
    targetSection: "projects",
    targetProjectId: "realitech",
    answer:
      "Robert's UI/UX and hackathon proof is strongest in RealiTech, where the focus was interface clarity, fast product decisions, and user-centered presentation under time pressure.",
    suggestedFollowUps: [
      "Show RealiTech",
      "Show skills overview",
      "Why hire Robert for UI/UX?",
    ],
  },
  missing: {
    targetSection: "about",
    answer:
      "The portfolio does not currently include that personal detail about Robert. I can answer source-backed questions about his background, projects, skills, resume direction, recruiter fit, and contact options.",
    suggestedFollowUps: [
      "Who is Robert?",
      "Show his projects",
      "View resume",
    ],
  },
};

export function getAssistantResponse(question: string): AssistantPortfolioResponse {
  const normalized = question.toLowerCase();
  const hasTerm = (term: string) =>
    new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`).test(normalized);

  if (
    normalized.includes("favorite") ||
    normalized.includes("birthday") ||
    normalized.includes("movie") ||
    normalized.includes("personal life") ||
    normalized.includes("relationship")
  ) {
    return responseMap.missing;
  }

  if (normalized.includes("contact") || normalized.includes("email")) {
    return responseMap.contact;
  }

  if (normalized.includes("resume") || normalized.includes("cv")) {
    return responseMap.resume;
  }

  if (normalized.includes("hire") || normalized.includes("recruiter") || normalized.includes("fit")) {
    return responseMap.recruiter;
  }

  if (normalized.includes("skill") || normalized.includes("tech stack") || normalized.includes("technical")) {
    return responseMap.skills;
  }

  if (
    normalized.includes("timeline") ||
    normalized.includes("history") ||
    normalized.includes("education")
  ) {
    return responseMap.timeline;
  }

  if (
    normalized.includes("agriculture") ||
    normalized.includes("agritech") ||
    hasTerm("ai") ||
    normalized.includes("tanim") ||
    normalized.includes("arcriculture") ||
    normalized.includes("agrisense")
  ) {
    return responseMap.agriculture;
  }

  if (
    hasTerm("ui") ||
    hasTerm("ux") ||
    normalized.includes("hackathon") ||
    normalized.includes("realitech")
  ) {
    return responseMap.ux;
  }

  if (normalized.includes("project") || normalized.includes("built") || normalized.includes("work")) {
    return responseMap.projects;
  }

  if (normalized.includes("who") || normalized.includes("about") || normalized.includes("robert")) {
    return responseMap.about;
  }

  return {
    targetSection: "about",
    answer:
      "I can help with Robert's background, projects, skills, resume, recruiter fit, and contact information. The current assistant uses verified local portfolio content, so it will stay focused on Robert instead of inventing unsupported details.",
    suggestedFollowUps: [
      "Who is Robert?",
      "Show his projects",
      "Why should we hire Robert?",
    ],
  };
}
