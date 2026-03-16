import Image from "next/image";
import { featuredPhotos } from "@/app/data/photos";

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featuredPhotos.map((photo) => (
        <article
          key={photo.id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium text-slate-900">{photo.category}</p>
            <span className="text-xs uppercase tracking-wide text-slate-500">Featured</span>
          </div>
        </article>
      ))}
    </div>
  );
}
