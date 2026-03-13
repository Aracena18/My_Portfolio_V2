"use client";

import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export default function TextLink({
  href,
  children,
  className = "",
  external = false,
}: TextLinkProps) {
  const baseClasses =
    "relative inline-flex items-center gap-1.5 group transition-colors duration-200";

  const underline = (
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        <span className="relative">
          {children}
          {underline}
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      <span className="relative">
        {children}
        {underline}
      </span>
    </Link>
  );
}
