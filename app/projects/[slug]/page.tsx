import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileText, Github } from "lucide-react";
import { projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Ask Robert",
    };
  }

  return {
    title: `${project.title} | Ask Robert`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="dark min-h-screen bg-[var(--bg)] px-4 py-5 text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] shadow-[var(--shadow-soft)] transition hover:text-[var(--accent)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>

        <header className="mt-5 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-normal text-[var(--text)] sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
                {project.problem}
              </p>
            </div>
            <div className="relative min-h-72 bg-[var(--surface-muted)]">
              <Image
                src={project.hero}
                alt={`${project.title} visual context`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:grid-cols-3 sm:p-7">
          {[
            { label: "Role", value: project.context.role },
            { label: "Team", value: project.context.teamSize },
            { label: "Timeline", value: project.context.duration },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text)]">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
            <p className="text-sm font-semibold text-[var(--accent)]">Problem</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal">
              What this project needed to solve
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
              {project.problemDetails.map((detail) => (
                <li key={detail} className="rounded-2xl bg-[var(--surface-muted)] p-4">
                  {detail}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
            <p className="text-sm font-semibold text-[var(--accent)]">Solution</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal">
              Robert&apos;s product and technical direction
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--text-secondary)]">
              {project.solution}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[var(--accent)]">
                Architecture
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal">
                How the idea is structured
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {project.architecture.description}
              </p>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
              <Image
                src={project.architecture.image}
                alt={`${project.title} architecture context`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
          <p className="text-sm font-semibold text-[var(--accent)]">Proof Points</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">
            What this project shows
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {project.outcomes.map((outcome) => (
              <div
                key={outcome.metric}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {outcome.value}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-normal text-[var(--text)]">
                  {outcome.metric}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
          <p className="text-sm font-semibold text-[var(--accent)]">Process</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-normal">
            How Robert approached it
          </h2>
          <div className="mt-6 space-y-4">
            {project.process.map((phase) => (
              <div
                key={phase.step}
                className="grid gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:grid-cols-[56px_1fr]"
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-[var(--accent)] text-sm font-bold text-white">
                  {phase.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-normal text-[var(--text)]">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--accent)]">Next Step</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-normal">
                Discuss this project with Robert
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                Use this case study as proof for Robert&apos;s portfolio direction, then
                return to the assistant or contact page for a role-fit conversation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--text)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Github size={16} aria-hidden="true" />
                  View Code
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {project.links.paper && (
                <a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:text-[var(--accent)]"
                >
                  <FileText size={16} aria-hidden="true" />
                  Paper
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Contact Robert
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
