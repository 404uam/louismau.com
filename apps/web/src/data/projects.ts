import type { Project } from "@/app/types/portfolio";

// Array order controls the featured project, grid, and sidebar.
export const projects: readonly Project[] = [
	{
		id: "calendar",
		name: "Calendar",
		description:
			"A local calendar for trying to organize events, tasks and to-dos inspired by the musings of the WVFRM Podcast team",
		year: 2026,
		technologies: [
			"TypeScript",
			"Rust",
			"Tauri",
			"Next.js",
			"Dexie",
			"IndexedDB",
		],
		visual: "calendar",
		caseStudy: "/software/calendar",
		github: "https://github.com/404uam/louismau.com/tree/main/apps/calendar",
	},
];
