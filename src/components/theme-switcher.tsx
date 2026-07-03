"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  Select,
  SelectButton,
  SelectItem,
  SelectPopup,
} from "@/components/ui/select";
import { type Theme, useTheme } from "./theme-provider";

const themes: { label: string; value: Theme; icon: typeof SunIcon }[] = [
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
  { label: "System", value: "system", icon: MonitorIcon },
];

export function ThemeSwitcher(): React.ReactElement {
  const { theme, setTheme } = useTheme();

  const active = themes.find((t) => t.value === theme) ?? themes[2];
  const Icon = active.icon;

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
      <SelectButton
        aria-label="Select theme"
        className="w-auto min-w-0 gap-1.5 ps-2.5 pe-2"
      >
        <Icon aria-hidden="true" className="size-4" />
        <span className="hidden sm:inline">{active.label}</span>
      </SelectButton>
      <SelectPopup align="end" className="min-w-[8rem]">
        {themes.map(({ label, value, icon: ItemIcon }) => (
          <SelectItem key={value} value={value}>
            <ItemIcon aria-hidden="true" className="size-4" />
            {label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
