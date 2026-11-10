import type { Metadata } from "next";
import { PhotoGallery } from "@/components/portfolio/photo-gallery";
import styles from "@/components/portfolio/portfolio.module.css";
import { collections } from "@/data/photos";

const title = "Photography | Louis Mau";
const description = "Photographs by Louis Mau.";
export const metadata: Metadata = {
	title,
	description,
	openGraph: { title, description, type: "website" },
	twitter: { card: "summary_large_image", title, description },
};

export default function PhotographyPage() {
	return (
		<main id="main-content" tabIndex={-1} className={styles.content}>
			<header className={styles.pageHeader}>
				<div className={styles.pageTopline}>
					<p className={styles.label}>Louis Mau / Selected frames</p>
					<span className={styles.label}>A photographic index</span>
				</div>
				<div className={styles.pageHeading}>
					<h1>Photography</h1>
					<p>{description}</p>
				</div>
			</header>
			<PhotoGallery collections={collections} />
		</main>
	);
}
