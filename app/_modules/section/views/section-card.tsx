"use client";

import SectionLessons from "../../lesson/views/section-lessons";

import { Section } from "../entity/section";
import UpdateSection from "./update-section";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { useDeleteSection } from "../hooks/useDeleteSection";
import { useDeleteDialog } from "@/components/sharing/delete-dialog-context";

interface SectionItemProps {
  section: Section;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function SectionCard({
  section,
  isExpanded,
  onToggle,
}: SectionItemProps) {
  const { mutateAsync: deleteSection } = useDeleteSection();
  const { openDeleteDialog } = useDeleteDialog();

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`section-content-${section.id}`}
          className="flex min-w-0 flex-1 items-center gap-3 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted">
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </span>

          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
            {section.order}
          </span>

          <span className="truncate font-medium">{section.title}</span>
        </button>

        <div className="flex shrink-0 items-center gap-2 p-3">
          <UpdateSection section={section} />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() =>
              openDeleteDialog({
                title: "Delete section?",
                itemName: `the section “${section.title}”`,
                description: `Are you sure you want to delete “${section.title}”? Its lessons and related content may also be removed. This action cannot be undone.`,
                successMessage: "Section deleted successfully",
                onConfirm: () => deleteSection(section.id),
              })
            }
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div id={`section-content-${section.id}`} className="px-4 pb-4">
          <div className="border-t pt-4">
            <SectionLessons sectionId={section.id} />
          </div>
        </div>
      )}
    </div>
  );
}
