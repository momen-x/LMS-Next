import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Headers from "@/components/sharing/headers";
import ReactQueryProviders from "@/providers/react-query-provider";
import ToasterProvider from "@/providers/toast-provider";
import { Footer } from "@/components/sharing/footer";
import { childrenPropsType } from "@/types/children-type";
import { DeleteDialogProvider } from "@/components/sharing/delete-dialog-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS app",
  description: "Learning Management System",
};

export default function RootLayout({ children }: Readonly<childrenPropsType>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider />

            <DeleteDialogProvider>
              <Headers />
              {children}
              <Footer />
            </DeleteDialogProvider>
          </ThemeProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
