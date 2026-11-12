import type {
	PhotoCollection,
	Project,
	SectionLink,
} from "@/app/types/portfolio";

export function visibleCollections(collections: readonly PhotoCollection[]) {
	return collections.filter((collection) => collection.photos.length > 0);
}

export function projectLinks(projects: readonly Project[]): SectionLink[] {
	return projects.map(({ id, name }) => ({ id: `project-${id}`, label: name }));
}

export function collectionLinks(
	collections: readonly PhotoCollection[],
): SectionLink[] {
	return visibleCollections(collections).map(({ id, title }) => ({
		id: `collection-${id}`,
		label: title,
	}));
}
