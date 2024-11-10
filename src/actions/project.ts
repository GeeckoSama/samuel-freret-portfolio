import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getFirestore } from "firebase-admin/firestore";
import {
  ProjectSchema,
  type Project,
  type Projects,
} from "../utils/interfaces/project.type";
import { getStorage } from "firebase-admin/storage";
import { app } from "../utils/firebase/server";

export const project = {
  getProject: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      const db = getFirestore();
      const projectRef = db.doc(`projects/${input.id}`);
      const projectSnapshot = await projectRef.get();
      const result = ProjectSchema.safeParse({
        id: input.id,
        ...projectSnapshot.data(),
      });
      if (!result.success) {
        console.log(result.error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: result.error.message,
        });
      }
      return result.data as Project;
    },
  }),
  getProjects: defineAction({
    handler: async () => {
      const db = getFirestore();
      const projectsRef = db.collection("projects");
      const projectsSnapshot = await projectsRef.get();
      const result = z.array(ProjectSchema).safeParse(
        projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      if (!result.success) {
        console.log(result.error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: result.error.message,
        });
      }
      return result.data as Projects;
    },
  }),
  getProductionProjects: defineAction({
    handler: async () => {
      const db = getFirestore();
      const projectsRef = db.collection("projects").where("draft", "==", false);
      const projectsSnapshot = await projectsRef.get();
      const result = z.array(ProjectSchema).safeParse(
        projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      if (!result.success) {
        console.log(result.error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: result.error.message,
        });
      }
      return result.data as Projects;
    },
  }),
  createProject: defineAction({
    accept: "form",
    input: z.object({
      title: z.string(),
      description: z.string(),
      credits: z.string(),
      localisations: z.string().optional(),
      production_date: z.string().optional(),
      video_url: z.string().optional(),
      draft: z.boolean().optional(),
    }),
    handler: async (input) => {
      const db = getFirestore();
      const projectRef = db.collection("projects").doc();
      await projectRef.set({
        ...input,
        production_date: new Date(input.production_date ?? "").getTime(),
        create_at: new Date().getTime(),
        update_at: new Date().getTime(),
      });
      return projectRef.id;
    },
  }),
  updateProject: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
      title: z.optional(z.string()),
      description: z.optional(z.string()),
      credits: z.optional(z.string()),
      localisations: z.optional(z.string()),
      production_date: z.optional(z.string()),
      video_url: z.optional(z.string()),
      draft: z.optional(z.boolean()),
    }),
    handler: async (input) => {
      const db = getFirestore();
      const projectRef = db.doc(`projects/${input.id}`);
      await projectRef.update({
        ...input,
        production_date: new Date(input.production_date ?? "").getTime(),
        update_at: new Date().getTime(),
      });
      return projectRef.id;
    },
  }),
  updateProjectWithoutForm: defineAction({
    input: z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      credits: z.string().optional(),
      localisations: z.string().optional(),
      production_date: z.string().optional(),
      image_cover: z.string().optional(),
      svg_mask: z.string().optional(),
      video: z.string().optional(),
      video_url: z.string().optional(),
      draft: z.boolean().optional(),
    }),
    handler: async (input) => {
      const db = getFirestore();
      const projectRef = db.doc(`projects/${input.id}`);
      await projectRef.update({
        ...input,
        update_at: new Date().getTime(),
      });
      return projectRef.id;
    },
  }),
  deleteProject: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      const db = getFirestore();
      const storage = getStorage(app);
      const projectRef = db.doc(`projects/${input.id}`);
      const [files] = await storage
        .bucket()
        .getFiles({ prefix: `/projects/${input.id}` });
      const deletePromises = files.map((file) => file.delete());
      await Promise.all(deletePromises);
      await projectRef.delete();
      return true;
    },
  }),
};
