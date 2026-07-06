import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import {
  Select,
  SelectButton,
  SelectItem,
  SelectPopup,
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
  const { theme, setTheme, mounted } = useTheme();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const popupId = useId();

  useEffect(() => {
    setContainer(document.getElementById(PORTAL_ROOT_ID));
  }, []);

  const active = themes.find((t) => t.value === theme) ?? themes[2];
  const Icon = active.icon;

  return (
    <Select
      value={theme}
      onValueChange={(newValue) => newValue && setTheme(newValue)}
    >
      <SelectButton
        aria-label="Select theme"
        aria-controls={popupId}
        className={cn("w-auto min-w-0 gap-1.5 ps-2.5 pe-2", className)}
      >
        {mounted ? (
          <Icon aria-hidden="true" className="size-4" />
        ) : (
          <span className="size-4" />
        )}
      </SelectButton>
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
