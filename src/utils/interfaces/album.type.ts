import type { Photos } from "./photo.type";

export interface Album {
  id: string;
  title: string;
  description: string;
  covers?: string[];
  photos?: Photos;
  nbPhotos?: number;
  localisations: string[];
  create_at: number;
  update_at: number;
}

export type Albums = Album[];
