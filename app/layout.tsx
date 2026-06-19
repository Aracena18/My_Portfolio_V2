import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robertaracena.com"),
  title: "Ask Robert — AI Portfolio Assistant",
  description:
    "Ask Robert is an AI-inspired portfolio assistant for Robert Jhon Aracena, covering projects, skills, resume, UI/UX, AI, and agriculture technology work.",
  keywords: [
    "Robert Jhon Aracena",
    "Ask Robert",
    "AI Portfolio Assistant",
    "Portfolio",
    "UI/UX Designer",
    "Computer Science Student",
    "Agriculture Technology",
    "Computer Vision",
    "Machine Learning",
    "IoT",
  ],
  authors: [{ name: "Robert Jhon Aracena" }],
  openGraph: {
    title: "Ask Robert — AI Portfolio Assistant",
    description:
      "Explore Robert Jhon Aracena's projects, skills, resume, AI + agriculture work, UI/UX experience, and recruiter fit through an AI-inspired portfolio.",
    type: "website",
    url: "https://robertaracena.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ask Robert — AI Portfolio Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask Robert — AI Portfolio Assistant",
    description:
      "Ask about Robert's projects, skills, resume, AI + agriculture work, and recruiter fit.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-background text-primary" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
