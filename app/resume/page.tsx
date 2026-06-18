import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Resume | Ask Robert",
  description:
    "Read Robert Jhon Aracena's recruiter-friendly resume summary and strongest portfolio proof points.",
};

export default function ResumePage() {
  return (
    <SectionPage
      section="resume"
      intro="A recruiter-friendly resume summary focused on education, project proof, technical direction, and the details that should be easiest to scan first."
    />
  );
}
