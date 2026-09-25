import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Job application tracker built with Next.Js and MySQL.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "bg-white", poppins.className)}
    >
      <body className="min-h-full flex flex-col items-center overflow-x-hidden bg-neutral-200/50 text-neutral-950">
        {children}
      </body>
    </html>
  );
}
