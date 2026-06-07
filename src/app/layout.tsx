import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ImgDrift - Personal Visual AI Project Space",
  description:
    "ImgDrift is a personal visual AI project space for image generation, generation logic, visual materials, and future AI image tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
