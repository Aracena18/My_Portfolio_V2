import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Skills | Ask Robert",
  description:
    "Review Robert Jhon Aracena's skills across frontend, systems, AI, UI/UX design, leadership, research, and documentation.",
};

export default function SkillsPage() {
  return (
    <SectionPage
      section="skills"
      intro="A skill graph that groups Robert's technical, design, AI, systems, and professional strengths so recruiters can connect skills to project proof."
    />
  );
}
