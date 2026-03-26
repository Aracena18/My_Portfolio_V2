import type { Metadata } from "next";
import { Inter, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ClientLayout from "@/components/providers/ClientLayout";

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
  title: "Robert Jhon Aracena — AI Engineer",
  description:
    "Building intelligence for the field. Bridging agriculture and artificial intelligence through research-grade systems deployed where they matter.",
  keywords: [
    "AI Engineer",
    "Agricultural AI",
    "Edge AI",
    "Computer Vision",
    "Machine Learning",
    "IoT",
    "ESP32",
    "Robert Jhon Aracena",
  ],
  authors: [{ name: "Robert Jhon Aracena" }],
  openGraph: {
    title: "Robert Jhon Aracena — AI Engineer",
    description:
      "Bridging agriculture and artificial intelligence through research-grade systems deployed where they matter.",
    type: "website",
    url: "https://robertaracena.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Robert Jhon Aracena — AI Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Jhon Aracena — AI Engineer",
    description:
      "Bridging agriculture and artificial intelligence through research-grade systems deployed where they matter.",
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
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
