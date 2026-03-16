import Image from "next/image";
import { featuredProjects } from "@/app/data/projects";

export function SoftwarePortfolio() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {featuredProjects.map((project) => (
        <article
          key={project.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={project.image}
              alt={`${project.name} project preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-950">{project.name}</h3>
              <span className="text-sm text-slate-500">{project.year}</span>
            </div>
            <p className="text-sm leading-6 text-slate-700">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-1 text-sm font-semibold">
              <a
                className="text-slate-900 underline-offset-4 hover:underline"
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
              {project.live ? (
                <a
                  className="text-slate-900 underline-offset-4 hover:underline"
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
