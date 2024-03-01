"use server";

import { auth } from "@/auth";
import db from "@/db";
import { NOT_LOGGEDIN_ERROR } from "@/formErrors";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
});

interface createPostFormStateProps {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[]; // For generic form errors
  };
}

async function createPost(
  slug: string,
  formState: createPostFormStateProps,
  formData: FormData
): Promise<createPostFormStateProps> {
  const title = formData.get("title");
  const content = formData.get("content");

  const results = createPostSchema.safeParse({ title, content });

  const session = await auth();

  if (!session || !session.user)
    return { errors: { _form: [NOT_LOGGEDIN_ERROR] } };

  if (!results.success) return { errors: results.error.flatten().fieldErrors };

  const slugData = await db.topic.findFirst({
    where: {
      slug,
    },
  });

  if (!slugData) return { errors: { _form: ["Cannot find topic."] } };

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        userId: session.user.id,
        title: results.data.title,
        content: results.data.content,
        topicId: slugData?.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };

    return {
      errors: { _form: ["Something went wrong. Please try again later"] },
    };
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}

export { createPost };
