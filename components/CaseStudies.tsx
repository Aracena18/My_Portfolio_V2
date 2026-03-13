"use client";

import { type Ref } from "react";
import CaseStudy01 from "./CaseStudy01";
import CaseStudy02 from "./CaseStudy02";
import CaseStudy03 from "./CaseStudy03";

export default function CaseStudies({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section id="work" ref={ref}>
      <div className="max-w-container mx-auto px-6 lg:px-8 mb-8">
        <p className="section-label">Selected Work</p>
      </div>

      <CaseStudy01 />
      <CaseStudy02 />
      <CaseStudy03 />
    </section>
  );
}
