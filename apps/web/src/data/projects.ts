import type { Project } from "@/app/types/portfolio";

// Array order controls the featured project, grid, and sidebar.
export const projects: readonly Project[] = [
	{
		id: "calendar",
		name: "Calendar",
		description:
			"A calm, local-first calendar for seeing what matters now without turning planning into another chore.",
		year: 2026,
		technologies: ["Next.js", "TypeScript", "Tauri", "Dexie", "IndexedDB"],
		visual: "calendar",
		caseStudy: "/software/calendar",
		github: "https://github.com/404uam/louismau.com/tree/main/apps/calendar",
	},
];
