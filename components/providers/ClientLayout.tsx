"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client-only components
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Preloader />
      <CustomCursor />
      {children}
    </>
  );
}
