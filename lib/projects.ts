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
      "A Hack Estate Hackathon 2025 real-estate solution recognized for Best in UX Interface.",
    tags: ["UI/UX", "Hackathon", "React Native", "Firebase"],
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
      duration: "Hack Estate Hackathon 2025",
    },
    problemDetails: [
      "The team needed quick alignment around user needs and product scope.",
      "The interface had to communicate value with limited time for iteration.",
      "Design decisions needed to support the demo and judging narrative.",
      "The project required coordination across product, visuals, and implementation.",
    ],
    solution:
      "Robert led project planning and contributed to UI/UX design, helping shape a clearer real-estate product experience under hackathon constraints.",
    techStack: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX", icon: "ux" },
      { name: "React Native", icon: "react" },
      { name: "Firebase", icon: "firebase" },
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
        value: "Best UX",
        description:
          "Won Best in UX Interface at Hack Estate Hackathon 2025.",
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
    tags: ["React", "Laravel", "SQL", "Workflow Design"],
    metric: {
      label: "Focus",
      value: "Systems",
    },
    thumbnail: "/images/Professional_Setup.webp",
    hero: "/images/Professional_Setup.webp",
    problem:
      "Repair shops need organized service records, customer tracking, and workflow visibility instead of relying on scattered manual processes.",
    context: {
      role: "Full-Stack Developer",
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
      "ARMS translates repair-shop operations into a structured full-stack management system with organized records, workflow states, and practical database-backed system design.",
    techStack: [
      { name: "React", icon: "react" },
      { name: "Laravel", icon: "laravel" },
      { name: "SQL", icon: "database" },
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
        value: "Full-stack",
        description:
          "Highlights React, Laravel, SQL, and structured thinking around entities, records, and operations.",
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
      "An AI-powered agricultural robotics and tomato disease diagnosis system with mobile workflows, computer vision, and RAG-based recommendations.",
    tags: ["AI Robotics", "Computer Vision", "RAG", "Flutter"],
    metric: {
      label: "Focus",
      value: "Edge AI",
    },
    thumbnail: "/images/tomatoe_leaf.webp",
    hero: "/images/tomatoe_leaf.webp",
    problem:
      "Farmers need fast crop monitoring and tomato leaf disease support, but expert access, connectivity, and practical treatment guidance can be limited.",
    context: {
      role: "AI and system concept builder",
      teamSize: "Portfolio project",
      duration: "Research and prototype direction",
    },
    problemDetails: [
      "Crop disease support needs to be timely, specific, and easy to understand.",
      "The system combines robotics, mobile workflows, and AI diagnosis thinking.",
      "Computer vision outputs need practical treatment and fertilizer recommendations.",
      "Agriculture technology must work around field realities, not ideal lab settings.",
    ],
    solution:
      "AgriSense frames crop support as a connected workflow: automated crop monitoring, tomato leaf image diagnosis with YOLO and ResNet50/MobileNetV2 directions, and AgriGuide, a RAG-based assistant that turns diagnosis results into treatment and fertilizer recommendations.",
    techStack: [
      { name: "Flutter", icon: "flutter" },
      { name: "Computer Vision", icon: "vision" },
      { name: "YOLO", icon: "vision" },
      { name: "ResNet50", icon: "ai" },
      { name: "MobileNetV2", icon: "ai" },
      { name: "RAG Systems", icon: "rag" },
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
          "Shows Robert's strongest resume-backed AI + agriculture project.",
      },
      {
        metric: "Technical Direction",
        value: "CV + RAG",
        description:
          "Connects computer vision diagnosis with source-grounded treatment recommendations.",
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
  {
    slug: "iqueue",
    title: "IQueue",
    summary:
      "An AI-powered smart boarding platform from the ASEAN AI Hackathon 2026 Smart City Category.",
    tags: ["AI", "Smart City", "Hackathon", "Forecasting"],
    metric: {
      label: "Proof",
      value: "Top 10",
    },
    thumbnail: "/images/Professional_Setup.webp",
    hero: "/images/Professional_Setup.webp",
    problem:
      "Transport terminals can face congestion and service delays when boarding demand, seat availability, and passenger flow are not intelligently coordinated.",
    context: {
      role: "UM SIKLAB team contributor",
      teamSize: "Hackathon team",
      duration: "ASEAN AI Hackathon 2026",
    },
    problemDetails: [
      "Terminal congestion creates delays and poor passenger experience.",
      "Boarding demand can shift quickly and needs smarter forecasting.",
      "Seat allocation needs to balance availability, demand, and service flow.",
      "The solution needed to communicate smart-city value clearly in a competitive hackathon setting.",
    ],
    solution:
      "IQueue applies AI-powered demand forecasting and intelligent seat allocation to reduce terminal congestion and service delays, positioning public boarding as a smart-city optimization problem.",
    techStack: [
      { name: "AI Forecasting", icon: "ai" },
      { name: "Smart City Systems", icon: "systems" },
      { name: "Product Strategy", icon: "design" },
      { name: "Hackathon Execution", icon: "management" },
    ],
    architecture: {
      image: "/images/Professional_Setup.webp",
      description:
        "Smart boarding flow connecting passenger demand, forecasting, seat allocation, and terminal service decisions.",
    },
    outcomes: [
      {
        metric: "Recognition",
        value: "Top 10",
        description:
          "UM SIKLAB was selected as a Top 10 team in the ASEAN AI Hackathon 2026 Smart City Category.",
      },
      {
        metric: "AI Signal",
        value: "Forecasting",
        description:
          "Shows Robert's exposure to AI-powered demand forecasting and optimization concepts.",
      },
      {
        metric: "Recruiter Signal",
        value: "Team AI",
        description:
          "Adds competitive hackathon evidence beyond agriculture and UI/UX.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Problem Framing",
        description:
          "Connected terminal congestion and service delays to demand and allocation decisions.",
      },
      {
        step: 2,
        title: "AI Product Direction",
        description:
          "Shaped the concept around forecasting and intelligent seat allocation.",
      },
      {
        step: 3,
        title: "Hackathon Execution",
        description:
          "Contributed within UM SIKLAB under ASEAN AI Hackathon constraints.",
      },
    ],
    links: {},
  },
  {
    slug: "arc-travel",
    title: "Arc Travel App",
    summary:
      "A travel-focused web app covering frontend implementation, database design, and core user workflows.",
    tags: ["Web App", "SQL", "JavaScript", "Travel"],
    metric: {
      label: "Focus",
      value: "Web App",
    },
    thumbnail: "/images/Professional_Setup.webp",
    hero: "/images/Professional_Setup.webp",
    problem:
      "Travel experiences need clear browsing and planning workflows backed by organized data, simple navigation, and practical interface structure.",
    context: {
      role: "Full-Stack Developer",
      teamSize: "Academic or portfolio system",
      duration: "System design and build phase",
    },
    problemDetails: [
      "Travel content needs to be structured so users can scan and choose quickly.",
      "The interface needs simple frontend flows rather than scattered static pages.",
      "The app requires database thinking for storing and retrieving travel-related information.",
    ],
    solution:
      "Arc Travel App uses HTML, CSS, JavaScript, and SQL to model a travel-focused web experience with frontend screens, database-backed information, and core user workflows.",
    techStack: [
      { name: "HTML", icon: "web" },
      { name: "CSS", icon: "web" },
      { name: "JavaScript", icon: "javascript" },
      { name: "SQL", icon: "database" },
      { name: "Workflow Design", icon: "workflow" },
    ],
    architecture: {
      image: "/images/Professional_Setup.webp",
      description:
        "Travel app structure connecting frontend pages, travel data, user browsing flows, and SQL-backed records.",
    },
    outcomes: [
      {
        metric: "Portfolio Range",
        value: "Web + SQL",
        description:
          "Adds non-agriculture proof of Robert's web and database fundamentals.",
      },
      {
        metric: "Technical Signal",
        value: "Core Stack",
        description:
          "Shows HTML, CSS, JavaScript, SQL, and workflow implementation.",
      },
      {
        metric: "Recruiter Signal",
        value: "Practical",
        description:
          "Demonstrates applied frontend and data thinking in a familiar user domain.",
      },
    ],
    process: [
      {
        step: 1,
        title: "Workflow Planning",
        description:
          "Mapped the travel-focused user flow and core content needs.",
      },
      {
        step: 2,
        title: "Frontend Build",
        description:
          "Implemented web screens using HTML, CSS, and JavaScript.",
      },
      {
        step: 3,
        title: "Data Structure",
        description:
          "Used SQL thinking to organize app data and support core workflows.",
      },
    ],
    links: {},
  },
];
