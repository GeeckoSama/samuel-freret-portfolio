import type { APIRoute } from "astro";
import { getFirestore } from "firebase-admin/firestore";
import { app } from "../../../utils/firebase/server";
import { ProjectSchema } from "../../../utils/interfaces/project.type";

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.json();
  console.log(data);
  const result = ProjectSchema.safeParse({
    ...data,
    create_at: new Date().getTime(),
    update_at: new Date().getTime(),
  });
  console.log(result);
  if (!result.success) {
    return new Response(result.error.toString(), {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);

    const projectRef = db.collection("projects");
    await projectRef.add({
      ...result.data,
    });
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
  return redirect("/admin/projects");
};
