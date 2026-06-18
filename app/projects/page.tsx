import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Projects | Ask Robert",
  description:
    "Explore Robert Jhon Aracena's project evidence across AI, agriculture technology, UI/UX, hackathons, IoT, and practical systems.",
};

export default function ProjectsPage() {
  return (
    <SectionPage
      section="projects"
      intro="Project evidence for Robert's strongest portfolio themes: AI + agriculture, UI/UX and hackathon work, IoT and edge concepts, and practical system design."
    />
  );
}
