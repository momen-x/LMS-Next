"use client";

import {
  Clock3,
  FileVideo,
  FileAudio,
  FileText,
  MoreVertical,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Media } from "../entity/media";

import UpdateMedia from "./update-media";

interface MediaItemProps {
  media: Media;
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

function MediaIcon(type: Media["type"]) {
  switch (type) {
    case "VIDEO":
      return <FileVideo className="size-4" />;

    case "AUDIO":
      return <FileAudio className="size-4" />;

    default:
      return <FileText className="size-4" />;
  }
}

export default function MediaCard({ media }: MediaItemProps) {
  return (
    <article className="rounded-lg border bg-background p-4 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {MediaIcon(media.type)}

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
              <Button variant="ghost" size="icon">
                <MoreVertical className="size-4" />
              </Button>
            }
          />

          <DropdownMenuContent align="end">
            <UpdateMedia media={media} />

            <DropdownMenuSeparator />

            <Button variant="destructive" onClick={() => {}}>
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  );
}
