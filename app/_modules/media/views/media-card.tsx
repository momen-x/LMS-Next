"use client";

import {
  Clock3,
  ExternalLink,
  FileAudio,
  Link2,
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

    case "url":
      return <Link2 className="size-4" />;

    default:
      return <FileText className="size-4" />;
  }
}

function getMediaDetails(url: string) {
  try {
    const parsedUrl = new URL(url);
    const encodedName = parsedUrl.pathname.split("/").filter(Boolean).at(-1);
    const fileName = encodedName ? decodeURIComponent(encodedName) : "Media file";

    return { fileName, host: parsedUrl.hostname };
  } catch {
    return { fileName: "Media file", host: url };
  }
}

export default function MediaCard({ media, onView, onDelete }: MediaItemProps) {
  const { openUpdateMedia } = useMediaDialog();
  const { fileName, host } = getMediaDetails(media.url);

  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border bg-background p-4 transition-all hover:border-primary/30 hover:bg-muted/30 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MediaIcon type={media.type} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium" title={fileName}>
                {media.type === "url" ? host : fileName}
              </p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {media.type}
              </Badge>
            </div>
          </div>

          <a
            href={media.url}
            target="_blank"
            rel="noopener noreferrer"
            title={media.url}
            className="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="size-3.5 shrink-0" />
            <span className="truncate">
              {media.type === "url" ? "Open link" : host}
            </span>
          </a>

          {media.type !== "url" && <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock3 className="size-3.5" />
              {formatDuration(media.duration)}
            </span>
          </div>}
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

          <DropdownMenuContent align="end" className="z-50 w-40 p-1">
            <a
              href={onView}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <ReceiptText className="mr-2 size-3.5" />
              {media.type === "url" ? "Open link" : "View"}
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
