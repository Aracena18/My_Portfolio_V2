export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  metric: {
    label: string;
    value: string;
  };
  thumbnail: string;
  hero: string;
  problem: string;
  context: {
    role: string;
    teamSize: string;
    duration: string;
  };
  problemDetails: string[];
  solution: string;
  techStack: {
    name: string;
    icon: string;
  }[];
  architecture: {
    image: string;
    description: string;
  };
  outcomes: {
    metric: string;
    value: string;
    description: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "tanimpro",
    title: "TanimPro",
    summary:
      "An agriculture-focused platform concept for helping farmers through AI guidance, IoT concepts, and accessible digital workflows.",
    tags: ["AI + Agriculture", "Product Design", "Farmer Support"],
    metric: {
      label: "Focus",
      value: "AgriTech",
    },
    thumbnail: "/images/Wide_Agriculture_image.webp",
    hero: "/images/Wide_Agriculture_image.webp",
    problem:
      "Farmers need practical and understandable support tools, but many digital products are too technical, fragmented, or disconnected from real farm workflows.",
    context: {
      role: "Developer, Designer, and Concept Lead",
      teamSize: "Portfolio project",
      duration: "Concept and prototype phase",
    },
    problemDetails: [
      "Agriculture support tools can be difficult to use for non-technical users.",
      "Farm decisions often require combining observations, guidance, and records.",
      "AI features need to be framed carefully so they help rather than confuse users.",
      "The interface has to respect field conditions, time pressure, and accessibility.",
    ],
    solution:
      "TanimPro frames AI and IoT ideas as approachable farm workflows: ask for guidance, review crop context, track relevant observations, and surface recommended next steps in plain language.",
    techStack: [
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "AI Concepts", icon: "ai" },
      { name: "IoT Concepts", icon: "iot" },
      { name: "Product Design", icon: "design" },
    ],
    architecture: {
      image: "/images/Wide_Agriculture_image.webp",
      description:
        "Concept architecture connecting farmer questions, crop context, AI guidance, and optional sensor or observation inputs.",
    },
    outcomes: [
      {
        metric: "Portfolio Proof",
        value: "AI + Farm UX",
        description:
          "Shows Robert's ability to translate an agriculture problem into a product experience.",
      },
      {
        metric: "Design Direction",
        value: "Accessible",
        description:
          "Prioritizes clarity, farmer usability, and practical decision support.",
      },
      {
        metric: "Technical Direction",
        value: "Expandable",
        description:
          "Prepared for future AI, RAG, IoT, and data-driven feature integration.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Problem Framing",
        description:
          "Defined the farming decisions and support moments the platform should help with.",
      },
      {
        step: 2,
        title: "Workflow Design",
        description:
          "Mapped AI guidance into user-friendly actions instead of a generic chatbot.",
      },
      {
        step: 3,
        title: "Interface Planning",
        description:
          "Planned a clean farmer-facing interface with concise explanations and visible proof.",
      },
      {
        step: 4,
        title: "Future Integration",
        description:
          "Kept room for AI/RAG, IoT inputs, and case-study expansion.",
      },
    ],
    links: {},
  },
  {
    slug: "arcriculture",
    title: "ARCriculture",
    summary:
      "An AI-powered agriculture assistant concept focused on helping farmers ask better questions and make better-informed decisions.",
    tags: ["AI Assistant", "Agriculture", "UX"],
    metric: {
      label: "Mode",
      value: "Assistant",
    },
    thumbnail: "/images/tomatoe_leaf.webp",
    hero: "/images/tomatoe_leaf.webp",
    problem:
      "AI can feel abstract for agriculture users unless it is shaped around concrete questions, visible limits, and practical guidance.",
    context: {
      role: "Concept Developer and UI Designer",
      teamSize: "Portfolio project",
      duration: "Concept and interface phase",
    },
    problemDetails: [
      "Farmers may not know how to phrase technical crop or farm-management questions.",
      "A useful assistant needs to stay grounded in agriculture-specific knowledge.",
      "The experience must be honest when information is missing or uncertain.",
      "The interface should guide users toward next steps, not just text answers.",
    ],
    solution:
      "ARCriculture explores a constrained assistant experience where users can ask farm-related questions, receive concise guidance, and move into supporting sections or evidence.",
    techStack: [
      { name: "AI Assistant Design", icon: "ai" },
      { name: "Prompt Engineering", icon: "prompt" },
      { name: "UI/UX", icon: "ux" },
      { name: "Agriculture Research", icon: "research" },
    ],
    architecture: {
      image: "/images/tomatoe_leaf.webp",
      description:
        "Assistant flow from user question to grounded response, related evidence, and suggested follow-up actions.",
    },
    outcomes: [
      {
        metric: "Portfolio Proof",
        value: "AI UX",
        description:
          "Shows Robert's thinking around safe, focused AI assistants for real users.",
      },
      {
        metric: "Domain Direction",
        value: "Agriculture",
        description:
          "Keeps the assistant centered on farming needs and decision support.",
      },
      {
        metric: "Future Scope",
        value: "RAG-ready",
        description:
          "Can later connect to curated agriculture and project knowledge sources.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Assistant Scope",
        description:
          "Defined what the assistant should and should not answer.",
      },
      {
        step: 2,
        title: "Prompt Paths",
        description:
          "Planned suggested questions that reduce friction for first-time users.",
      },
      {
        step: 3,
        title: "Evidence Linking",
        description:
          "Connected answers to visible project or knowledge sections.",
      },
    ],
    links: {},
  },
  {
    slug: "realitech",
    title: "RealiTech",
    summary:
      "A hackathon project recognized for strong user experience, interface clarity, and product presentation under time constraints.",
    tags: ["UI/UX", "Hackathon", "Team Leadership"],
    metric: {
      label: "Proof",
      value: "UX",
    },
    thumbnail: "/images/Professional_Setup.webp",
    hero: "/images/Professional_Setup.webp",
    problem:
      "Hackathon teams need to turn a rough idea into a convincing product quickly, with a clear interface and a story judges can understand.",
    context: {
      role: "Project Manager and UI/UX Contributor",
      teamSize: "Hackathon team",
      duration: "Hackathon build",
    },
    problemDetails: [
      "The team needed quick alignment around user needs and product scope.",
      "The interface had to communicate value with limited time for iteration.",
      "Design decisions needed to support the demo and judging narrative.",
      "The project required coordination across product, visuals, and implementation.",
    ],
    solution:
      "Robert contributed to shaping the UX direction, organizing product decisions, and presenting a clearer interface under hackathon constraints.",
    techStack: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: "ux" },
      { name: "Web Development", icon: "web" },
      { name: "Presentation", icon: "presentation" },
      { name: "Project Management", icon: "management" },
    ],
    architecture: {
      image: "/images/Professional_Setup.webp",
      description:
        "Hackathon product flow connecting user problem, interface screens, and demo narrative.",
    },
    outcomes: [
      {
        metric: "Portfolio Proof",
        value: "UX + Team",
        description:
          "Shows design thinking, collaboration, and product communication under pressure.",
      },
      {
        metric: "Recognition",
        value: "UX Focus",
        description:
          "The portfolio plan notes recognition for strong UX interface direction.",
      },
      {
        metric: "Recruiter Signal",
        value: "Execution",
        description:
          "Useful evidence for UI/UX, product, and team-based internship roles.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Scope",
        description:
          "Aligned the project around a focused user problem and demoable feature set.",
      },
      {
        step: 2,
        title: "UX Direction",
        description:
          "Helped shape interface hierarchy, user flow, and product clarity.",
      },
      {
        step: 3,
        title: "Team Coordination",
        description:
          "Supported project decisions and presentation flow during the hackathon.",
      },
      {
        step: 4,
        title: "Demo",
        description:
          "Prepared the project for judging with a clear story and visible product proof.",
      },
    ],
    links: {},
  },
  {
    slug: "arms",
    title: "ARMS",
    summary:
      "An Auto Repair Management System for organizing repair-shop services, records, and operational workflows.",
    tags: ["Management System", "Database", "Workflow Design"],
    metric: {
      label: "Focus",
      value: "Systems",
    },
    thumbnail: "/images/Professional_Setup.webp",
    hero: "/images/Professional_Setup.webp",
    problem:
      "Repair shops need organized service records, customer tracking, and workflow visibility instead of relying on scattered manual processes.",
    context: {
      role: "Developer and System Designer",
      teamSize: "Academic or portfolio system",
      duration: "System design and build phase",
    },
    problemDetails: [
      "Manual tracking can make service histories difficult to retrieve.",
      "Repair-shop workflows include customers, vehicles, services, status, and records.",
      "The system needs clear database structure before the interface can be useful.",
      "Staff need a practical tool that supports repeated daily operations.",
    ],
    solution:
      "ARMS translates repair-shop operations into a structured management system with organized records, workflow states, and practical system design.",
    techStack: [
      { name: "Web Development", icon: "web" },
      { name: "Database Design", icon: "database" },
      { name: "System Analysis", icon: "systems" },
      { name: "Workflow Modeling", icon: "workflow" },
    ],
    architecture: {
      image: "/images/Professional_Setup.webp",
      description:
        "System architecture centered on customers, repair jobs, service records, workflow status, and reporting needs.",
    },
    outcomes: [
      {
        metric: "Portfolio Proof",
        value: "Systems",
        description:
          "Shows Robert's ability to model a practical business workflow.",
      },
      {
        metric: "Technical Signal",
        value: "Database",
        description:
          "Highlights structured thinking around entities, records, and operations.",
      },
      {
        metric: "Use Case",
        value: "Business",
        description:
          "Grounds development work in a real operational environment.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Workflow Study",
        description:
          "Identified the main repair-shop records and actions the system needs to support.",
      },
      {
        step: 2,
        title: "Data Modeling",
        description:
          "Defined core entities such as customers, vehicles, services, and repair status.",
      },
      {
        step: 3,
        title: "Interface Planning",
        description:
          "Organized screens around frequent staff tasks and record lookup.",
      },
      {
        step: 4,
        title: "System Build",
        description:
          "Prepared the implementation around practical management-system workflows.",
      },
    ],
    links: {},
  },
  {
    slug: "agrisense",
    title: "AgriSense",
    summary:
      "An AI and edge-computing direction for crop diagnosis support, including tomato leaf disease scanning concepts.",
    tags: ["Edge AI", "Computer Vision", "Agriculture"],
    metric: {
      label: "Focus",
      value: "Edge AI",
    },
    thumbnail: "/images/tomatoe_leaf.webp",
    hero: "/images/tomatoe_leaf.webp",
    problem:
      "Farmers may need fast crop-disease support in environments where expert access and connectivity are limited.",
    context: {
      role: "AI and system concept builder",
      teamSize: "Portfolio project",
      duration: "Research and prototype direction",
    },
    problemDetails: [
      "Crop disease support needs to be timely and easy to understand.",
      "Connectivity constraints make edge or offline-friendly thinking valuable.",
      "AI outputs need to be paired with careful limitations and practical next steps.",
      "Agriculture technology must work around field realities, not ideal lab settings.",
    ],
    solution:
      "AgriSense frames crop diagnosis support as a grounded AI workflow: capture evidence, compare against curated knowledge, and provide concise guidance with room for edge deployment.",
    techStack: [
      { name: "Python", icon: "python" },
      { name: "Computer Vision", icon: "vision" },
      { name: "RAG Concepts", icon: "rag" },
      { name: "Edge AI", icon: "edge" },
      { name: "Agriculture Research", icon: "research" },
    ],
    architecture: {
      image: "/images/tomatoe_leaf.webp",
      description:
        "AI support flow from visual crop evidence to retrieval, reasoning, and farmer-facing guidance.",
    },
    outcomes: [
      {
        metric: "Portfolio Proof",
        value: "AI + Crops",
        description:
          "Shows Robert's interest in applying AI to agricultural decision support.",
      },
      {
        metric: "Technical Direction",
        value: "Edge-aware",
        description:
          "Considers deployment environments where internet access may be unreliable.",
      },
      {
        metric: "Safety Direction",
        value: "Grounded",
        description:
          "Prepared for source-backed answers rather than unsupported AI claims.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Domain Research",
        description:
          "Explored agriculture support needs and disease-diagnosis workflows.",
      },
      {
        step: 2,
        title: "AI Framing",
        description:
          "Planned how image evidence and knowledge retrieval could support answers.",
      },
      {
        step: 3,
        title: "Edge Thinking",
        description:
          "Considered constraints around hardware, connectivity, and field usability.",
      },
      {
        step: 4,
        title: "Portfolio Integration",
        description:
          "Connected the project to Robert's broader AI + agriculture direction.",
      },
    ],
    links: {},
  },
];
