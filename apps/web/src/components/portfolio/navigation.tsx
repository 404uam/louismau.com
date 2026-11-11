"use client";

import {
	ArrowRightIcon,
	ArrowUpRightIcon,
	ListIcon,
	XIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import type { SectionLink } from "@/app/types/portfolio";
import { Button } from "@/components/ui/button";
import styles from "./portfolio.module.css";
import { useResume } from "./resume-dialog";
import { useSidebar } from "./sidebar-state";

const MOBILE_OVERLAY_QUERY = "(max-width: 1023px)";

export function PortfolioNavigation({
	projects,
	collections,
	footer,
	collapsible = false,
}: {
	projects: SectionLink[];
	collections: SectionLink[];
	footer: ReactNode;
	collapsible?: boolean;
}) {
	const pathname = usePathname();
	const { open: menuOpen, setOpen } = useSidebar();
	const toggleRef = useRef<HTMLButtonElement>(null);
	const sidebarRef = useRef<HTMLElement>(null);
	const { openResume } = useResume();
	const isSoftware = pathname === "/software";
	const sections = isSoftware ? projects : collections;

	function closeMenu() {
		setOpen(false);
	}

	useEffect(() => {
		if (!collapsible || !menuOpen) return;

		function handlePointerDown(event: PointerEvent) {
			const sidebar = sidebarRef.current;
			if (
				window.matchMedia(MOBILE_OVERLAY_QUERY).matches &&
				sidebar &&
				event.target instanceof Node &&
				!sidebar.contains(event.target)
			) {
				closeMenu();
			}
		}

		document.addEventListener("pointerdown", handlePointerDown, true);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown, true);
		};
	}, [collapsible, menuOpen, setOpen]);

	return (
		<aside
			ref={sidebarRef}
			className={`${styles.sidebar} ${collapsible ? styles.entrySidebar : ""}`}
			data-open={menuOpen}
			onBlur={(event) => {
				if (
					collapsible &&
					menuOpen &&
					window.matchMedia(MOBILE_OVERLAY_QUERY).matches &&
					!(
						event.relatedTarget instanceof Node &&
						event.currentTarget.contains(event.relatedTarget)
					)
				) {
					closeMenu();
				}
			}}
			onKeyDown={(event) => {
				if (event.key === "Escape" && menuOpen) {
					closeMenu();
					toggleRef.current?.focus();
				}
			}}
		>
			<div className={styles.mobileBar}>
				<Link
					href="/"
					className={styles.brand}
					onClick={collapsible ? undefined : closeMenu}
				>
					Louis Mau
				</Link>
				<Button
					ref={toggleRef}
					type="button"
					variant="outline"
					className={styles.menuToggle}
					aria-expanded={menuOpen}
					aria-controls="portfolio-navigation"
					aria-label={
						collapsible ? (menuOpen ? "Close menu" : "Open menu") : undefined
					}
					onClick={() => setOpen((open) => !open)}
				>
					{collapsible ? null : menuOpen ? "Close menu" : "Menu"}
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
									onClick={collapsible ? undefined : closeMenu}
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
							const returnTo =
								collapsible || window.matchMedia(MOBILE_OVERLAY_QUERY).matches
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
