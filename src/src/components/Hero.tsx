export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_right,_#fdf2e9,_transparent_35%),radial-gradient(circle_at_left,_#e2e8f0,_transparent_45%)]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Photography + Software
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Building thoughtful software and capturing precise visual stories.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          I am Louis Mau, a software engineer and photographer focused on systems that feel clean,
          useful, and human.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#photos"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Explore Photos
          </a>
          <a
            href="#software"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
          >
            View Software
          </a>
          <a
            href="#contact"
            className="rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-800 underline-offset-4 transition hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
