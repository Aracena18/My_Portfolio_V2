import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "About Robert | Ask Robert",
  description:
    "Learn about Robert Jhon Aracena's background, education, strengths, and direction as a Computer Science student and AI + AgriTech builder.",
};

export default function AboutPage() {
  return (
    <SectionPage
      section="about"
      intro="A concise background page for understanding Robert's education, location, strengths, and portfolio direction without needing to scroll through the full chat experience."
    />
  );
}
