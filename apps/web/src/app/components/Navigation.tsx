import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#photos", label: "Photos" },
  { href: "#software", label: "Software" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Button asChild variant="link" size="sm" className="h-auto px-0 text-slate-900">
          <a href="#top" className="text-sm font-semibold tracking-wide">
            Louis Mau
          </a>
        </Button>

        <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <li key={item.href}>
              <Button asChild variant="link" size="sm" className="h-auto px-0 text-slate-700">
                <a href={item.href}>{item.label}</a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
