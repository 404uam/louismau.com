import {
	DatabaseIcon,
	GithubLogoIcon,
	LayoutIcon,
	LockKeyIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarPreview } from "@/components/portfolio/calendar-preview";
import portfolioStyles from "@/components/portfolio/portfolio.module.css";
import { ResumeButton } from "@/components/portfolio/resume-dialog";
import { Button } from "@/components/ui/button";
import styles from "./page.module.css";

const githubUrl =
	"https://github.com/404uam/louismau.com/tree/main/apps/calendar";

const title = "Calendar Case Study | Louis Mau";
const description =
	"A local-first calendar designed to make time visible without making planning feel like work.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: { title, description, type: "article" },
	twitter: { card: "summary_large_image", title, description },
};

export default function CalendarCaseStudyPage() {
	return (
		<main id="main-content" tabIndex={-1} className={portfolioStyles.content}>
			<header className={styles.hero}>
				<div className={portfolioStyles.pageTopline}>
					<Link href="/software" className={styles.backLink}>
						Software
					</Link>
					<ResumeButton />
				</div>

				<div className={styles.heroCopy}>
					<p className={portfolioStyles.label}>
						Case study / 2026 / In development
					</p>
					<h1>Calendar, without the clutter.</h1>
					<p className={styles.introduction}>{description}</p>
				</div>

				<dl className={styles.facts}>
					<div>
						<dt>Role</dt>
						<dd>Product design & engineering</dd>
					</div>
					<div>
						<dt>Platform</dt>
						<dd>Web & desktop</dd>
					</div>
					<div>
						<dt>Data model</dt>
						<dd>Local-first</dd>
					</div>
					<div>
						<dt>Status</dt>
						<dd>Pre-release</dd>
					</div>
				</dl>

				<div className={styles.heroActions}>
					<Button asChild variant="outline" className={styles.actionButton}>
						<a href="#design-story">Read the design story </a>
					</Button>
					<Button asChild className={styles.actionButton}>
						<a href={githubUrl} target="_blank" rel="noopener noreferrer">
							View on GitHub{" "}
							<GithubLogoIcon data-icon="inline-end" aria-hidden />
						</a>
					</Button>
				</div>
			</header>

			<section
				id="demo"
				className={styles.demoSection}
				aria-labelledby="demo-title"
			>
				<div className={styles.sectionIntro}>
					<div>
						<p className={portfolioStyles.label}>Product preview / Static</p>
						<h2 id="demo-title">The completed month view, at a glance.</h2>
					</div>
					<p>
						This lightweight representation mirrors the implemented calendar
						layout and sample information. It is intentionally static: the
						portfolio does not load personal data or access calendar storage.
					</p>
				</div>

				<div className={styles.demoPreview}>
					<div className={styles.demoChrome}>
						<div>
							<span className={styles.statusDot} aria-hidden="true" />
							<span>Static product preview</span>
						</div>
						<span>November 2026</span>
					</div>
					<div className={styles.demoCanvas} aria-hidden="true">
						<CalendarPreview />
					</div>
					<div className={styles.demoFooter}>
						<p>
							Shown here: the implemented month layout with sample events,
							tasks, overflow items, and the available calendar time scales.
						</p>
						<ul aria-label="Available calendar views">
							<li>Month</li>
							<li>Week</li>
							<li>3-day</li>
							<li>Day</li>
						</ul>
					</div>
				</div>
			</section>

			<article id="design-story" className={styles.article}>
				<header className={styles.articleHeader}>
					<p className={portfolioStyles.label}>Design notes / 01</p>
					<h2>
						A calendar should reduce decisions, not add another dashboard.
					</h2>
					<p>
						Most calendar tools are good at storing time. The harder problem is
						helping someone understand it at a glance. This project explores how
						much the interface can remove while preserving the detail power
						users need.
					</p>
				</header>

				<section className={styles.storySection}>
					<p className={portfolioStyles.label}>The brief</p>
					<div className={styles.proseGrid}>
						<h3>Start with attention.</h3>
						<div className={styles.prose}>
							<p>
								The visual language is intentionally quiet: strong typographic
								hierarchy, restrained color, and one clear moment of emphasis
								for the current date. Events should support the day instead of
								turning the month into a wall of labels.
							</p>
							<p>
								The same principle shapes the product model. A person should be
								able to open the calendar, find the next relevant decision, and
								continue with their day without configuring a system first.
							</p>
						</div>
					</div>
				</section>

				<section className={styles.storySection}>
					<p className={portfolioStyles.label}>Design decisions / 02</p>
					<div className={styles.decisionGrid}>
						<div className={styles.decision}>
							<LayoutIcon size={22} aria-hidden />
							<h3>One surface, four time scales</h3>
							<p>
								Month, week, 3-day, and day views share the same navigation and
								event language. The user changes perspective without relearning
								the interface.
							</p>
						</div>
						<div className={styles.decision}>
							<DatabaseIcon size={22} aria-hidden />
							<h3>Local-first by default</h3>
							<p>
								IndexedDB storage through Dexie keeps the core experience quick
								and available without depending on a remote account just to view
								a schedule.
							</p>
						</div>
						<div className={styles.decision}>
							<LockKeyIcon size={22} aria-hidden />
							<h3>Private before connected</h3>
							<p>
								The baseline is a calendar that belongs to the device. Future
								sync and integrations can be added deliberately instead of being
								a prerequisite for the product to be useful.
							</p>
						</div>
					</div>
				</section>

				<section className={styles.storySection}>
					<p className={portfolioStyles.label}>Architecture / 03</p>
					<div className={styles.proseGrid}>
						<h3>Simple at the edge, structured underneath.</h3>
						<div className={styles.prose}>
							<p>
								The application uses Next.js and TypeScript for the interface,
								Dexie as the IndexedDB boundary, and Tauri for the desktop
								package. Keeping persistence behind a small domain layer gives
								the visual system room to evolve without making every view
								understand browser storage.
							</p>
							<ol
								className={styles.architecture}
								aria-label="Architecture flow"
							>
								<li>Calendar views</li>
								<li aria-hidden="true">→</li>
								<li>Domain model</li>
								<li aria-hidden="true">→</li>
								<li>Dexie</li>
								<li aria-hidden="true">→</li>
								<li>IndexedDB</li>
							</ol>
						</div>
					</div>
				</section>

				<section className={styles.storySection}>
					<p className={portfolioStyles.label}>What the preview shows / 04</p>
					<div className={styles.proseGrid}>
						<h3>Useful in a minute, honest about its boundaries.</h3>
						<div className={styles.prose}>
							<p>
								The portfolio preview uses a fixed sample month rather than real
								personal data. It makes the completed layout understandable
								without asking for permissions, creating an account, or
								accessing IndexedDB.
							</p>
							<ul className={styles.checkList}>
								<li>
									Distinguish events from tasks without adding visual noise.
								</li>
								<li>
									Keep dates, items, and overflow states readable at a glance.
								</li>
								<li>Expose month, week, 3-day, and single-day time scales.</li>
								<li>
									Separate the portfolio representation from personal data.
								</li>
							</ul>
						</div>
					</div>
				</section>

				<section className={styles.nextSection}>
					<div>
						<p className={portfolioStyles.label}>Next / Release scope</p>
						<h2>Prove the daily loop before expanding the surface area.</h2>
					</div>
					<p>
						The first public milestone is intentionally narrow: dependable event
						management, readable calendar views, resilient local storage, and a
						portfolio-safe preview. Accounts, cloud sync, and external calendar
						connections come only after that baseline feels complete.
					</p>
				</section>
			</article>

			<footer className={styles.caseStudyFooter}>
				<div>
					<p className={portfolioStyles.label}>Follow the build</p>
					<h2>Explore the source as it develops.</h2>
				</div>
				<Button asChild className={styles.actionButton}>
					<a href={githubUrl} target="_blank" rel="noopener noreferrer">
						Open GitHub
					</a>
				</Button>
			</footer>
		</main>
	);
}
