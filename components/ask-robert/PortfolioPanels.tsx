"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import {
  PortfolioSection,
  contactTemplates,
  contactOptions,
  projects,
  robertProfile,
  resumeHighlights,
  roleFits,
  skillGroups,
  timeline,
} from "@/content/askRobert";

export function PortfolioCanvas({
  activeSection,
  selectedProjectId,
  selectedProjectTitle,
  followUps,
  onAsk,
  onProjectSelect,
}: {
  activeSection: PortfolioSection;
  selectedProjectId?: string;
  selectedProjectTitle?: string;
  followUps?: string[];
  onAsk?: (question: string) => void;
  onProjectSelect?: (projectId: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-accent">Portfolio Canvas</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal text-primary">
          {getSectionTitle(activeSection, selectedProjectTitle)}
        </h2>
      </div>

      <PortfolioSectionPanel
        activeSection={activeSection}
        selectedProjectId={selectedProjectId}
        onProjectSelect={onProjectSelect}
        isCompact={true}
      />

      {followUps && followUps.length > 0 && onAsk ? (
        <section className="rounded-2xl border border-border bg-surface-muted p-4">
          <p className="mb-3 text-sm font-semibold text-primary">
            Suggested follow-ups
          </p>
          <div className="flex flex-wrap gap-2">
            {followUps.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onAsk(prompt)}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-sm font-medium text-secondary transition hover:text-accent"
              >
                {prompt}
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export function PortfolioSectionPanel({
  activeSection,
  selectedProjectId,
  onProjectSelect,
  isCompact = false,
}: {
  activeSection: PortfolioSection;
  selectedProjectId?: string;
  onProjectSelect?: (projectId: string) => void;
  isCompact?: boolean;
}) {
  if (activeSection === "about") return <AboutPanel isCompact={isCompact} />;
  if (activeSection === "projects") {
    return (
      <ProjectsPanel
        selectedProjectId={selectedProjectId}
        onProjectSelect={onProjectSelect}
        isCompact={isCompact}
      />
    );
  }
  if (activeSection === "skills") return <SkillsPanel isCompact={isCompact} />;
  if (activeSection === "resume") return <ResumePanel isCompact={isCompact} />;
  if (activeSection === "timeline") return <TimelinePanel />;
  if (activeSection === "recruiter") return <RecruiterPanel isCompact={isCompact} />;
  return <ContactPanel isCompact={isCompact} />;
}

export function AboutPanel({ isCompact }: { isCompact?: boolean }) {
  return (
    <section className="space-y-5">
      <div className="rounded-2xl border border-border bg-surface-muted p-5">
        <p className="text-lg leading-8 text-secondary">
          {robertProfile.summary}
        </p>
      </div>
      <div className={`grid gap-3 ${isCompact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        {[
          ["Location", robertProfile.location],
          ["Education", `${robertProfile.program}, ${robertProfile.university}`],
          ["College", robertProfile.college],
          ["Direction", "AI, agriculture technology, UI/UX, and systems"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {robertProfile.strengths.map((strength) => (
          <span
            key={strength}
            className="rounded-full border border-border px-3 py-2 text-sm text-secondary"
          >
            {strength}
          </span>
        ))}
      </div>
    </section>
  );
}

export function ProjectsPanel({
  selectedProjectId,
  onProjectSelect,
  isCompact,
}: {
  selectedProjectId?: string;
  onProjectSelect?: (projectId: string) => void;
  isCompact?: boolean;
}) {
  const activeProject = projects.find((project) => project.id === selectedProjectId);

  return (
    <section className="space-y-5">
      {activeProject ? (
        <div className="rounded-2xl border border-accent bg-accent-soft p-5">
          <p className="text-sm font-semibold text-accent">
            {activeProject.category}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-normal text-primary">
            {activeProject.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-secondary">
            {activeProject.summary}
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">
            Robert&apos;s role: {activeProject.role}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-secondary">
            {activeProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {activeProject.route ? (
            <Link
              href={activeProject.route}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Open case study
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'xl:grid-cols-2'}`}>
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          const cardClass = `group block rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:border-accent ${
            isSelected
              ? "border-accent bg-accent-soft"
              : "border-border bg-surface"
          }`;
          const cardContent = (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {project.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-normal text-primary">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-secondary">
                {project.summary}
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                {project.proof}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          );

          if (onProjectSelect) {
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onProjectSelect(project.id)}
                className={cardClass}
              >
                {cardContent}
              </button>
            );
          }

          return (
            <Link key={project.id} href={project.route ?? `/projects/${project.id}`} className={cardClass}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function SkillsPanel({ isCompact }: { isCompact?: boolean }) {
  return (
    <section className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
      {skillGroups.map((group) => (
        <div
          key={group.title}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <h3 className="text-lg font-semibold tracking-normal text-primary">{group.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-surface-muted px-3 py-2 text-sm text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function ResumePanel({ isCompact }: { isCompact?: boolean }) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface-muted p-5">
        <div className="flex items-center gap-3">
          <FileText className="text-accent" size={24} aria-hidden="true" />
          <h3 className="text-xl font-semibold tracking-normal text-primary">Recruiter Summary</h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-secondary">
          Robert is a BS Computer Science student with portfolio proof across
          frontend development, UI/UX, AI-assisted systems, agriculture technology,
          practical workflow systems, leadership, and research documentation.
        </p>
      </div>
      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        {resumeHighlights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {item.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-border bg-surface p-5">
        <p className="text-sm font-semibold text-primary">
          Resume PDF status
        </p>
        <p className="mt-2 text-sm leading-6 text-secondary">
          The portfolio is ready for a public resume file. Add a PDF at
          <span className="font-semibold text-primary"> public/resume.pdf </span>
          and this panel can link directly to it.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Review project proof
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold text-primary transition hover:text-accent"
        >
          Contact Robert
        </Link>
      </div>
    </section>
  );
}

export function TimelinePanel() {
  return (
    <section className="space-y-3">
      {timeline.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <p className="text-sm font-semibold text-accent">{item.label}</p>
          <p className="mt-2 text-sm leading-6 text-secondary">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export function RecruiterPanel({ isCompact }: { isCompact?: boolean }) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface-muted p-5">
        <div className="flex items-center gap-3">
          <BriefcaseBusiness
            className="text-accent"
            size={24}
            aria-hidden="true"
          />
          <h3 className="text-xl font-semibold tracking-normal text-primary">
            Why Robert is worth reviewing
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-secondary">
          Robert combines implementation, design judgment, AI curiosity, agriculture
          problem framing, and project coordination. His strongest fit is for teams
          that value builders who can explain the problem, shape the interface, and
          contribute to the technical system.
        </p>
      </div>
      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
        {roleFits.map((fit) => (
          <div
            key={fit.role}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <p className="text-sm font-semibold text-primary">{fit.role}</p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {fit.match}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Proof
            </p>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-secondary">
              {fit.proof.map((proof) => (
                <li key={proof}>{proof}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm font-semibold text-primary">
          Honest gap policy
        </p>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Ask Robert should not exaggerate. If a role requires proof that is not
          currently in the portfolio, the assistant calls that out and points to the
          closest supported evidence.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold text-primary transition hover:text-accent"
        >
          View resume summary
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Inspect proof
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ContactPanel({ isCompact }: { isCompact?: boolean }) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface-muted p-5">
        <div className="flex items-center gap-3">
          <Mail className="text-accent" size={24} aria-hidden="true" />
          <h3 className="text-xl font-semibold tracking-normal text-primary">Contact Assistant</h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-secondary">
          Reach out to Robert for internships, collaborations, freelance design,
          hackathon teams, academic work, or general professional opportunities.
          This assistant prepares intent; it does not send messages automatically.
        </p>
      </div>
      <div className={`grid gap-3 ${isCompact ? 'grid-cols-1' : 'sm:grid-cols-2'}`}>
        {contactOptions.map((option) => (
          <div
            key={option}
            className="rounded-2xl border border-border bg-surface p-4 text-sm font-semibold text-primary"
          >
            {option}
          </div>
        ))}
      </div>
      <div className={`grid gap-4 ${isCompact ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
        {contactTemplates.map((template) => (
          <div
            key={template.purpose}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <p className="text-sm font-semibold text-primary">
              {template.purpose}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              {template.subject}
            </p>
            <p className="mt-3 text-sm leading-6 text-secondary">
              {template.message}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 text-accent" size={20} aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-primary">
              Based in {robertProfile.location}
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              Add Robert&apos;s preferred public email, LinkedIn, GitHub, or contact
              form endpoint here when those final details are ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function getSectionTitle(
  section: PortfolioSection,
  selectedProjectTitle?: string,
) {
  if (section === "about") return robertProfile.name;
  if (section === "projects") return selectedProjectTitle ?? "Project Evidence";
  if (section === "skills") return "Skill Graph";
  if (section === "resume") return "Resume Intelligence";
  if (section === "timeline") return "Timeline";
  if (section === "recruiter") return "Recruiter Mode";
  return "Contact Robert";
}
