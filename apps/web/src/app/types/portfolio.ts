export interface PortfolioImage {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	year: number;
	technologies: readonly string[];
	preview?: PortfolioImage;
	github?: string;
	live?: string;
}

export interface Photo extends PortfolioImage {
	id: string;
	caption?: string;
	objectPosition?: string;
}

export interface PhotoCollection {
	id: string;
	title: string;
	description?: string;
	layout: "featured" | "grid";
	photos: readonly Photo[];
}

export interface SectionLink {
	id: string;
	label: string;
}
