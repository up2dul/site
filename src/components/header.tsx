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
      <ul className="flex flex-col gap-1 sm:flex-row">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onNavigate}
              className="inline-flex w-full rounded-md px-3 py-2 font-medium text-foreground text-sm hover:bg-accent hover:no-underline sm:px-2.5"
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
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
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
          <SheetContent side="right" className="w-70">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <SheetPanel>
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetPanel>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
