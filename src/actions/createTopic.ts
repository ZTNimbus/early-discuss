"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import db from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { NOT_LOGGEDIN_ERROR } from "@/formErrors";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message:
        "Topic name must be at least 3 letters long, lowercase and without dashes/spaces.",
    }),

  description: z.string().min(10),
});

interface createTopicFormStateProps {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[]; // For generic form errors like no auth, CRUD fail etc
  };
}

async function createTopic(
  formState: createTopicFormStateProps,
  formData: FormData
): Promise<createTopicFormStateProps> {
  // Returning a Promise because async function
  const name = formData.get("name");
  const description = formData.get("description");

  const session = await auth();

  const results = createTopicSchema.safeParse({ name, description });

  if (!session || !session.user)
    return { errors: { _form: [NOT_LOGGEDIN_ERROR] } };

  if (!results.success) return { errors: results.error.flatten().fieldErrors };

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: results.data.name,
        description: results.data.description,
      },
    });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) return { errors: { _form: [error.message] } };
    else
      return {
        errors: {
          _form: [
            "The topic could not be created. Please try again in a moment",
          ],
        },
      };
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}

export { createTopic };
