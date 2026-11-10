import type { Photo, PhotoCollection } from "@/app/types/portfolio";
import { visibleCollections } from "@/lib/portfolio";
import styles from "./portfolio.module.css";
import { PortfolioImage } from "./portfolio-image";

function PhotoFigure({
	photo,
	featured = false,
	hero = false,
}: {
	photo: Photo;
	featured?: boolean;
	hero?: boolean;
}) {
	return (
		<figure className={`${styles.photo} ${hero ? styles.photoHero : ""}`}>
			<PortfolioImage
				key={photo.src}
				image={photo}
				crop={featured}
				objectPosition={photo.objectPosition}
				sizes={
					hero
						? "(min-width: 1536px) 39rem, (min-width: 1024px) calc(60vw - 13rem), (min-width: 768px) 60vw, calc(100vw - 3rem)"
						: "(min-width: 1536px) 32rem, (min-width: 1024px) calc((100vw - 22rem) / 2), (min-width: 640px) calc((100vw - 6rem) / 2), calc(100vw - 3rem)"
				}
			/>
			{photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
		</figure>
	);
}

export function PhotoGallery({
	collections,
}: {
	collections: readonly PhotoCollection[];
}) {
	const visible = visibleCollections(collections);
	if (visible.length === 0)
		return (
			<section
				className={styles.emptyState}
				aria-labelledby="collections-heading"
			>
				<h2 id="collections-heading" className={styles.label}>
					Collections
				</h2>
				<p>Collections will appear here as they are added.</p>
			</section>
		);
	return (
		<>
			<nav
				aria-label="Photography collections"
				className={styles.collectionIndex}
			>
				<a href="#main-content">All photographs</a>
				{visible.map((collection) => (
					<a key={collection.id} href={`#collection-${collection.id}`}>
						{collection.title}
					</a>
				))}
			</nav>
			{visible.map((collection) => {
				const featured =
					collection.layout === "featured" && collection.photos.length >= 3;
				const featurePhotos = featured ? collection.photos.slice(0, 3) : [];
				const gridPhotos = featured
					? collection.photos.slice(3)
					: collection.photos;
				return (
					<section
						key={collection.id}
						id={`collection-${collection.id}`}
						className={styles.collection}
						aria-labelledby={`collection-title-${collection.id}`}
					>
						<header className={styles.collectionHeader}>
							<h2 id={`collection-title-${collection.id}`}>
								{collection.title}
							</h2>
							{collection.description ? <p>{collection.description}</p> : null}
						</header>
						{featured ? (
							<div className={styles.photoFeature}>
								{featurePhotos.map((photo, index) => (
									<PhotoFigure
										key={photo.id}
										photo={photo}
										featured
										hero={index === 0}
									/>
								))}
							</div>
						) : null}
						{gridPhotos.length > 0 ? (
							<div className={styles.photoGrid}>
								{gridPhotos.map((photo) => (
									<PhotoFigure key={photo.id} photo={photo} />
								))}
							</div>
						) : null}
					</section>
				);
			})}
		</>
	);
}
