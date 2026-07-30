"use client";

import SectionLessons from "../../lesson/views/section-lessons";

import { Section } from "../entity/section";
import UpdateSection from "./update-section";

interface SectionItemProps {
  section: Section;
}

export default function SectionCard({ section }: SectionItemProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="p-4 flex justify-between items-center">
        <h1>section num #{section.order}  {section.title}</h1>
        <UpdateSection section={section} />
      </div>
      <div className="flex items-center gap-3 p-4">
        <div className="border-t px-4 py-5">
          <SectionLessons sectionId={section.id} />
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
          {section.order}
        </div>
      </div>
    </div>
  );
}
