import { ArrowUpRightIcon, CodeIcon } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/app/types/portfolio";
import { Button } from "@/components/ui/button";
import styles from "./portfolio.module.css";
import { PortfolioImage } from "./portfolio-image";

function ProjectCard({
	project,
	featured = false,
}: {
	project: Project;
	featured?: boolean;
}) {
	return (
		<article
			id={`project-${project.id}`}
			className={featured ? styles.featuredProject : styles.project}
		>
			{project.preview ? (
				<PortfolioImage
					key={project.preview.src}
					image={project.preview}
					sizes={
						featured
							? "(min-width: 1536px) 36rem, (min-width: 1024px) calc(60vw - 13rem), calc(100vw - 3rem)"
							: "(min-width: 1536px) 32rem, (min-width: 1024px) calc((100vw - 22rem) / 2), (min-width: 768px) calc((100vw - 6rem) / 2), calc(100vw - 3rem)"
					}
				/>
			) : null}
			<div className={styles.projectDescription}>
				<p className={styles.label}>
					<time dateTime={String(project.year)}>{project.year}</time>
				</p>
				<h2>{project.name}</h2>
				<p>{project.description}</p>
				{project.technologies.length > 0 ? (
					<ul
						className={styles.technologies}
						aria-label={`${project.name} technologies`}
					>
						{project.technologies.map((technology) => (
							<li key={technology}>{technology}</li>
						))}
					</ul>
				) : null}
				{project.live || project.github ? (
					<div className={styles.projectActions}>
						{project.live ? (
							<Button asChild className={styles.projectLink}>
								<a
									href={project.live}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Live demo of ${project.name} (opens in a new tab)`}
								>
									Live demo <ArrowUpRightIcon size={16} aria-hidden />
								</a>
							</Button>
						) : null}
						{project.github ? (
							<Button asChild variant="outline" className={styles.projectLink}>
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Source for ${project.name} (opens in a new tab)`}
								>
									Source <CodeIcon size={16} aria-hidden />
								</a>
							</Button>
						) : null}
					</div>
				) : null}
			</div>
		</article>
	);
}

export function ProjectGallery({ projects }: { projects: readonly Project[] }) {
	const [featured, ...remaining] = projects;
	if (!featured)
		return (
			<section className={styles.emptyState} aria-labelledby="projects-heading">
				<h2 id="projects-heading" className={styles.label}>
					Selected projects
				</h2>
				<p>Projects will appear here as they are added.</p>
			</section>
		);
	return (
		<section aria-label="Selected projects" className={styles.projects}>
			<ProjectCard project={featured} featured />
			{remaining.length > 0 ? (
				<div className={styles.projectGrid}>
					{remaining.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : null}
		</section>
	);
}
