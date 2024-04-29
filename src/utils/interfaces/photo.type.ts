export interface Photo {
  id: string;
  title: string;
  description: string;
  path: string;
  create_at: number;
  update_at: number;
}

export type Photos = Photo[];
