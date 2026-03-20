const uploadSteps = [
  "Authenticate admin session",
  "Request short-lived upload URL",
  "Upload file directly to object storage",
  "Save photo metadata and publish",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
            Admin Console
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Photo Uploads
          </h1>
          <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
            This page is the first step toward a secure upload flow. Files should
            be uploaded with presigned URLs so they never pass through the app
            server.
          </p>
        </header>

        <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Photo Title</span>
            <input
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              type="text"
              name="title"
              placeholder="Sunset in Lisbon"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300">Alt Text</span>
            <input
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
              type="text"
              name="alt"
              placeholder="Orange sunset above rooftops"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-sm text-slate-300">Choose File</span>
            <input
              className="rounded-lg border border-dashed border-cyan-600/80 bg-slate-950 px-3 py-4 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-950 hover:file:bg-cyan-400"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
            />
          </label>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-medium">Upload Flow</h2>
          <ol className="mt-4 grid gap-3 text-sm text-slate-300">
            {uploadSteps.map((step) => (
              <li
                className="rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3"
                key={step}
              >
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              type="button"
            >
              Request Upload URL
            </button>
            <button
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              type="button"
            >
              Save Metadata
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
