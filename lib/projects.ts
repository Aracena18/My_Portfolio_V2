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
    slug: "agrisense",
    title: "AgriSense",
    summary: "A retrieval-augmented assistant for tomato disease diagnosis (LLM + RAG + edge inference).",
    tags: ["LLM + RAG", "Edge AI"],
    metric: {
      label: "Accuracy",
      value: "92%",
    },
    thumbnail: "/images/projects/agrisense-thumb.jpg",
    hero: "/images/projects/agrisense-hero.jpg",
    problem: "Farmers need immediate, accurate crop disease diagnosis but lack access to agricultural experts.",
    context: {
      role: "Lead AI Engineer",
      teamSize: "3 members",
      duration: "4 months",
    },
    problemDetails: [
      "Limited access to agricultural experts in rural areas",
      "Delayed diagnosis leads to significant crop loss",
      "Existing solutions require internet connectivity",
      "Need for multilingual support for diverse farming communities",
    ],
    solution: "Built an offline-capable RAG system combining large language models with a curated knowledge base of tomato diseases. The system runs inference on edge devices (Raspberry Pi 4) and provides real-time diagnosis with treatment recommendations in multiple languages.",
    techStack: [
      { name: "Python", icon: "python" },
      { name: "LangChain", icon: "langchain" },
      { name: "ChromaDB", icon: "database" },
      { name: "LLaMA 2", icon: "llm" },
      { name: "FastAPI", icon: "api" },
      { name: "Raspberry Pi", icon: "device" },
    ],
    architecture: {
      image: "/images/projects/agrisense-architecture.svg",
      description: "RAG pipeline with vector database for retrieval and LLM for response generation",
    },
    outcomes: [
      {
        metric: "Diagnostic Accuracy",
        value: "92%",
        description: "Matches expert diagnosis in field tests",
      },
      {
        metric: "Response Time",
        value: "< 3s",
        description: "Average query to diagnosis time",
      },
      {
        metric: "Offline Capability",
        value: "100%",
        description: "Fully functional without internet",
      },
      {
        metric: "User Satisfaction",
        value: "4.6/5",
        description: "Based on 50+ farmer interviews",
      },
    ],
    process: [
      {
        step: 1,
        title: "Research",
        description: "Literature review and farmer interviews to identify pain points",
      },
      {
        step: 2,
        title: "Data Collection",
        description: "Curated knowledge base from agricultural research papers and expert input",
      },
      {
        step: 3,
        title: "Prototype",
        description: "Built RAG pipeline with vector embeddings and LLM integration",
      },
      {
        step: 4,
        title: "Field Test",
        description: "Deployed to 5 farms for real-world validation and feedback",
      },
      {
        step: 5,
        title: "Deploy",
        description: "Optimized for edge devices and released to 20+ pilot farms",
      },
    ],
    links: {
      github: "https://github.com/yourusername/agrisense",
      paper: "/papers/agrisense-paper.pdf",
    },
  },
  {
    slug: "esp32-leaf-scanner",
    title: "ESP32 Leaf Disease Scanner",
    summary: "Edge-deployed computer vision system for real-time leaf disease detection using ESP32-CAM.",
    tags: ["Edge AI", "Computer Vision"],
    metric: {
      label: "Inference Time",
      value: "180ms",
    },
    thumbnail: "/images/projects/esp32-thumb.jpg",
    hero: "/images/projects/esp32-hero.jpg",
    problem: "Affordable, portable disease detection system needed for smallholder farmers without smartphone access.",
    context: {
      role: "IoT & ML Engineer",
      teamSize: "Solo project",
      duration: "2 months",
    },
    problemDetails: [
      "Cost barrier: existing solutions require expensive hardware",
      "Power constraints: needs to run on battery in field conditions",
      "Real-time requirement: instant feedback for farmers",
      "Low connectivity: rural areas lack reliable internet",
    ],
    solution: "Developed a lightweight CNN model optimized for ESP32 microcontroller, achieving real-time inference on a $15 device. The system captures leaf images, processes them locally, and displays disease classification results on an OLED screen with 89% accuracy.",
    techStack: [
      { name: "C++", icon: "cpp" },
      { name: "TensorFlow Lite", icon: "tensorflow" },
      { name: "ESP32-CAM", icon: "device" },
      { name: "Python", icon: "python" },
      { name: "OpenCV", icon: "opencv" },
    ],
    architecture: {
      image: "/images/projects/esp32-architecture.svg",
      description: "Edge inference pipeline from camera capture to classification on-device",
    },
    outcomes: [
      {
        metric: "Inference Speed",
        value: "180ms",
        description: "Real-time classification on ESP32",
      },
      {
        metric: "Model Size",
        value: "250KB",
        description: "Fits in microcontroller flash memory",
      },
      {
        metric: "Accuracy",
        value: "89%",
        description: "On 5-class leaf disease dataset",
      },
      {
        metric: "Cost per Unit",
        value: "$15",
        description: "Hardware cost for complete system",
      },
    ],
    process: [
      {
        step: 1,
        title: "Research",
        description: "Evaluated microcontroller options and model architectures",
      },
      {
        step: 2,
        title: "Model Training",
        description: "Trained MobileNetV2 variant and quantized for edge deployment",
      },
      {
        step: 3,
        title: "Prototype",
        description: "Built hardware prototype with ESP32-CAM and OLED display",
      },
      {
        step: 4,
        title: "Field Test",
        description: "Tested with 30+ farmers in real field conditions",
      },
    ],
    links: {
      github: "https://github.com/yourusername/esp32-leaf-scanner",
    },
  },
  {
    slug: "arms",
    title: "ARMS - Agricultural Resource Management System",
    summary: "Full-stack web platform for farm resource tracking, crop planning, and yield prediction.",
    tags: ["Full Stack", "Data Analytics"],
    metric: {
      label: "Active Farms",
      value: "150+",
    },
    thumbnail: "/images/projects/arms-thumb.jpg",
    hero: "/images/projects/arms-hero.jpg",
    problem: "Small and medium farms lack affordable tools for resource management and predictive analytics.",
    context: {
      role: "Full Stack Developer",
      teamSize: "4 members",
      duration: "6 months",
    },
    problemDetails: [
      "Manual record-keeping leads to inefficiency and errors",
      "No predictive insights for crop planning",
      "Difficulty tracking resource usage and costs",
      "Limited visibility across multiple plots",
    ],
    solution: "Built a responsive web application with dashboards for resource tracking, crop planning calendars, and ML-based yield prediction. Integrated weather API data and provides actionable recommendations for irrigation and fertilizer application.",
    techStack: [
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "PostgreSQL", icon: "database" },
      { name: "Python", icon: "python" },
      { name: "scikit-learn", icon: "sklearn" },
      { name: "Prisma", icon: "prisma" },
    ],
    architecture: {
      image: "/images/projects/arms-architecture.svg",
      description: "Full-stack architecture with RESTful API and ML microservice",
    },
    outcomes: [
      {
        metric: "Active Users",
        value: "150+",
        description: "Farms across 3 regions",
      },
      {
        metric: "Time Saved",
        value: "40%",
        description: "Reduction in planning time",
      },
      {
        metric: "Prediction Accuracy",
        value: "84%",
        description: "Yield estimation accuracy",
      },
      {
        metric: "User Retention",
        value: "78%",
        description: "Monthly active users",
      },
    ],
    process: [
      {
        step: 1,
        title: "Requirements",
        description: "Conducted user research with 20+ farmers",
      },
      {
        step: 2,
        title: "Design",
        description: "Created wireframes and user flows",
      },
      {
        step: 3,
        title: "Development",
        description: "Built MVP with core features",
      },
      {
        step: 4,
        title: "ML Integration",
        description: "Trained and deployed yield prediction models",
      },
      {
        step: 5,
        title: "Launch",
        description: "Piloted with 30 farms, iterated based on feedback",
      },
    ],
    links: {
      github: "https://github.com/yourusername/arms",
      demo: "https://arms-demo.vercel.app",
    },
  },
  {
    slug: "realitech",
    title: "Realitech - Smart Irrigation Controller",
    summary: "IoT-based precision irrigation system for commercial greenhouses (Client: Realitech).",
    tags: ["IoT", "Edge AI"],
    metric: {
      label: "Water Saved",
      value: "35%",
    },
    thumbnail: "/images/projects/realitech-thumb.jpg",
    hero: "/images/projects/realitech-hero.jpg",
    problem: "Greenhouse operators waste water and energy with manual or timer-based irrigation systems.",
    context: {
      role: "IoT Engineer (Contract)",
      teamSize: "2 engineers",
      duration: "3 months",
    },
    problemDetails: [
      "Over-irrigation leads to water waste and root disease",
      "Manual monitoring is labor-intensive",
      "Timer systems don't adapt to weather or plant needs",
      "No data visibility for optimization",
    ],
    solution: "Designed and deployed an automated irrigation system using soil moisture sensors, weather data integration, and ML-based scheduling algorithms. The system provides real-time monitoring dashboard and mobile alerts for greenhouse operators.",
    techStack: [
      { name: "Arduino", icon: "device" },
      { name: "MQTT", icon: "mqtt" },
      { name: "Node.js", icon: "nodejs" },
      { name: "React", icon: "react" },
      { name: "MongoDB", icon: "database" },
      { name: "AWS IoT", icon: "aws" },
    ],
    architecture: {
      image: "/images/projects/realitech-architecture.svg",
      description: "IoT architecture with sensor network, cloud backend, and web dashboard",
    },
    outcomes: [
      {
        metric: "Water Savings",
        value: "35%",
        description: "Reduction in water consumption",
      },
      {
        metric: "Labor Reduction",
        value: "60%",
        description: "Less manual monitoring needed",
      },
      {
        metric: "System Uptime",
        value: "99.2%",
        description: "Reliability over 6-month period",
      },
      {
        metric: "ROI Period",
        value: "8 months",
        description: "Payback period for clients",
      },
    ],
    process: [
      {
        step: 1,
        title: "Site Analysis",
        description: "Assessed greenhouse infrastructure and requirements",
      },
      {
        step: 2,
        title: "Hardware Design",
        description: "Selected sensors and designed controller boards",
      },
      {
        step: 3,
        title: "Software Dev",
        description: "Built cloud backend and web dashboard",
      },
      {
        step: 4,
        title: "Deployment",
        description: "Installed systems in 4 pilot greenhouses",
      },
      {
        step: 5,
        title: "Optimization",
        description: "Tuned algorithms based on real-world data",
      },
    ],
    links: {
      demo: "https://realitech-demo.vercel.app",
    },
  },
];
