import type { Metadata } from "next";
import SectionPage from "@/components/ask-robert/SectionPage";

export const metadata: Metadata = {
  title: "Contact | Ask Robert",
  description:
    "Contact Robert Jhon Aracena for internships, collaborations, freelance design, hackathons, academic work, or professional opportunities.",
};

export default function ContactPage() {
  return (
    <SectionPage
      section="contact"
      intro="A guided contact page for choosing the right reason to reach out to Robert. The assistant can prepare intent, but messages are never sent automatically."
    />
  );
}
