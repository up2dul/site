import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
} from "@/components/ui/select";
import { PORTAL_ROOT_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { type Theme, useTheme } from "./theme-provider";

const themes: { label: string; value: Theme; icon: typeof SunIcon }[] = [
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
  { label: "System", value: "system", icon: MonitorIcon },
];

export function ThemeSwitcher({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const popupId = useId();

  useEffect(() => {
    setContainer(document.getElementById(PORTAL_ROOT_ID));
  }, []);

  const active = themes.find((t) => t.value === theme) ?? themes[2];

  return (
    <Select
      value={theme}
      onValueChange={(newValue) => newValue && setTheme(newValue)}
    >
      <SelectTrigger
        aria-label="Select theme"
        className={cn("w-auto min-w-0 gap-1.5 ps-2.5 pe-2", className)}
      >
        <span className="relative size-4">
          {themes.map(({ value, icon: ItemIcon }) => (
            <ItemIcon
              key={value}
              aria-hidden="true"
              className={cn(
                "absolute inset-0 size-4 transition-[opacity,scale,filter] duration-300",
                value === active.value
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-25 opacity-0 blur-[4px]"
              )}
              style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
            />
          ))}
        </span>
      </SelectTrigger>
      <SelectPopup
        id={popupId}
        alignItemWithTrigger={false}
        align="end"
        className="min-w-32"
        portalProps={{ container }}
      >
        {themes.map(({ label, value, icon: ItemIcon }) => (
          <SelectItem key={value} value={value}>
            <span className="flex items-center gap-2">
              <ItemIcon aria-hidden="true" className="size-4" />
              {label}
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
