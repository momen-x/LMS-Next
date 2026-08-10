"use client";

import SectionLessons from "../../lesson/views/section-lessons";

import { Section } from "../entity/section";
import UpdateSection from "./update-section";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteSection } from "../hooks/useDeleteSection";
import { useDeleteDialog } from "@/components/sharing/delete-dialog-context";

interface SectionItemProps {
  section: Section;
}

export default function SectionCard({ section }: SectionItemProps) {
  const { mutateAsync: deleteSection } = useDeleteSection();
  const { openDeleteDialog } = useDeleteDialog();

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="p-4 flex justify-between items-center">
        <h1>section num #{section.order}  {section.title}</h1>
        <div className="flex items-center gap-2">
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
