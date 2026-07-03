"use client";

import { Button, type ButtonProps } from "@/components/ui/button";

interface LinkButtonProps extends ButtonProps {
  href: string;
  target?: string;
  rel?: string;
}

export function LinkButton({
  href,
  target,
  rel,
  children,
  ...props
}: LinkButtonProps): React.ReactElement {
  return (
    <Button render={<a href={href} target={target} rel={rel} />} {...props}>
      {children}
    </Button>
  );
}
