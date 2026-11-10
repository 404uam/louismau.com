"use client";

import {
	ArrowLeftIcon,
	ArrowRightIcon,
	ArrowUpRightIcon,
	ListIcon,
	XIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";
import type { SectionLink } from "@/app/types/portfolio";
import { Button } from "@/components/ui/button";
import { EMAIL_URL } from "@/consts";
import styles from "./portfolio.module.css";
import { useResume } from "./resume-dialog";

export function PortfolioNavigation({
	projects,
	collections,
	footer,
}: {
	projects: SectionLink[];
	collections: SectionLink[];
	footer: ReactNode;
}) {
	const pathname = usePathname();
	const [menu, setMenu] = useState({ path: pathname, open: false });
	const toggleRef = useRef<HTMLButtonElement>(null);
	const { openResume } = useResume();
	const menuOpen = menu.path === pathname && menu.open;
	const isSoftware = pathname === "/software";
	const sections = isSoftware ? projects : collections;

	function closeMenu() {
		setMenu({ path: pathname, open: false });
	}

	return (
		<aside
			className={styles.sidebar}
			onKeyDown={(event) => {
				if (event.key === "Escape" && menuOpen) {
					closeMenu();
					toggleRef.current?.focus();
				}
			}}
		>
			<div className={styles.mobileBar}>
				<Link href="/" className={styles.brand} onClick={closeMenu}>
					Louis Mau
				</Link>
				<Button
					ref={toggleRef}
					type="button"
					variant="outline"
					className={styles.menuToggle}
					aria-expanded={menuOpen}
					aria-controls="portfolio-navigation"
					onClick={() => setMenu({ path: pathname, open: !menuOpen })}
				>
					{menuOpen ? "Close menu" : "Menu"}
					{menuOpen ? (
						<XIcon size={18} aria-hidden />
					) : (
						<ListIcon size={18} aria-hidden />
					)}
				</Button>
			</div>
			<div
				id="portfolio-navigation"
				className={styles.navigationPanel}
				data-open={menuOpen}
			>
				<Link href="/" className={styles.backLink} onClick={closeMenu}>
					<ArrowLeftIcon size={14} aria-hidden /> Back to entry
				</Link>
				<nav aria-label="Portfolio navigation" className={styles.disciplineNav}>
					<p className={styles.label}>Explore</p>
					<ul>
						{[
							{ href: "/software", label: "Software" },
							{ href: "/photography", label: "Photography" },
						].map(({ href, label }) => (
							<li key={href}>
								<Link
									href={href}
									aria-current={pathname === href ? "page" : undefined}
									className={styles.disciplineLink}
									onClick={closeMenu}
								>
									{label}
									{pathname === href ? (
										<ArrowRightIcon size={18} aria-hidden />
									) : (
										<ArrowUpRightIcon size={18} aria-hidden />
									)}
								</Link>
								{pathname === href && sections.length > 0 ? (
									<ul className={styles.sectionLinks}>
										{sections.map(({ id, label: sectionLabel }) => (
											<li key={id}>
												<a href={`#${id}`} onClick={closeMenu}>
													{sectionLabel}
												</a>
											</li>
										))}
									</ul>
								) : null}
							</li>
						))}
					</ul>
				</nav>
				<div className={styles.sidebarFooter}>
					<Button
					type="button"
					variant="outline"
					className={styles.sidebarResume}
					aria-haspopup="dialog"
					onClick={(event) => {
						const returnTo = window.matchMedia("(max-width: 1023px)").matches
							? toggleRef.current
							: event.currentTarget;
						closeMenu();
						openResume(returnTo ?? event.currentTarget);
					}}
				>
					View resume <ArrowUpRightIcon size={18} aria-hidden />
				</Button>
					{footer}
				</div>
			</div>
		</aside>
	);
}
