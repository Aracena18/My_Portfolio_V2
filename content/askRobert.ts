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
  | "IoT + Edge AI"
  | "AI + Smart City"
  | "Mobile + Travel";

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
    "Computer Science Intern, AI & Full-Stack Developer, and UI/UX Designer",
  location: "Davao City, Davao del Sur, Philippines",
  email: "robertjhonaracena18@gmail.com",
  university: "University of Mindanao",
  college: "College of Computing Education",
  program: "BS Computer Science, Specializing in Artificial Intelligence",
  summary:
    "Robert Jhon D. Aracena is a Computer Science student at the University of Mindanao specializing in Artificial Intelligence. He builds practical software across AI-powered systems, full-stack development, mobile development, UI/UX design, agriculture technology, and community-centered innovation.",
  strengths: [
    "Full-stack development",
    "AI-powered systems",
    "Mobile development",
    "UI/UX design",
    "Agriculture technology",
    "Computer vision and RAG",
    "Leadership and project management",
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
      "An AI-powered agricultural robotics and disease diagnosis system combining crop monitoring, computer vision, mobile workflows, and RAG-based guidance.",
    role: "AI and system concept builder",
    techStack: ["Flutter", "Computer vision", "YOLO", "ResNet50", "MobileNetV2", "RAG systems"],
    highlights: [
      "Combines robotics, computer vision, and a mobile app for automated crop monitoring.",
      "Supports tomato leaf disease diagnosis with YOLO and ResNet50/MobileNetV2 directions.",
      "Includes AgriGuide, a RAG-based assistant for treatment and fertilizer recommendations.",
    ],
    proof:
      "Shows Robert's strongest AI + agriculture proof across computer vision, RAG, mobile app thinking, and farm support workflows.",
    route: "/projects/agrisense",
  },
  {
    id: "iqueue",
    title: "IQueue",
    category: "AI + Smart City",
    summary:
      "An AI-powered smart boarding platform for reducing terminal congestion and service delays through demand forecasting and intelligent seat allocation.",
    role: "UM SIKLAB team contributor",
    techStack: ["AI forecasting", "Smart city systems", "Product strategy", "Hackathon execution"],
    highlights: [
      "Selected as a Top 10 team in the ASEAN AI Hackathon 2026 Smart City Category.",
      "Frames transportation congestion as a demand-forecasting and seat-allocation problem.",
      "Shows Robert's ability to contribute to AI product work under competitive hackathon constraints.",
    ],
    proof:
      "Strong recruiter signal for AI, systems thinking, smart-city problem framing, and team-based execution.",
    route: "/projects/iqueue",
  },
  {
    id: "realitech",
    title: "RealiTech",
    category: "UI/UX + Hackathon",
    summary:
      "A real-estate solution from Hack Estate Hackathon 2025 recognized for Best in UX Interface.",
    role: "Project Manager and UI/UX Contributor",
    techStack: ["React Native", "Firebase", "Figma", "UI/UX", "Project management"],
    highlights: [
      "Won Best in UX Interface at Hack Estate Hackathon 2025.",
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
    role: "Full-Stack Developer",
    techStack: ["React", "Laravel", "SQL", "Database design", "Workflow modeling"],
    highlights: [
      "Models a real business workflow as a structured system.",
      "Highlights Robert's practical full-stack and database thinking with React, Laravel, and SQL.",
      "Focuses on operations, records, and service management.",
    ],
    proof:
      "Good evidence for system design, business workflow understanding, and implementation planning.",
    route: "/projects/arms",
  },
  {
    id: "arc-travel",
    title: "Arc Travel App",
    category: "Mobile + Travel",
    summary:
      "A travel-focused web app covering frontend implementation, database design, and core user workflows.",
    role: "Full-Stack Developer",
    techStack: ["HTML", "CSS", "JavaScript", "SQL", "Workflow design"],
    highlights: [
      "Built a travel-focused application using HTML, CSS, JavaScript, and SQL.",
      "Covered frontend screens, database thinking, and core app workflows.",
      "Adds non-agriculture proof of Robert's practical full-stack development range.",
    ],
    proof:
      "Useful supporting evidence for web development, database fundamentals, and workflow implementation.",
    route: "/projects/arc-travel",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Responsive UI"],
  },
  {
    title: "Backend + Systems",
    skills: ["Laravel", "Node.js", "Firebase", "PostgreSQL", "SQL", "Database design", "API planning"],
  },
  {
    title: "AI + Data",
    skills: ["AI assistants", "RAG systems", "Computer vision", "YOLO", "ResNet50", "MobileNetV2"],
  },
  {
    title: "Mobile + Desktop",
    skills: ["Flutter", "React Native", "Dart", "JavaFX", "Java"],
  },
  {
    title: "Design",
    skills: ["Figma", "Canva", "Inkscape", "Affinity Designer", "Blender", "UI/UX"],
  },
  {
    title: "Professional",
    skills: ["Leadership", "Research", "Documentation", "Project management", "Creative direction"],
  },
];

export const timeline = [
  {
    label: "Education",
    value:
      "BS Computer Science, specializing in Artificial Intelligence, at the University of Mindanao from 2023 to 2027.",
  },
  {
    label: "Academic Record",
    value:
      "Consistent First Honor from 1st to 3rd year college, UM Academic Scholar Category A, and Microsoft IT Specialist certifications in Java and Databases.",
  },
  {
    label: "Hackathon Proof",
    value:
      "Top 10 team at ASEAN AI Hackathon 2026 with IQueue and Best in UX Interface at Hack Estate Hackathon 2025 with RealiTech.",
  },
  {
    label: "Leadership",
    value:
      "Project Manager at Hack Estate 2025, Creative Lead at UM ENIGMA, CEO/President of FARDECO Youth Org, President of 4-H Club MCPBAHS, and volunteer at Davao Startup Week 2025.",
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
    value: "BS Computer Science - AI Specialization",
    detail:
      "University of Mindanao, 2023-2027, specializing in Artificial Intelligence.",
    relatedSection: "about",
  },
  {
    label: "Technical Direction",
    value: "Full-Stack + Mobile",
    detail:
      "JavaScript, TypeScript, React, Laravel, Node.js, Firebase, PostgreSQL, SQL, Flutter, React Native, JavaFX, Java, Python, PHP, and Dart.",
    relatedSection: "skills",
  },
  {
    label: "AI Direction",
    value: "Computer Vision + RAG",
    detail:
      "AgriSense combines computer vision, YOLO, ResNet50/MobileNetV2 directions, and AgriGuide, a RAG-based treatment and fertilizer recommendation assistant.",
    relatedSection: "projects",
  },
  {
    label: "Hackathon Proof",
    value: "Best UX + Top 10 AI",
    detail:
      "RealiTech won Best in UX Interface at Hack Estate 2025; IQueue placed Robert's UM SIKLAB team in the Top 10 at ASEAN AI Hackathon 2026.",
    relatedSection: "projects",
  },
  {
    label: "Leadership Signal",
    value: "Project + Creative Lead",
    detail:
      "Project Manager at Hack Estate 2025, Creative Lead at UM ENIGMA, CEO/President of FARDECO Youth Org, President of 4-H Club MCPBAHS, and Davao Startup Week 2025 volunteer.",
    relatedSection: "recruiter",
  },
  {
    label: "Awards + Certifications",
    value: "First Honor + Microsoft IT Specialist",
    detail:
      "Consistent First Honor from 1st to 3rd year college, Microsoft IT Specialist in Java and Databases, Philippine Senate Award for Academic Excellence, and UM Academic Scholar Category A.",
    relatedSection: "resume",
  },
];

export const roleFits: RoleFit[] = [
  {
    role: "Frontend Internship",
    match:
      "Strong fit for student-level frontend roles that value React, Next.js, TypeScript, JavaScript, TailwindCSS, responsive UI, product clarity, and UI/UX collaboration.",
    proof: [
      "Ask Robert portfolio shell",
      "RealiTech Best in UX Interface",
      "ARMS and Arc Travel App implementation",
    ],
    gaps: [
      "Add public production links and GitHub repositories for each project when ready.",
    ],
  },
  {
    role: "Full-Stack Internship",
    match:
      "Strong fit for internship roles that value React, Laravel, Node.js, Firebase, PostgreSQL, SQL, workflow modeling, and practical system implementation.",
    proof: [
      "ARMS full-stack workflow",
      "Arc Travel App",
      "Ask Robert API and RAG integration",
    ],
    gaps: [
      "Add public repository links, screenshots, and deployment links when they are ready.",
    ],
  },
  {
    role: "AI / AgriTech Internship",
    match:
      "Good fit for exploratory AI, computer vision, RAG, agriculture technology, and smart-city projects where Robert can connect model concepts to usable product workflows.",
    proof: [
      "AgriSense",
      "IQueue Top 10 ASEAN AI Hackathon 2026",
      "TanimPro and ARCriculture product direction",
    ],
    gaps: [
      "Avoid claiming production ML outcomes beyond the resume-backed project descriptions.",
      "Add datasets, demos, papers, and benchmark details only when public and validated.",
    ],
  },
  {
    role: "UI/UX Internship",
    match:
      "Strong fit for UI/UX opportunities that value Figma, product clarity, hackathon design decisions, and interface communication.",
    proof: [
      "Best in UX Interface at Hack Estate 2025",
      "RealiTech project management and UI/UX contribution",
      "Design tools: Figma, Canva, Inkscape, Affinity Designer, Blender, Cavalry, and CapCut",
    ],
    gaps: [
      "Add Figma links, process screenshots, and case-study visuals when public.",
    ],
  },
];

export const contactTemplates: ContactTemplate[] = [
  {
    purpose: "Internship opportunity",
    subject: "Internship opportunity for Robert Jhon Aracena",
    message:
      "Hi Robert, I found your Ask Robert portfolio and was interested in your full-stack, AI, mobile, and UI/UX work, especially AgriSense, IQueue, RealiTech, and ARMS. I would like to discuss a possible internship opportunity and learn more about your project experience. Please let me know the best way to connect.",
  },
  {
    purpose: "Collaboration",
    subject: "Collaboration inquiry",
    message:
      "Hi Robert, I saw your portfolio and your direction around AI, agriculture technology, smart-city systems, UI/UX, mobile work, and practical software systems. I would like to discuss a possible collaboration and see whether our project goals align.",
  },
  {
    purpose: "Hackathon team",
    subject: "Hackathon team opportunity",
    message:
      "Hi Robert, I found your RealiTech, IQueue, and Ask Robert portfolio work interesting, especially your mix of UI/UX, AI product thinking, project coordination, and development. I would like to connect about a possible hackathon team opportunity.",
  },
];

export const awardHighlights = [
  "Consistent First Honor from 1st to 3rd year college",
  "Best in UX Interface at Hack Estate 2025",
  "Top 10 team at ASEAN AI Hackathon 2026",
  "Microsoft IT Specialist: Java and Databases",
  "Philippine Senate Award for Academic Excellence",
  "EBSU-STEP and UM Academic Scholar Category A",
  "Best in Science, Math, and Research in senior high school",
];

export const leadershipHighlights = [
  "Project Manager at Hack Estate Hackathon 2025",
  "Creative Lead at UM ENIGMA",
  "CEO/President of FARDECO Youth Org",
  "President of 4-H Club at MCPBAHS",
  "Volunteer at Davao Startup Week 2025",
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
      `Robert's resume profile highlights a BS Computer Science degree specializing in Artificial Intelligence at the University of Mindanao, full-stack development, mobile development, UI/UX design, AI-powered systems, computer vision, RAG, hackathon proof, leadership, awards, and certifications. Resume highlights: ${resumeHighlights.map((item) => `${item.label}: ${item.value} - ${item.detail}`).join("; ")}. Public resume PDF path: /Robert_Jhon_Aracena_Resume_1Page.pdf.`,
    tags: ["resume", "cv", "education", "recruiter", "summary", "pdf"],
  },
  {
    id: "recruiter-fit",
    title: "Recruiter Fit",
    section: "recruiter",
    content:
      `Robert is a good fit for opportunities that value full-stack development, React, Laravel, Firebase, PostgreSQL, mobile development, Flutter, React Native, UI/UX, AI assistant thinking, computer vision, RAG systems, agriculture technology, smart-city systems, workflow systems, hackathon execution, leadership, and project coordination. Role fits include ${roleFits.map((item) => item.role).join(", ")}. The portfolio should be honest about unsupported requirements and avoid exaggerating qualifications.`,
    tags: ["recruiter", "hire", "fit", "internship", "role"],
  },
  {
    id: "awards-certifications",
    title: "Awards and Certifications",
    section: "resume",
    content:
      `Resume-backed awards, scholarships, and certifications: ${awardHighlights.join("; ")}.`,
    tags: ["awards", "certifications", "scholarship", "honor", "microsoft", "hackathon"],
  },
  {
    id: "leadership-activities",
    title: "Leadership and Activities",
    section: "recruiter",
    content:
      `Resume-backed leadership and activities: ${leadershipHighlights.join("; ")}.`,
    tags: ["leadership", "activities", "volunteer", "project manager", "creative lead"],
  },
  {
    id: "contact-guide",
    title: "Contact Guide",
    section: "contact",
    content:
      `Visitors can contact Robert for internships, collaborations, freelance design, hackathon teams, academic events, and general professional opportunities. Public professional email from the resume: ${robertProfile.email}. Available contact templates include ${contactTemplates.map((item) => item.purpose).join(", ")}. The assistant can draft a message, but it should never send automatically.`,
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
      "Robert Jhon D. Aracena is a BS Computer Science student at the University of Mindanao specializing in Artificial Intelligence. His portfolio sits at the intersection of full-stack development, AI-powered systems, mobile development, UI/UX design, agriculture technology, and community-centered innovation.",
    suggestedFollowUps: [
      "Show his strongest skills",
      "Show his best projects",
      "Why should we hire Robert?",
    ],
  },
  projects: {
    targetSection: "projects",
    answer:
      "Robert's project work includes AI agriculture systems, smart-city AI, UI/UX hackathon work, mobile apps, and practical full-stack systems. Start with AgriSense for computer vision + RAG, IQueue for AI smart-city proof, RealiTech for UX recognition, and ARMS for full-stack workflow design.",
    suggestedFollowUps: [
      "Show AI + Agriculture work",
      "Show UI/UX and hackathon experience",
      "Explain ARMS",
    ],
  },
  recruiter: {
    targetSection: "recruiter",
    answer:
      "Robert is strongest when a role needs a student builder who can connect full-stack implementation, mobile development, AI/RAG/computer vision thinking, design judgment, and project coordination. His proof points include AgriSense, IQueue, RealiTech, ARMS, Microsoft IT Specialist certifications, and leadership roles.",
    suggestedFollowUps: [
      "View resume",
      "Show project proof",
      "What roles fit Robert?",
    ],
  },
  resume: {
    targetSection: "resume",
    answer:
      "Robert's resume highlights BS Computer Science with an AI specialization, full-stack and mobile development, UI/UX, AI-powered systems, computer vision, RAG, hackathon recognition, leadership, and academic awards. The resume panel summarizes the clearest recruiter proof points and links to the PDF.",
    suggestedFollowUps: [
      "Show technical skills",
      "Why should we hire Robert?",
      "Contact Robert",
    ],
  },
  skills: {
    targetSection: "skills",
    answer:
      "Robert's strongest skill clusters are full-stack development, mobile development, AI and computer vision, RAG systems, UI/UX design, database/workflow systems, and leadership. His resume lists JavaScript, TypeScript, React, Laravel, Flutter, Firebase, PostgreSQL, SQL, Java, Python, PHP, Dart, YOLO, ResNet50, and MobileNetV2.",
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
      `You can contact Robert for internships, collaborations, freelance design, hackathon opportunities, academic work, or general professional conversations. His professional email is ${robertProfile.email}. The contact panel helps shape the reason for reaching out.`,
    suggestedFollowUps: [
      "Draft an internship message",
      "View resume",
      "Show recruiter summary",
    ],
  },
  agriculture: {
    targetSection: "projects",
    targetProjectId: "agrisense",
    answer:
      "Robert's AI + agriculture direction is strongest in AgriSense, which combines agricultural robotics, computer vision, mobile workflows, tomato leaf disease diagnosis, and AgriGuide, a RAG-based assistant for treatment and fertilizer recommendations. TanimPro and ARCriculture support the broader product direction around farmer-facing AI workflows.",
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
  awards: {
    targetSection: "resume",
    answer:
      `Robert's resume-backed awards and certifications include: ${awardHighlights.join("; ")}.`,
    suggestedFollowUps: [
      "Show hackathon proof",
      "Show leadership activities",
      "Why should we hire Robert?",
    ],
  },
  leadership: {
    targetSection: "recruiter",
    answer:
      `Robert's leadership and activities include: ${leadershipHighlights.join("; ")}.`,
    suggestedFollowUps: [
      "Show project proof",
      "Show awards and certifications",
      "Draft an internship message",
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

  if (
    normalized.includes("award") ||
    normalized.includes("certification") ||
    normalized.includes("scholar") ||
    normalized.includes("honor")
  ) {
    return responseMap.awards;
  }

  if (
    normalized.includes("leadership") ||
    normalized.includes("activity") ||
    normalized.includes("activities") ||
    normalized.includes("volunteer")
  ) {
    return responseMap.leadership;
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
