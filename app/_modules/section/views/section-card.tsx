"use client";

import {
  ChevronDown,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Section } from "../entity/section";

interface SectionItemProps {
  section: Section;
}

export default function SectionCard({ section }: SectionItemProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center gap-3 p-4">
        <GripVertical className="size-5 shrink-0 cursor-grab text-muted-foreground" />

        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium">
          {section.order}
        </div>

        <button
          type="button"
          className="flex flex-1 items-center gap-3 text-left"
        >
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium">{section.title}</h3>

            <p className="text-sm text-muted-foreground">
              Section {section.order}
            </p>
          </div>

          <ChevronDown className="size-4 text-muted-foreground" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Section actions"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Plus className="size-4" />
              Add Lesson
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pencil className="size-4" />
              Edit Section
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              <Trash2 className="size-4" />
              Delete Section
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-t bg-muted/30 p-4">
        <div className="rounded-lg border border-dashed p-5 text-center">
          <p className="text-sm text-muted-foreground">
            No lessons in this section yet.
          </p>

          <Button type="button" variant="outline" size="sm" className="mt-3">
            <Plus className="mr-2 size-4" />
            Add Lesson
          </Button>
        </div>
      </div>
    </div>
  );
}
