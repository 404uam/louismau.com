import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PortfolioNavigation } from "@/components/portfolio/navigation";
import styles from "@/components/portfolio/portfolio.module.css";
import { ResumeProvider } from "@/components/portfolio/resume-dialog";
import { SocialLinks } from "@/components/portfolio/social-links";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className={`${styles.theme} ${styles.site} ${styles.entrySite}`}>
			<a href="#main-content" className={styles.skipLink}>
				Skip to content
			</a>
			<ResumeProvider>
				<PortfolioNavigation
					collapsible
					projects={[]}
					collections={[]}
					footer={
						<>
							<SocialLinks />
							<p className={styles.copyright}>
								© {new Date().getFullYear()} Louis Mau
							</p>
						</>
					}
				/>
				<div className={styles.entry}>
					<header className={styles.entryHeader}>
						<span className={styles.label}>Personal portfolio</span>
						<span className={styles.label}>Software / Photography</span>
					</header>
					<main id="main-content" tabIndex={-1} className={styles.entryMain}>
						<h1 className={styles.wordmark}>Louis Mau</h1>
						<SocialLinks />
						<nav aria-label="Choose a portfolio" className={styles.directions}>
							<Button asChild className={styles.directionLink}>
								<Link href="/software">
									Software <ArrowUpRightIcon size={18} aria-hidden />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className={styles.directionLink}
							>
								<Link href="/photography">
									Photography <ArrowUpRightIcon size={18} aria-hidden />
								</Link>
							</Button>
						</nav>
					</main>
					<footer className={styles.entryFooter}>
						<span className={styles.label}>
							© {new Date().getFullYear()} Louis Mau
						</span>
					</footer>
				</div>
			</ResumeProvider>
		</div>
	);
}
