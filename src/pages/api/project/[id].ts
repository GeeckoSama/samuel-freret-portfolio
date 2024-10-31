import type { APIRoute } from "astro";
import { app } from "../../../utils/firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { ProjectSchema } from "../../../utils/interfaces/project.type";

const db = getFirestore(app);
const projectsRef = db.collection("projects");

export const POST: APIRoute = async ({ params, redirect, request }) => {
  const formData = await request.formData();
  const result = ProjectSchema.safeParse(formData.values());

  if (!result.success) {
    return new Response(result.error.toString(), {
      status: 400,
    });
  }

  if (!params.id) {
    return new Response("Cannot find project", {
      status: 404,
    });
  }

  try {
    await projectsRef.doc(params.id).update({
      ...result.data,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/admin/projects");
};

export const DELETE: APIRoute = async ({ params, redirect }) => {
  if (!params.id) {
    return new Response("Cannot find project", {
      status: 404,
    });
  }

  try {
    await projectsRef.doc(params.id).delete();
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/admin/projects");
};
