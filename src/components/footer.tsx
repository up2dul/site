import { useEffect, useState } from "react";

const currentYear = new Date().getFullYear();

export function Footer(): React.ReactElement {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour12: false,
      });
      setTime(`It's ${formatted} at UTC+7`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mx-auto w-full max-w-xl px-4 py-8">
      <div className="flex flex-col gap-4 border-t py-8 sm:flex-row-reverse sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm tabular-nums">{time}</p>

        <p className="text-muted-foreground text-sm">
          &copy; {currentYear}, Abdul Malik
        </p>
      </div>
    </footer>
  );
}
