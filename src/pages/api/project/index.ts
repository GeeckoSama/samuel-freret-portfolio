import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../utils/firebase/server";
import {
  ProjectSchema,
  ProjectsSchema,
} from "../../../utils/interfaces/project.type";

const db = getFirestore(app);
const projectsRef = db.collection("projects");

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.json();
  const result = ProjectSchema.safeParse({
    ...data,
    create_at: new Date().getTime(),
    update_at: new Date().getTime(),
  });
  if (!result.success) {
    return new Response(result.error.toString(), {
      status: 400,
    });
  }

  try {
    await projectsRef.add({
      ...result.data,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/admin/projects");
};

export const GET = async () => {
  const projectSnapshot = await projectsRef.get();
  const project = projectSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const result = ProjectsSchema.safeParse(project);
  if (!result.success) {
    return new Response(result.error.toString(), {
      status: 400,
    });
  }
  return new Response(JSON.stringify(project), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
