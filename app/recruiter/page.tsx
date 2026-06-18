import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Recruiter Mode | Ask Robert",
  description:
    "Evaluate Robert Jhon Aracena's fit for frontend, UI/UX, AI, agriculture technology, internship, and collaboration opportunities.",
};

export default function RecruiterPage() {
  return (
    <SectionPage
      section="recruiter"
      intro="A fast role-fit view for recruiters, internship evaluators, and collaborators who want Robert's clearest proof points without digging."
    />
  );
}
