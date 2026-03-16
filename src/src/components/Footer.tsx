export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Louis Mau. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            className="underline-offset-4 hover:underline"
            href="https://github.com/louismau"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            className="underline-offset-4 hover:underline"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a className="underline-offset-4 hover:underline" href="mailto:hello@louismau.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
