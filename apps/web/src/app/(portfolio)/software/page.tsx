import type { Metadata } from "next";
import styles from "@/components/portfolio/portfolio.module.css";
import { ProjectGallery } from "@/components/portfolio/project-gallery";
import { ResumeButton } from "@/components/portfolio/resume-dialog";
import { projects } from "@/data/projects";

const title = "Software | Louis Mau";
const description =
	"Selected software engineering work and professional experience.";
export const metadata: Metadata = {
	title,
	description,
	openGraph: { title, description, type: "website" },
	twitter: { card: "summary_large_image", title, description },
};

export default function SoftwarePage() {
	return (
		<main id="main-content" tabIndex={-1} className={styles.content}>
			<header className={styles.pageHeader}>
				<div className={styles.pageTopline}>
					<p className={styles.label}>Louis Mau / Selected work</p>
					<ResumeButton />
				</div>
				<div className={styles.pageHeading}>
					<h1>Software</h1>
					<p>{description}</p>
				</div>
			</header>
			<ProjectGallery projects={projects} />
		</main>
	);
}
