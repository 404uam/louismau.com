"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { EMAIL_URL } from "@/consts";
import styles from "./maintenance-resume.module.css";

const ResumeCard = dynamic(() => import("@/components/resume/resume-card"), {
	loading: () => (
		<p role="status" className={`${styles.resumePanel} p-4`}>
			Loading resume...
		</p>
	),
});

type MaintenanceResumeProps = {
	children: ReactNode;
};

export default function MaintenanceResume({
	children,
}: MaintenanceResumeProps) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleRef = useRef<HTMLButtonElement>(null);

	function closeResume() {
		setIsOpen(false);
		toggleRef.current?.focus();
	}

	return (
		<main
			className={styles.layout}
			data-resume-open={isOpen}
			onKeyDown={(event) => {
				if (event.key === "Escape" && isOpen) closeResume();
			}}
		>
			<div className={styles.profile}>
				{children}
				<div className={styles.actions}>
					<Button
						ref={toggleRef}
						type="button"
						aria-expanded={isOpen}
						aria-controls="maintenance-resume"
						onClick={() => setIsOpen((open) => !open)}
						variant="outline"
						className="min-h-11 rounded-md px-5 text-sm"
					>
						{isOpen ? "Hide resume" : "View resume"}
					</Button>
					<Button
						asChild
						variant="outline"
						className="min-h-11 rounded-md px-5 text-sm"
					>
						<a href={EMAIL_URL}>Email me</a>
					</Button>
				</div>
			</div>

			<div className={styles.resumeSlot} inert={!isOpen} aria-hidden={!isOpen}>
				<section id="maintenance-resume" aria-label="Resume">
					{isOpen ? (
						<ResumeCard onClose={closeResume} className={styles.resumePanel} />
					) : null}
				</section>
			</div>
		</main>
	);
}
