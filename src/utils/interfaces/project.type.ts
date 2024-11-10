import { z } from "zod";

export type Project = {
  id: string;
  title: string;
  description: string;
  credits: string;
  localisations?: string;
  production_date: number;
  image_cover: string;
  video: string;
  video_url?: string;
  svg_mask: string;
  draft: boolean;
  create_at: number;
  update_at: number;
};

export type Projects = Project[];

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string({
    required_error: "Le titre est obligatoire",
    invalid_type_error: "Le titre doit être une chaîne de caractères",
  }),
  description: z.string({
    required_error: "La description est obligatoire",
    invalid_type_error: "La description doit être une chaîne de caractères",
  }),
  credits: z.string({
    required_error: "Les crédits sont obligatoires",
    invalid_type_error: "Les crédits doivent être une chaîne de caractères",
  }),
  localisations: z
    .string({
      invalid_type_error:
        "Les localisations doivent être une chaîne de caractères",
    })
    .optional(),
  production_date: z.number({
    invalid_type_error: "La date de production doit être un nombre",
    required_error: "La date de production est obligatoire",
  }),
  video_url: z
    .string({
      invalid_type_error:
        "Le lien de la vidéo doit être une chaîne de caractères",
    })
    .optional(),
  image_cover: z.string({
    invalid_type_error:
      "L'image de couverture doit être une chaîne de caractères",
    required_error: "L'image de couverture est obligatoire",
  }),
  video: z.string({
    invalid_type_error: "La vidéo doit être une chaîne de caractères",
    required_error: "La vidéo est obligatoire",
  }),
  svg_mask: z.string({
    invalid_type_error: "Le masque doit être une chaîne de caractères",
    required_error: "Le masque est obligatoire",
  }),
  draft: z.boolean({
    invalid_type_error: "Le brouillon doit être un booléen",
    required_error: "Le brouillon est obligatoire",
  }),
  create_at: z.number({
    invalid_type_error: "La date de création doit être un nombre",
    required_error: "La date de création est obligatoire",
  }),
  update_at: z.number({
    invalid_type_error: "La date de modification doit être un nombre",
    required_error: "La date de modification est obligatoire",
  }),
});

export const ProjectsSchema = z.array(ProjectSchema);

export const FileSchema = z.instanceof(File);

export const NewProjectSchema = z.object({
  title: z.string({
    required_error: "Le titre est obligatoire",
    invalid_type_error: "Le titre doit être une chaîne de caractères",
  }),
  description: z.string({
    required_error: "La description est obligatoire",
    invalid_type_error: "La description doit être une chaîne de caractères",
  }),
  credits: z.string({
    required_error: "Les crédits sont obligatoires",
    invalid_type_error: "Les crédits doivent être une chaîne de caractères",
  }),
  localisations: z
    .string({
      invalid_type_error:
        "Les localisations doivent être une chaîne de caractères",
    })
    .optional(),
  production_date: z
    .number({
      invalid_type_error: "La date de production doit être un nombre",
      required_error: "La date de production est obligatoire",
    })
    .optional(),
  video_url: z
    .string({
      invalid_type_error:
        "Le lien de la vidéo doit être une chaîne de caractères",
      required_error: "Le lien de la vidéo est obligatoire",
    })
    .optional(),
  image_cover: FileSchema,
  video: FileSchema,
  svg_mask: FileSchema,
  draft: z.boolean(),
});
