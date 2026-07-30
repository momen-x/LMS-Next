"use client";

import {
  Clock3,
  FileAudio,
  FileText,
  FileVideo,
  MoreHorizontal,
  Pencil,
  ReceiptText,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Media } from "../entity/media";
import { useMediaDialog } from "../context/media-dialog-context";

interface MediaItemProps {
  media: Media;
  onView: string;
  onDelete?: (media: Media) => void;
}

function formatDuration(duration: number | null) {
  if (duration === null) return "-";

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return `${seconds}s`;
}

function MediaIcon({ type }: { type: Media["type"] }) {
  switch (type) {
    case "video":
      return <FileVideo className="size-4" />;

    case "audio":
      return <FileAudio className="size-4" />;

    default:
      return <FileText className="size-4" />;
  }
}

export default function MediaCard({ media, onView, onDelete }: MediaItemProps) {
  const { openUpdateMedia } = useMediaDialog();

  return (
    <article className="group rounded-lg border bg-background p-4 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <MediaIcon type={media.type} />

            <Badge variant="secondary">{media.type}</Badge>
          </div>

          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block truncate text-sm font-medium text-primary hover:underline"
          >
            {media.url}
          </a>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock3 className="size-3.5" />
              {formatDuration(media.duration)}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label="Media options"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end" className="z-50 w-40">
            <a
              href={onView}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center"
            >
              <ReceiptText className="mr-2 size-3.5" />
              View
            </a>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => openUpdateMedia(media.id)}>
              <Pencil className="mr-2 size-3.5" />
              Edit
            </DropdownMenuItem>

            {onDelete && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onDelete(media)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 size-3.5" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
