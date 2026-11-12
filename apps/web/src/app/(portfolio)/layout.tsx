import type { ReactNode } from "react";
import { PortfolioNavigation } from "@/components/portfolio/navigation";
import styles from "@/components/portfolio/portfolio.module.css";
import { ResumeProvider } from "@/components/portfolio/resume-dialog";
import { SocialLinks } from "@/components/portfolio/social-links";
import { collections } from "@/data/photos";
import { projects } from "@/data/projects";
import { collectionLinks, projectLinks } from "@/lib/portfolio";

export default function SidebarLayout({ children }: { children: ReactNode }) {
	return (
		<div className={`${styles.theme} ${styles.site}`}>
			<a href="#main-content" className={styles.skipLink}>
				Skip to content
			</a>
			<ResumeProvider>
				<PortfolioNavigation
					collapsible
					projects={projectLinks(projects)}
					collections={collectionLinks(collections)}
					footer={
						<>
							<SocialLinks />
							<p className={styles.copyright}>
								© {new Date().getFullYear()} Louis Mau
							</p>
						</>
					}
				/>
				<div className={styles.showcase}>{children}</div>
			</ResumeProvider>
		</div>
	);
}
