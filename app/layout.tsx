import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers";

export const metadata: Metadata = {
  title: "Zydus Industrial Intelligence — Vacuum Pump Analytics",
  description:
    "Production-grade vacuum pump analytics dashboard for industrial monitoring.",
  openGraph: {
    title: "Zydus Industrial Intelligence — Vacuum Pump Analytics",
    description:
      "Production-grade vacuum pump analytics dashboard for industrial monitoring.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zydus Industry Intelligence Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zydus Industrial Intelligence — Vacuum Pump Analytics",
    description:
      "Production-grade vacuum pump analytics dashboard for industrial monitoring.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
