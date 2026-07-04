import { useEffect, useState } from "react";

export function usePortalContainer(): HTMLElement | null {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("ui-portal-root"));
  }, []);

  return container;
}
