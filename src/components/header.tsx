"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetPanel,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "CV", href: "/cv" },
];

function NavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}): React.ReactElement {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0.5">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onNavigate}
              className="inline-flex rounded-md px-3 py-2 font-medium text-foreground text-sm hover:bg-accent hover:no-underline sm:px-2.5"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <a
          href="/"
          className="font-heading font-semibold text-lg hover:no-underline"
        >
          Abdul
        </a>

        <div className="flex items-center gap-2">
          <NavLinks className="hidden md:block" />
          <ThemeSwitcher />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <MenuIcon aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <SheetPanel>
                <NavLinks onNavigate={() => setOpen(false)} />
              </SheetPanel>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
