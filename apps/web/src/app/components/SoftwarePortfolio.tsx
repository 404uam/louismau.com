import Image from "next/image";
import { featuredProjects } from "@/app/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SoftwarePortfolio() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {featuredProjects.map((project) => (
        <Card
          key={project.id}
          className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-none"
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
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-950">{project.name}</h3>
              <span className="text-sm text-slate-500">{project.year}</span>
            </div>
            <p className="text-sm leading-6 text-slate-700">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-1 text-sm font-semibold">
              <Button asChild variant="link" size="xs" className="h-auto px-0 text-slate-900">
                <a href={project.github} target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
              </Button>
              {project.live ? (
                <Button asChild variant="link" size="xs" className="h-auto px-0 text-slate-900">
                  <a href={project.live} target="_blank" rel="noreferrer noopener">
                    Live Demo
                  </a>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
