export type PhotoCategory = "Portraits" | "Landscapes" | "Urban" | "Travel";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live?: string;
  year: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
