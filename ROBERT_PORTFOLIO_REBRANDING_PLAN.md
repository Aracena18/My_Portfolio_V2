# Robert Portfolio Rebranding Plan

## Project Codename

**Ask Robert Portfolio**

## Important Context for Codex

This is **not a new portfolio development project**.

This is a **major rebranding and upgrade of an existing deployed portfolio**. The current portfolio already exists, is already hosted, and should remain connected to the same repository, deployment target, and domain.

### Critical Instruction

Do **not** create a new project from scratch unless the current codebase is impossible to modify.

The goal is to **refactor, redesign, and upgrade the existing portfolio** into an AI-powered chatbot-style portfolio while preserving the current deployment setup.

If the site uses automatic deployment through Vercel, Netlify, GitHub Pages, Firebase Hosting, or another hosting provider, keep using the same deployment pipeline. A normal update to the existing project is acceptable, but do **not** create a new hosting project, new domain, or separate deployed application unless explicitly instructed.

---

# 1. Product Vision

Transform Robert Jhon D. Aracena's existing portfolio from a motion-heavy, graphic-heavy, 3D-style portfolio into a clean, intelligent, ChatGPT-inspired AI portfolio assistant.

The portfolio should feel like an interactive AI version of Robert.

Instead of forcing visitors to scroll through a traditional portfolio, the site should allow them to ask questions such as:

- Who is Robert?
- What projects has Robert built?
- What are Robert's strongest skills?
- Why should we hire Robert?
- Show Robert's AI and agriculture-tech work.
- Show Robert's UI/UX and hackathon experience.
- View Robert's resume.

The AI assistant should answer based only on Robert's real profile, resume, projects, skills, awards, and experiences.

The chatbot should also guide the interface. When a visitor asks about projects, the project section should open. When a visitor asks about skills, the skills section should appear. When a visitor asks about the resume, the resume section should open.

The final experience should feel like:

> An AI-powered personal operating system for understanding Robert.

---

# 2. Core Experience

## Main Interface

The first screen should look like a modern AI chatbot interface inspired by ChatGPT, but with Robert's own visual identity.

Recommended opening screen:

```text
Ask Robert
AI Portfolio Assistant for Robert Jhon D. Aracena

Ask anything about Robert's projects, skills, experience, leadership, resume, and background.

[ Ask me anything about Robert... ]

Suggested questions:
[ Who is Robert? ]
[ Show his projects ]
[ Why should we hire Robert? ]
[ View resume ]
[ AI + Agriculture work ]
[ UI/UX and hackathon experience ]
```

## Chat + Portfolio Canvas Layout

The site should not be only a chatbot. It should be a hybrid interface:

```text
Desktop Layout:
Left or Center: AI Chat Interface
Right or Bottom: Dynamic Portfolio Canvas

Mobile Layout:
Top: AI Chat Interface
Below: Dynamic Portfolio Sections
```

The chatbot explains Robert.

The portfolio canvas shows proof.

Example:

1. Visitor clicks **"What projects has Robert built?"**
2. AI gives a short answer.
3. The project gallery automatically opens.
4. The visitor can inspect project cards and case studies.

---

# 3. Design Direction

## Visual Style

Move away from the current excessive motion, graphics, and 3D-heavy design.

The new design should be:

- Minimal
- Clean
- Professional
- Fast
- Recruiter-friendly
- ChatGPT-inspired
- Soft and modern
- Easy to scan
- Mobile-friendly
- Accessibility-conscious

## Recommended Visual System

Use a clean design language:

```text
Background: white, off-white, or dark neutral
Accent: soft green, blue, or violet
Typography: clean sans-serif
Cards: rounded corners, subtle borders, soft shadows
Motion: minimal and purposeful only
3D graphics: avoid or use very lightly
Icons: simple line icons
```

## Motion Rules

Avoid distracting animations.

Use only:

- Subtle hover effects
- Smooth section transitions
- Typing indicator animation
- Fade-in for generated answers
- Gentle canvas transitions

Do not use:

- Heavy 3D scenes
- Overly animated backgrounds
- Continuous floating objects
- Distracting parallax effects
- Long loading animations

---

# 4. Main Goals

## Primary Goals

- Rebrand the existing portfolio into an AI chatbot-style portfolio.
- Preserve the existing deployment setup.
- Make the portfolio more professional and recruiter-friendly.
- Make Robert's projects, skills, and experiences easier to understand.
- Add predefined prompt buttons so visitors do not need to think too much.
- Build a dynamic portfolio canvas that changes based on the question asked.
- Prepare the codebase for AI/RAG integration.
- Add AI features safely and progressively.

## Secondary Goals

- Add recruiter mode.
- Add project-specific explainers.
- Add job-description fit analysis.
- Add resume intelligence.
- Add a contact assistant.
- Add a skill graph.
- Add project case study pages.

## Non-Goals

Do not prioritize these in the first version:

- Full autonomous AI agents with uncontrolled tool access
- Complex 3D interactions
- Overbuilt animations
- New deployment project
- New domain
- Rewriting the entire app without checking the existing structure
- AI features that can hallucinate unsupported claims

---

# 5. Development Rules for Codex

Before editing, inspect the current repository.

Check:

- Framework used
- Routing system
- Styling system
- Component structure
- Existing pages
- Existing assets
- Existing deployment config
- Environment variables
- Package manager
- TypeScript or JavaScript setup
- Current portfolio content

Do not assume the stack.

If the current stack is React, Next.js, Vite, Astro, plain HTML/CSS/JS, or another framework, adapt the plan to the existing codebase.

## Preservation Rules

- Do not delete existing content immediately.
- Move outdated sections into backup components if needed.
- Keep current deployment config intact.
- Do not remove environment configuration.
- Do not expose API keys.
- Do not hardcode secrets.
- Do not introduce breaking changes without checking references.
- Use incremental changes.
- Keep the app runnable after each phase.

## Recommended Git Workflow

Create a branch:

```bash
git checkout -b rebrand/ask-robert-ai-portfolio
```

Commit phase by phase:

```bash
git add .
git commit -m "Audit existing portfolio structure"
git commit -m "Add AI portfolio design system"
git commit -m "Add chat-style portfolio shell"
git commit -m "Add dynamic portfolio canvas"
git commit -m "Add portfolio knowledge base"
git commit -m "Add AI chat API"
git commit -m "Add recruiter mode and project explainers"
git commit -m "Polish responsive UI and accessibility"
```

---

# 6. Recommended Information Architecture

Even though the chatbot is the main experience, the portfolio should still have real sections and routes if the current framework supports routing.

Recommended structure:

```text
/                       AI chatbot landing page
/about                  About Robert
/projects               Project gallery
/projects/tanimpro      TanimPro case study
/projects/realitech     RealiTech case study
/projects/arcriculture  ARCriculture case study
/projects/arms          ARMS case study
/skills                 Skill graph
/resume                 Resume and AI summary
/contact                Contact assistant
```

If the current portfolio is a single-page application, implement these as scrollable sections or tabbed panels instead of full routes.

---

# 7. Suggested File and Component Structure

Adapt this to the existing project structure.

```text
src/
  components/
    ai/
      ChatShell.tsx
      MessageBubble.tsx
      PromptChips.tsx
      ChatInput.tsx
      TypingIndicator.tsx
      SuggestedPrompts.tsx
      ModeSwitcher.tsx
    portfolio/
      PortfolioCanvas.tsx
      SectionPanel.tsx
      ProjectGallery.tsx
      ProjectCard.tsx
      ProjectCaseStudy.tsx
      SkillGraph.tsx
      ResumePanel.tsx
      TimelinePanel.tsx
      ContactAssistant.tsx
      RecruiterModePanel.tsx
    layout/
      AppShell.tsx
      Navbar.tsx
      MobileNav.tsx
      ThemeToggle.tsx
  content/
    robertProfile.ts
    projects.ts
    skills.ts
    experiences.ts
    awards.ts
    timeline.ts
    suggestedPrompts.ts
    knowledgeBase.ts
  lib/
    portfolioRouter.ts
    promptHandlers.ts
    aiResponseSchema.ts
    rag.ts
    safety.ts
  styles/
    tokens.css
    globals.css
```

If the existing project uses JavaScript instead of TypeScript, use `.js` or `.jsx` equivalents.

---

# 8. Content Model

Create a structured content source first before adding AI.

The chatbot and portfolio sections should read from the same content data.

## Profile Data Example

```ts
export const robertProfile = {
  name: "Robert Jhon D. Aracena",
  title: "Computer Science Student | Developer | UI/UX Designer | AI and AgriTech Builder",
  location: "Davao City, Philippines",
  university: "University of Mindanao",
  college: "College of Computing Education",
  program: "BS Computer Science",
  summary:
    "Robert Jhon D. Aracena is a Computer Science student from the University of Mindanao with interests in software development, UI/UX design, AI-powered systems, agriculture technology, and community-centered innovation.",
  strengths: [
    "Software development",
    "UI/UX design",
    "AI-assisted systems",
    "Agriculture technology",
    "Leadership",
    "Research and documentation",
    "Problem-solving"
  ]
};
```

## Project Data Example

```ts
export const projects = [
  {
    id: "tanimpro",
    title: "TanimPro",
    category: "AI + Agriculture Technology",
    shortDescription:
      "An agriculture-focused platform concept designed to help farmers through AI, IoT, and accessible digital tools.",
    role: "Developer / Designer / Concept Lead",
    techStack: ["React", "TailwindCSS", "AI", "IoT Concepts"],
    highlights: [
      "Focuses on real agricultural problems",
      "Designed for farmer accessibility",
      "Combines AI assistance with practical farming workflows"
    ],
    caseStudyRoute: "/projects/tanimpro"
  },
  {
    id: "realitech",
    title: "RealiTech",
    category: "Hackathon / UX Design",
    shortDescription:
      "A hackathon project recognized for strong user experience and interface design.",
    role: "Project Manager / UI/UX Contributor",
    techStack: ["UI/UX", "Figma", "Web Development"],
    highlights: [
      "Best in UX Interface recognition",
      "Strong focus on user-centered design",
      "Built under hackathon constraints"
    ],
    caseStudyRoute: "/projects/realitech"
  },
  {
    id: "arcriculture",
    title: "ARCriculture",
    category: "AI Assistant / Agriculture",
    shortDescription:
      "An AI-powered agriculture assistant concept focused on helping farmers make better decisions.",
    role: "Concept Developer / UI Designer",
    techStack: ["AI", "Prompt Engineering", "UI/UX"],
    highlights: [
      "Community-centered agriculture concept",
      "AI assistant experience",
      "Designed around practical farmer needs"
    ],
    caseStudyRoute: "/projects/arcriculture"
  },
  {
    id: "arms",
    title: "ARMS",
    category: "Management System",
    shortDescription:
      "Auto Repair Management System for organizing repair shop workflows, services, and operations.",
    role: "Developer / System Designer",
    techStack: ["Web Development", "Database", "System Design"],
    highlights: [
      "Business workflow management",
      "Structured system design",
      "Practical real-world use case"
    ],
    caseStudyRoute: "/projects/arms"
  }
];
```

Update the details above if the current portfolio or resume contains more accurate project information.

---

# 9. Predefined Prompt Buttons

The interface should show prompt buttons so users do not need to type.

Recommended prompts:

```ts
export const suggestedPrompts = [
  {
    label: "Who is Robert?",
    prompt: "Who is Robert Jhon Aracena?",
    targetSection: "about"
  },
  {
    label: "Show his projects",
    prompt: "What projects has Robert built?",
    targetSection: "projects"
  },
  {
    label: "Why hire Robert?",
    prompt: "Why should we hire Robert?",
    targetSection: "recruiter"
  },
  {
    label: "AI + Agriculture work",
    prompt: "Show Robert's AI and agriculture technology projects.",
    targetSection: "projects"
  },
  {
    label: "UI/UX and hackathon experience",
    prompt: "Show Robert's UI/UX and hackathon experience.",
    targetSection: "projects"
  },
  {
    label: "View resume",
    prompt: "Summarize Robert's resume.",
    targetSection: "resume"
  },
  {
    label: "Skills overview",
    prompt: "What are Robert's strongest technical and design skills?",
    targetSection: "skills"
  },
  {
    label: "Contact Robert",
    prompt: "How can I contact Robert?",
    targetSection: "contact"
  }
];
```

---

# 10. Assistant Behavior

The AI assistant should be helpful, confident, and professional.

## Assistant Personality

The assistant should sound like a polished portfolio guide:

- Professional
- Clear
- Friendly
- Honest
- Recruiter-aware
- Concise but informative
- Focused only on Robert

## Assistant Rules

The assistant must:

- Answer only about Robert, his portfolio, skills, projects, experience, resume, and contact options.
- Use available profile data and RAG sources only.
- Avoid inventing achievements.
- If information is missing, say that the portfolio does not currently include that detail.
- Redirect unrelated questions back to Robert's portfolio.
- Suggest relevant sections after answering.
- Include source references when RAG is enabled.

## Example Assistant Response

User asks:

```text
What projects has Robert built?
```

Assistant response:

```text
Robert has worked on projects that combine software development, UI/UX design, AI concepts, and agriculture technology. His strongest portfolio pieces include TanimPro, ARCriculture, RealiTech, and ARMS.

I recommend starting with TanimPro if you want to see his AI and agriculture-tech direction, or RealiTech if you want to see his UI/UX and hackathon experience.
```

Then the UI should open the Projects section.

---

# 11. Response Schema for Chat Navigation

Use structured responses internally so the chatbot can control the UI.

Example TypeScript type:

```ts
export type PortfolioSection =
  | "about"
  | "projects"
  | "skills"
  | "resume"
  | "timeline"
  | "contact"
  | "recruiter"
  | "project-detail"
  | "none";

export type AssistantPortfolioResponse = {
  answer: string;
  targetSection: PortfolioSection;
  targetProjectId?: string;
  sources?: string[];
  suggestedFollowUps?: string[];
};
```

If AI is not yet implemented, use deterministic prompt handlers that return this same structure.

---

# 12. Phase-by-Phase Implementation Plan

## Phase 0: Audit and Safety Setup

### Goal

Understand the existing portfolio before modifying it.

### Tasks

- Inspect the current project structure.
- Identify the framework and build tool.
- Identify the current deployment setup.
- Identify current routes/pages.
- Identify current styling system.
- Identify current data/content sources.
- Identify reusable components.
- Identify assets that should be removed, replaced, or preserved.
- Create a backup branch.
- Run the project locally.
- Run lint/build/test commands if available.

### Deliverables

- Notes about current stack.
- List of files likely to be modified.
- Confirmation that the project runs locally.
- Backup branch created.

### Acceptance Criteria

- Existing portfolio still runs.
- No deployment config is broken.
- No content is deleted yet.
- The current app structure is understood before rebranding begins.

---

## Phase 1: Design System Rebrand

### Goal

Create the new minimal ChatGPT-inspired design foundation.

### Tasks

- Add or update global design tokens.
- Define colors, spacing, radius, borders, shadows, and typography.
- Add light and dark mode support if not already available.
- Reduce or disable excessive motion.
- Prepare reusable card, button, input, and panel styles.
- Create a clean app shell layout.
- Preserve existing branding assets only if they fit the new direction.

### Recommended Design Tokens

```css
:root {
  --bg: #ffffff;
  --bg-soft: #f7f7f8;
  --surface: #ffffff;
  --surface-muted: #f3f4f6;
  --border: #e5e7eb;
  --text: #111827;
  --text-muted: #6b7280;
  --accent: #10a37f;
  --accent-soft: #d1fae5;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --shadow-soft: 0 12px 40px rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] {
  --bg: #0f1014;
  --bg-soft: #17181d;
  --surface: #1f2027;
  --surface-muted: #272933;
  --border: #30323d;
  --text: #f9fafb;
  --text-muted: #a1a1aa;
  --accent: #10a37f;
  --accent-soft: rgba(16, 163, 127, 0.15);
}
```

### Acceptance Criteria

- The portfolio visually feels cleaner and more professional.
- Heavy motion and distracting graphics are reduced.
- The base UI is ready for chatbot and portfolio canvas components.
- Existing site still builds and runs.

---

## Phase 2: Structured Portfolio Content

### Goal

Create a central knowledge base for Robert's portfolio content.

### Tasks

- Add structured data files for profile, projects, skills, experience, awards, timeline, and resume summary.
- Move hardcoded content into reusable content objects if possible.
- Create project IDs for each major project.
- Add categories for projects.
- Add short and long descriptions.
- Add role, tech stack, highlights, and case study route for each project.

### Recommended Content Categories

```text
Profile
Projects
Skills
Experience
Education
Awards
Leadership
Timeline
Resume
Contact
Knowledge Sources
```

### Acceptance Criteria

- Portfolio content is centralized.
- Chat UI and visual sections can use the same data.
- No AI is required yet.
- Content can be updated easily later.

---

## Phase 3: Chat UI MVP Without AI

### Goal

Build the main ChatGPT-style interface using predefined prompts and deterministic responses first.

### Tasks

- Create `ChatShell` component.
- Create `MessageBubble` component.
- Create `ChatInput` component.
- Create `PromptChips` component.
- Create suggested prompt buttons.
- Add local chat state.
- Add deterministic responses based on selected prompt.
- Add `targetSection` logic so the chat can open portfolio sections.

### Why No AI Yet?

Build the interface first so the portfolio already works even before AI integration.

This prevents the whole project from depending on API keys or backend setup.

### Acceptance Criteria

- User can click suggested prompts.
- Chat displays clean answers.
- Chat can update the active portfolio section.
- Portfolio still works without an AI API.
- Mobile layout is usable.

---

## Phase 4: Dynamic Portfolio Canvas

### Goal

Make the portfolio content appear dynamically based on chat questions.

### Tasks

- Create `PortfolioCanvas` component.
- Create section panels for About, Projects, Skills, Resume, Timeline, Contact, and Recruiter Mode.
- Connect chat `targetSection` to the active section in the canvas.
- Add project cards.
- Add project detail view.
- Add simple transitions between sections.
- Add fallback navigation so users can still browse manually.

### Example Behavior

```text
Prompt: "Show his projects"
Active canvas section: Projects

Prompt: "View resume"
Active canvas section: Resume

Prompt: "Why should we hire Robert?"
Active canvas section: Recruiter Mode

Prompt: "Show AI + agriculture work"
Active canvas section: Projects filtered by AI/Agriculture
```

### Acceptance Criteria

- Chat can control the visual portfolio canvas.
- Visitors can still manually open sections.
- Projects are easy to scan.
- Case study previews are visible.
- The experience feels interactive, not just static.

---

## Phase 5: Project Case Studies

### Goal

Make each major project more convincing through clear case studies.

### Recommended Case Study Structure

Each project should include:

```text
Project Title
Short Summary
Problem
Target Users
Robert's Role
Tech Stack
Key Features
Design Decisions
Challenges
Solution
Result / Impact
What Robert Learned
Future Improvements
Screenshots or Demo
```

### Priority Projects

Start with:

```text
TanimPro
RealiTech
ARCriculture
ARMS
Arc Travel App
AgriSense AI / ESP32 Leaf Scanning System, if available
```

### Acceptance Criteria

- Each priority project has a clean case study page or panel.
- Each project explains the problem, role, solution, and value.
- Recruiters can understand the project quickly.
- Visual proof is included where available.

---

## Phase 6: AI/RAG Integration

### Goal

Upgrade the deterministic chat into a real AI-powered RAG portfolio assistant.

### Important Rule

AI should be added behind a feature flag so the site still works if the API fails.

Recommended environment variable:

```env
AI_PORTFOLIO_ENABLED=true
```

If disabled, use deterministic local responses.

## RAG Knowledge Sources

The AI should retrieve from Robert-specific documents only:

```text
Resume
Project case studies
Skills list
Awards and certificates
Education background
Leadership experience
Hackathon summaries
Portfolio content
GitHub README summaries
```

## AI System Prompt

Use a system prompt similar to this:

```text
You are Ask Robert, the AI portfolio assistant for Robert Jhon D. Aracena.

Your purpose is to help visitors understand Robert's background, skills, projects, experience, resume, leadership, and contact information.

Only answer using the provided portfolio knowledge base and retrieved sources.
Do not invent achievements, companies, awards, skills, or project details.
If information is missing, say that the portfolio does not currently include that information.
If the user asks unrelated questions, politely redirect them to Robert's portfolio.
Keep answers professional, concise, and recruiter-friendly.
When useful, recommend the most relevant portfolio section to open.
```

## API Behavior

The AI API should return structured data:

```json
{
  "answer": "Robert has worked on AI, agriculture-tech, UI/UX, and system development projects...",
  "targetSection": "projects",
  "targetProjectId": "tanimpro",
  "sources": ["Resume", "TanimPro Case Study"],
  "suggestedFollowUps": [
    "Show TanimPro case study",
    "Show Robert's UI/UX work",
    "Why is Robert a good fit for an internship?"
  ]
}
```

### Safety Requirements

- Never expose API keys.
- Add rate limiting if backend allows it.
- Restrict the assistant to Robert-related questions.
- Do not allow the AI to execute arbitrary commands.
- Do not allow the AI to modify files.
- Do not allow the AI to send emails automatically.
- Do not give the AI unrestricted tool access.
- Show source labels when answers are generated from RAG.
- Provide fallback answers if AI fails.

### Acceptance Criteria

- AI can answer questions about Robert.
- AI uses only Robert's knowledge base.
- AI does not hallucinate unsupported claims.
- AI can trigger portfolio sections.
- Site still works when AI is disabled.

---

## Phase 7: Recruiter Mode

### Goal

Make the portfolio especially useful for recruiters, internship evaluators, and potential collaborators.

### Features

Add a **Recruiter Mode** button.

Recruiter Mode should answer:

```text
Is Robert fit for a frontend role?
Is Robert fit for a UI/UX role?
Is Robert fit for an AI-related project?
What makes Robert different from other students?
What are Robert's strongest proofs?
What project should I view first?
```

## Job Description Fit Analyzer

Allow visitors to paste a job description or internship requirement.

The assistant should return:

```text
Role Match Summary
Relevant Skills
Relevant Projects
Proof from Portfolio
Possible Gaps
Recommended Sections to Review
```

### Important Safety Rule

The assistant should not exaggerate Robert's qualifications.

If a requirement is not supported by the portfolio data, say so honestly.

### Acceptance Criteria

- Recruiter Mode exists.
- Recruiter can quickly understand Robert's value.
- Job-description matching works based on known portfolio data.
- The result links to relevant project proof.

---

## Phase 8: Project Explainer Agents

### Goal

Create agent-like experiences without risky autonomous behavior.

These should be structured assistant modes, not uncontrolled autonomous agents.

## Recommended Agents

### 1. Recruiter Agent

Purpose:

```text
Evaluate Robert for roles, internships, and collaborations.
```

### 2. Project Explainer Agent

Purpose:

```text
Explain a specific project like a case study.
```

Questions it can answer:

```text
What problem did this project solve?
What was Robert's role?
What technologies were used?
What makes this project unique?
What would be improved in version 2?
```

### 3. UI/UX Critic Agent

Purpose:

```text
Explain Robert's design decisions and UX thinking.
```

### 4. Opportunity-Fit Agent

Purpose:

```text
Compare Robert's portfolio against a job description, internship requirement, or hackathon theme.
```

### 5. Contact Assistant

Purpose:

```text
Help the visitor draft a message to Robert.
```

The Contact Assistant should never send automatically. It should only prepare a message that the visitor can submit manually.

### Acceptance Criteria

- Agent modes are available as buttons or tabs.
- Each agent is restricted to a safe and specific purpose.
- Agents do not execute external actions.
- Agents improve portfolio navigation and recruiter experience.

---

## Phase 9: Resume Intelligence

### Goal

Make the resume section more interactive than a normal PDF viewer.

### Features

Add buttons:

```text
Summarize Robert's resume
Show technical skills
Show leadership experience
Show awards
Show best projects
Download resume
```

### Resume Panel Should Include

- Embedded resume preview or download button
- AI-generated resume summary
- Skill highlights
- Education
- Leadership
- Awards
- Project links

### Acceptance Criteria

- Resume is easy to view and download.
- AI can summarize resume content.
- Resume section links back to relevant projects and skills.

---

## Phase 10: Skill Graph

### Goal

Replace boring skill icons with a more meaningful skill system.

### Skill Categories

```text
Frontend
Backend
AI / Data
UI/UX Design
Tools
Leadership
Research
Agriculture Technology
```

### Behavior

Each skill should be clickable.

Example:

```text
Click React -> show projects that used React
Click Figma -> show UI/UX projects
Click AI -> show TanimPro, ARCriculture, AgriSense AI
Click Leadership -> show project management and youth organization leadership
```

### Acceptance Criteria

- Skills are categorized clearly.
- Skills connect to project proof.
- Skill section is more useful than a plain icon grid.

---

## Phase 11: Contact Assistant

### Goal

Make contacting Robert more guided and intentional.

### Contact Options

```text
Internship Opportunity
Collaboration
Freelance Design
Hackathon Team
Academic / School Event
General Message
```

### Behavior

Visitor chooses a purpose.

The assistant helps generate a message draft.

The visitor manually submits through the contact form or email link.

### Acceptance Criteria

- Contact form is simple.
- Contact assistant does not send automatically.
- Visitor can copy or submit a polished message.

---

# 13. Recommended MVP Scope

Build this first before advanced AI agents:

```text
1. ChatGPT-style landing page
2. Suggested prompt buttons
3. Deterministic chatbot responses
4. Dynamic portfolio canvas
5. Structured content files
6. Project gallery
7. Resume panel
8. Skills panel
9. Contact panel
10. Responsive design
```

Then add:

```text
11. AI/RAG chat API
12. Recruiter Mode
13. Job-description fit analyzer
14. Project Explainer Agent
15. Skill graph
16. Resume intelligence
17. Contact assistant
```

---

# 14. Suggested First Version Prompt Map

Use this map before AI is added.

```ts
const promptMap = {
  "who is robert": {
    targetSection: "about",
    answer:
      "Robert Jhon D. Aracena is a Computer Science student at the University of Mindanao with interests in software development, UI/UX design, AI-powered systems, agriculture technology, and community-centered innovation."
  },
  "projects": {
    targetSection: "projects",
    answer:
      "Robert has worked on projects involving AI, agriculture technology, UI/UX design, hackathon solutions, and management systems. His key projects include TanimPro, ARCriculture, RealiTech, and ARMS."
  },
  "why hire": {
    targetSection: "recruiter",
    answer:
      "Robert combines development, design, AI concepts, agriculture-tech thinking, leadership, and research experience. His strength is building technology around real problems, especially community and agriculture-related challenges."
  },
  "resume": {
    targetSection: "resume",
    answer:
      "Robert's resume highlights his Computer Science background, project experience, leadership, design skills, and technical foundation. You can view or download the resume in the resume section."
  },
  "skills": {
    targetSection: "skills",
    answer:
      "Robert's skills cover software development, UI/UX design, AI-assisted systems, research, documentation, and leadership. The skills section connects each skill to project proof."
  },
  "contact": {
    targetSection: "contact",
    answer:
      "You can contact Robert for internships, collaborations, freelance design, hackathon opportunities, or academic-related work through the contact section."
  }
};
```

---

# 15. UI Acceptance Checklist

The redesigned portfolio should pass this checklist:

## First Impression

- [ ] The first screen clearly communicates that this is Robert's AI portfolio assistant.
- [ ] The design is clean and professional.
- [ ] The interface is not overloaded with graphics.
- [ ] Suggested prompts are visible immediately.
- [ ] The visitor understands what to do within 5 seconds.

## Chat Experience

- [ ] Prompt buttons work.
- [ ] User can type a custom question.
- [ ] Chat answers are readable.
- [ ] Chat can open relevant sections.
- [ ] Chat has a fallback if AI is unavailable.

## Portfolio Canvas

- [ ] About section is clear.
- [ ] Projects are easy to scan.
- [ ] Skills connect to proof.
- [ ] Resume is easy to access.
- [ ] Contact section is simple.

## Recruiter Experience

- [ ] Recruiter can understand Robert quickly.
- [ ] Recruiter can see proof of skills.
- [ ] Recruiter can access resume.
- [ ] Recruiter can ask role-fit questions.
- [ ] Recruiter can contact Robert easily.

## Technical Quality

- [ ] Existing deployment config is preserved.
- [ ] Site builds successfully.
- [ ] No API keys are exposed.
- [ ] Mobile layout works.
- [ ] Accessibility basics are followed.
- [ ] Performance is acceptable.

---

# 16. Accessibility Requirements

Implement:

- Semantic HTML
- Keyboard-accessible buttons
- Visible focus states
- Proper labels for chat input
- Sufficient color contrast
- Reduced motion support
- Responsive layout
- Clear heading hierarchy
- Alt text for images

Add CSS support:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 17. Performance Requirements

- Remove unnecessary heavy 3D assets.
- Lazy-load project images.
- Optimize screenshots.
- Avoid loading AI features until needed.
- Use streaming responses only if the stack supports it cleanly.
- Keep the first screen fast.
- Avoid huge animation libraries unless already used.
- Avoid adding unnecessary dependencies.

---

# 18. AI Failure and Fallback Behavior

If the AI API fails:

Show:

```text
The AI assistant is currently unavailable, but you can still explore Robert's portfolio using the sections below.
```

Then show prompt buttons and deterministic local answers.

The portfolio should never become unusable because AI failed.

---

# 19. Security Rules

- Store API keys only in environment variables.
- Never expose server-side keys to the browser.
- Validate user input.
- Rate-limit chat requests if backend supports it.
- Do not allow command execution.
- Do not allow arbitrary file access.
- Do not allow the assistant to send messages automatically.
- Keep the assistant focused on Robert's portfolio.
- Do not include private or sensitive information that should not be public.

---

# 20. Final Desired Outcome

The final portfolio should feel like a premium AI-powered portfolio:

```text
Ask Robert — an AI portfolio assistant that answers questions, opens project evidence, explains case studies, evaluates role fit, and guides recruiters through Robert's skills, projects, leadership, resume, and AI/agriculture-tech background.
```

The portfolio should be:

- Interactive
- Professional
- Fast
- Useful
- Recruiter-friendly
- AI-powered
- Easy to maintain
- Connected to real project proof
- Preserved within the existing deployed portfolio setup

---

# 21. Instruction to Codex

Start with Phase 0.

Do not write the full application from scratch immediately.

First inspect the existing repository, identify the framework, and determine the safest way to migrate the current portfolio into the new AI chatbot-style experience.

After the audit, implement the phases in order:

```text
Phase 0: Audit and safety setup
Phase 1: Design system rebrand
Phase 2: Structured portfolio content
Phase 3: Chat UI MVP without AI
Phase 4: Dynamic portfolio canvas
Phase 5: Project case studies
Phase 6: AI/RAG integration
Phase 7: Recruiter Mode
Phase 8: Project explainer agents
Phase 9: Resume intelligence
Phase 10: Skill graph
Phase 11: Contact assistant
```

Keep the existing deployment pipeline intact.

Do not create a new deployment project.

Make each phase buildable and testable before moving to the next phase.
