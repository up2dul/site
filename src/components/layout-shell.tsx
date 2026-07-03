"use client";

import type { ReactNode } from "react";
import { FadeIn } from "./fade-in";
import { Footer } from "./footer";
import { Header } from "./header";
import { ThemeProvider } from "./theme-provider";

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({
  children,
}: LayoutShellProps): React.ReactElement {
  return (
    <ThemeProvider>
      <div className="print:hidden">
        <Header />
      </div>
      <FadeIn>{children}</FadeIn>
      <div className="print:hidden">
        <Footer />
      </div>
    </ThemeProvider>
  );
}
