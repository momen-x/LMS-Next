import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, MessageSquare } from "lucide-react";
import serverErrorImage from "@/public/assets/server-error.png";
import Image from "next/image";
import Link from "next/link";

export default function ServerError() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-4">
        <div className="text-sm font-medium text-muted-foreground px-2">
          50. 500 Server Error
        </div>

        <div className="bg-card text-card-foreground border border-border rounded-2xl p-8 shadow-sm flex flex-col items-center text-center space-y-6">
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl dark:bg-primary/20" />

            <div className="relative flex flex-col items-center justify-center gap-2">
              <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary">
                <Image
                  src={serverErrorImage}
                  alt="server-error"
                  width={256}
                  height={256}
                  className="object-contain drop-shadow-md dark:drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-destructive/10 text-destructive p-2 rounded-full border border-destructive/20 shadow-sm">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-tight text-foreground">
              500
            </h1>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Server Error
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Something went wrong on our end.
              <br />
              Please try again later.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
            <Link href={"/"}>
              <Button className="w-full sm:w-auto flex-1 gap-2 shadow-sm">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button
                variant="outline"
                className="w-full sm:w-auto flex-1 gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
