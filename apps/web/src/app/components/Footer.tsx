import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Louis Mau. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <Button asChild variant="link" size="xs" className="h-auto px-0 text-slate-600">
            <a href="https://github.com/louismau" target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
          </Button>
          <Separator orientation="vertical" className="h-3 bg-slate-300" />
          <Button asChild variant="link" size="xs" className="h-auto px-0 text-slate-600">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
          </Button>
          <Separator orientation="vertical" className="h-3 bg-slate-300" />
          <Button asChild variant="link" size="xs" className="h-auto px-0 text-slate-600">
            <a href="mailto:hello@louismau.com">Email</a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
