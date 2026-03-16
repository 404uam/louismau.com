import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SoftwarePortfolio } from "@/components/SoftwarePortfolio";
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <section className="border-b border-slate-200 bg-slate-50 py-6">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <a
              className="inline-flex items-center justify-center rounded-full border border-cyan-500/60 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-500/10"
              href="/admin"
            >
              Admin Uploads
            </a>
          </div>
        </section>
        <section id="photos" className="bg-white py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Photography
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  Featured Work
                </h2>
              </div>
              <a
                className="text-sm font-semibold text-slate-800 underline-offset-4 hover:underline"
                href="#top"
              >
                Back to top
              </a>
            </div>
            <PhotoGallery />
          </div>
        </section>
        <section id="software" className="border-y border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Software
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Selected Projects
            </h2>
            <p className="mt-4 max-w-2xl text-base text-slate-700">
              A snapshot of recent engineering work across product, platform, and tooling.
            </p>
            <div className="mt-10">
              <SoftwarePortfolio />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-white py-20">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Let us build something meaningful.
            </h2>
            <p className="mt-4 text-base text-slate-700">
              Share a project idea, collaboration request, or photo inquiry.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
