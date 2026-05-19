import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

export default function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        Louis Mau
      </h1>
      <p className="max-w-md text-base text-slate-600">
        This site is currently under development. Please check back soon.
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/404uam"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <GithubLogo size={20} weight="regular" />
        </a>
        <a
          href="https://www.linkedin.com/in/louis-mau"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          <LinkedinLogo size={20} weight="regular" />
        </a>
      </div>
    </main>
  );
}
