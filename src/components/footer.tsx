import { RssIcon } from "lucide-react";
import { GithubIcon } from "./icons";

const currentYear = new Date().getFullYear();

export function Footer(): React.ReactElement {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">&copy; {currentYear}</p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            <li>
              <a href="/llms.txt" className="link-hover">
                llms.txt
              </a>
            </li>
            <li>
              <a
                href="/rss.xml"
                className="link-hover inline-flex items-center gap-1.5"
              >
                <RssIcon aria-hidden="true" className="size-4" />
                RSS
              </a>
            </li>
            <li>
              <a
                href="https://github.com/up2dul/site"
                target="_blank"
                rel="noreferrer"
                className="link-hover inline-flex items-center gap-1.5"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
