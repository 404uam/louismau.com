"use client";

import { FileTextIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import { Dialog } from "radix-ui";
import {
	createContext,
	type ReactNode,
	useContext,
	useRef,
	useState,
} from "react";
import { Button } from "@/components/ui/button";
import styles from "./portfolio.module.css";

const ResumeCard = dynamic(() => import("@/components/resume/resume-card"), {
	loading: () => (
		<p role="status" className={styles.resumeLoading}>
			Loading resume…
		</p>
	),
});

const ResumeContext = createContext<{
	openResume: (returnTo: HTMLElement) => void;
} | null>(null);

export function useResume() {
	const value = useContext(ResumeContext);
	if (!value) throw new Error("Resume controls require ResumeProvider.");
	return value;
}

export function ResumeButton() {
	const { openResume } = useResume();
	return (
		<Button
			type="button"
			variant="outline"
			className={styles.resumeButton}
			aria-haspopup="dialog"
			onClick={(event) => openResume(event.currentTarget)}
		>
			View resume <FileTextIcon size={16} aria-hidden />
		</Button>
	);
}

export function ResumeProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const returnRef = useRef<HTMLElement | null>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	return (
		<ResumeContext.Provider
			value={{
				openResume: (returnTo) => {
					returnRef.current = returnTo;
					setOpen(true);
				},
			}}
		>
			{children}
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className={styles.dialogOverlay} />
					<Dialog.Content
						className={`${styles.theme} ${styles.resumeDialog}`}
						onOpenAutoFocus={(event) => {
							event.preventDefault();
							closeRef.current?.focus();
						}}
						onCloseAutoFocus={(event) => {
							event.preventDefault();
							returnRef.current?.focus();
						}}
					>
						<header className={styles.dialogHeader}>
							<div>
								<Dialog.Title className={styles.dialogTitle}>
									Resume
								</Dialog.Title>
								<Dialog.Description className={styles.dialogDescription}>
									Experience, skills, and education.
								</Dialog.Description>
							</div>
							<Dialog.Close asChild>
								<Button
									ref={closeRef}
									type="button"
									variant="ghost"
									className={styles.dialogClose}
								>
									Close <XIcon size={18} aria-hidden />
								</Button>
							</Dialog.Close>
						</header>
						{open ? (
							<ResumeCard
								presentation="portfolio"
								className={styles.resumeDocument}
							/>
						) : null}
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</ResumeContext.Provider>
	);
}
