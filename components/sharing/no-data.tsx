import { Button } from "@/components/ui/button";
import { FolderSearch, RotateCcw } from "lucide-react";

interface NoDataProps {
  onClearFilters?: () => void;
}

export default function NoData({ onClearFilters }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-100 w-full rounded-xl border border-dashed border-border bg-card/50 text-card-foreground transition-colors duration-300">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl dark:bg-primary/20" />

          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
            <FolderSearch className="w-12 h-12 stroke-[1.5]" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            No Data Available
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            There is no data to display right now.
            <br />
            Try adjusting your filters or check back later.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="gap-2 px-6 shadow-sm hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
