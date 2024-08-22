export type Project = {
  id: string;
  title: string;
  description: string;
  credits: string[];
  localisations?: string[];
  production_date: number;
  image_cover: string;
  video: string;
  svg_mask: string;
  youtube_url: string;
  create_at: number;
  update_at: number;
};

export type Projects = Project[];
