"use client";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/app/_modules/auth/utils/constants";
import LogoutBtn from "@/app/_modules/auth/views/logout-btn";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/providers", label: "Providers" },
];
const Headers = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0"
          >
            <GraduationCap
              size={256}
              strokeWidth={3}
              className="h-5 w-5 text-sky-300"
            />
            <span className="font-bold text-foreground">LMS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="w-75 flex gap-4">
              <Button
                variant="outline"
                onClick={() => router.push(AUTH_ROUTES.login)}
              >
                Login
              </Button>
              <Button
                variant="default"
                onClick={() => router.push(AUTH_ROUTES.register)}
              >
                Register
              </Button>
              <LogoutBtn />
            </div>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Menu Panel — slides in from left, starts below the header (top-16) */}
          <div className="fixed left-0 top-16 bottom-0 w-72 bg-background shadow-xl animate-in slide-in-from-left overflow-y-auto">
            <div className="flex flex-col p-6 space-y-6">
              {/* Nav links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-3 rounded-lg hover:bg-accent"
                    onClick={closeMenu}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Auth buttons for unauthenticated users on mobile */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Headers;
