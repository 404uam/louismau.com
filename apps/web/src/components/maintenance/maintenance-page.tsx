import {
	GithubLogoIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import DraggableHaku from "@/components/maintenance/draggable-haku";
import MaintenanceResume from "@/components/maintenance/maintenance-resume";
import { GITHUB_URL, LINKEDIN_URL, PHOTOGRAPHY_INSTAGRAM_URL } from "@/consts";
import { ModeToggle } from "../ui/theme-selector";

export default function MaintenancePage() {
	return (
		<MaintenanceResume>
			<DraggableHaku />
			<h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
				Louis Mau
			</h1>
			<p className="max-w-md text-base text-slate-600 dark:text-slate-300">
				This site is temporarily unavailable while I make a few updates. Please
				check back soon.
			</p>
			<div className="flex items-center gap-3">
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noreferrer noopener"
					aria-label="GitHub"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
				>
					<GithubLogoIcon size={20} weight="duotone" />
				</a>
				<a
					href={LINKEDIN_URL}
					target="_blank"
					rel="noreferrer noopener"
					aria-label="LinkedIn"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
				>
					<LinkedinLogoIcon size={20} weight="duotone" />
				</a>
				<a
					href={PHOTOGRAPHY_INSTAGRAM_URL}
					target="_blank"
					rel="noreferrer noopener"
					aria-label="Photography Instagram"
					className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
				>
					<InstagramLogoIcon size={20} weight="duotone" />
				</a>
				<div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800">
					<ModeToggle />
				</div>
			</div>
		</MaintenanceResume>
	);
}
