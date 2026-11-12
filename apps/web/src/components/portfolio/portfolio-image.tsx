"use client";

import { ImageBrokenIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import type { PortfolioImage as ImageData } from "@/app/types/portfolio";
import styles from "./portfolio.module.css";

export function PortfolioImage({
	image,
	sizes,
	crop = false,
	objectPosition,
}: {
	image: ImageData;
	sizes: string;
	crop?: boolean;
	objectPosition?: string;
}) {
	const [failed, setFailed] = useState(false);
	return (
		<div
			className={`${styles.media} ${crop ? styles.cropped : ""}`}
			style={
				crop ? undefined : { aspectRatio: `${image.width} / ${image.height}` }
			}
		>
			{failed ? (
				<div role="img" aria-label={image.alt} className={styles.imageFallback}>
					<ImageBrokenIcon size={28} aria-hidden />
					<span aria-hidden>Image unavailable</span>
				</div>
			) : (
				<Image
					src={image.src}
					alt={image.alt}
					fill
					sizes={sizes}
					style={{ objectFit: crop ? "cover" : "contain", objectPosition }}
					onError={() => setFailed(true)}
				/>
			)}
		</div>
	);
}
