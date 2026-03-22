import { ContactForm } from "@/app/components/ContactForm";
import { Footer } from "@/app/components/Footer";
import { Hero } from "@/app/components/Hero";
import { Navigation } from "@/app/components/Navigation";
import { PhotoGallery } from "@/app/components/PhotoGallery";
import { Section, SectionHeader } from "@/app/components/Section";
import { SoftwarePortfolio } from "@/app/components/SoftwarePortfolio";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Section className="border-b border-slate-200 bg-slate-50 py-6">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-cyan-500/60 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-500/10"
          >
            <a href="/admin">Admin Uploads</a>
          </Button>
        </Section>

        <Section id="photos" className="bg-white py-20">
          <SectionHeader
            eyebrow="Photography"
            title="Featured Work"
            action={
              <Button asChild variant="link" size="sm" className="h-auto px-0 text-slate-800">
                <a href="#top">Back to top</a>
              </Button>
            }
          />
          <PhotoGallery />
        </Section>

        <Section id="software" className="border-y border-slate-200 bg-slate-50 py-20">
          <SectionHeader
            eyebrow="Software"
            title="Selected Projects"
            description="A snapshot of recent engineering work across product, platform, and tooling."
          />
          <div className="mt-10">
            <SoftwarePortfolio />
          </div>
        </Section>

        <Section id="contact" className="bg-white py-20" containerClassName="max-w-3xl">
          <SectionHeader
            eyebrow="Contact"
            title="Let us build something meaningful."
            description="Share a project idea, collaboration request, or photo inquiry."
          />
          <div className="mt-8">
            <ContactForm />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
