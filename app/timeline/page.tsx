import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Timeline | Ask Robert",
  description:
    "Review Robert Jhon Aracena's education, product direction, and project experience timeline.",
};

export default function TimelinePage() {
  return (
    <SectionPage
      section="timeline"
      intro="A compact timeline for Robert's education, product direction, team experience, and portfolio growth."
    />
  );
}
