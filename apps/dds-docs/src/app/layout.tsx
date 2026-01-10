import type { Metadata } from "next";
import "./globals.css";
import Header from "@/widgets/header/ui/Header";
import { themeInitScript } from "@/shared/theme";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import { LoadingBar } from "@cher1shrxd/loading";

export const metadata: Metadata = {
  title: "DDS docs",
  description: "도담도담 디자인 시스템 DDS 문서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased bg-background-default text-text-primary">
        <LoadingBar color="var(--dds-color-brand-primary)" />
        <Header />
        <div className="w-full max-w-360 mx-auto px-2 flex items-start pt-14">
          <Sidebar />
          <main className="flex-1 pl-50 pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
