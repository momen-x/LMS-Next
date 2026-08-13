"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  path: string;
  variant?: "sidebar" | "header" | "mobile";
  isSidebarOpen?: boolean;
  exact?: boolean;
  showTooltip?: boolean;
  onClick?: () => void;
}

const NavButton = ({
  icon: Icon,
  label,
  path,
  variant = "sidebar",
  isSidebarOpen = true,
  exact = false,
  onClick,
}: NavButtonProps) => {
  const pathname = usePathname();

  const normalizedPath =
    path.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  const normalizedPathname =
    pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  const isDashboardRoot = /^\/(student|instructor|admin)-dashboard$/.test(
    normalizedPath,
  );

  const isActive =
    exact || isDashboardRoot
      ? normalizedPathname === normalizedPath
      : normalizedPathname === normalizedPath ||
        normalizedPathname.startsWith(`${normalizedPath}/`);

  const variantConfig = {
    sidebar: {
      className: cn(
        "w-full px-3 py-2.5",
        isSidebarOpen ? "justify-start" : "justify-center",
      ),
      iconClass: isSidebarOpen ? "mr-3" : "mx-auto",
      showLabel: isSidebarOpen,
      size: "sm" as const,
    },
    header: {
      className: "flex-col h-auto px-3 py-2",
      iconClass: "mr-0 mb-1",
      showLabel: true,
      size: "sm" as const,
    },
    mobile: {
      className: "flex-col flex-1 h-auto px-2 py-2 min-w-[60px]",
      iconClass: "mr-0 mb-1",
      showLabel: true,
      size: "sm" as const,
    },
  };

  const config = variantConfig[variant];

  const buttonContent = (
    <div className="flex w-full items-center">
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          config.iconClass,
          isActive && "text-primary",
        )}
      />
      {config.showLabel && (
        <span
          className={cn(
            "whitespace-nowrap transition-colors",
            variant === "header" || variant === "mobile"
              ? "text-xs"
              : "text-sm",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );

  const buttonClasses = cn(
    "group relative flex min-h-10 items-center outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    config.className,
    isActive
      ? "bg-primary/10 font-semibold text-primary shadow-sm ring-1 ring-primary/20 dark:bg-primary/20 dark:text-primary dark:ring-primary/30"
      : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/70",
    // Different hover effects based on variant
    variant === "sidebar" && "rounded-lg",
    variant === "header" && "rounded-md hover:bg-accent/30",
    variant === "mobile" && "rounded-md text-xs",
  );

  // If onClick is provided, use button, otherwise use Link
  if (onClick) {
    return (
      <Button
        variant="ghost"
        size={config.size}
        className={buttonClasses}
        onClick={onClick}
        title={!config.showLabel ? label : undefined}
      >
        {buttonContent}

        {/* Active indicator for header/mobile variants */}
        {(variant === "header" || variant === "mobile") && isActive && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
        )}
      </Button>
    );
  }

  return (
    <Link
      href={normalizedPath}
      className={buttonClasses}
      title={!config.showLabel ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      {buttonContent}

      {/* Active indicator for header/mobile variants */}
      {(variant === "header" || variant === "mobile") && isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
      )}
    </Link>
  );
};

export default NavButton;
