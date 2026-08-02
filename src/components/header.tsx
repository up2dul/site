import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetPanel,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "TIL", href: "/til" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-4 z-40 mx-auto mt-4 flex h-14 w-[80vw] items-center justify-end gap-4 rounded-xl bg-background/80 px-4 backdrop-blur-md transition-[box-shadow,max-width] duration-300 ease-out sm:justify-between",
        scrolled ? "shadow-sm sm:max-w-md" : "sm:max-w-xl"
      )}
    >
      <NavLinks className="hidden sm:block" />
      <ThemeSwitcher />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="sm:hidden" />}
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
    </header>
  );
}
