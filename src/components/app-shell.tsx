"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}
