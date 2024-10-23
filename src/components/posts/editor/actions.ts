//src/components/posts/editor/actions.ts
//server actions for posts
//always authenticate via the backend, never the frontend, as this can be manipulated.
"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

// check user is authenticated
export async function submitPost(input: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content } = createPostSchema.parse({ content: input });

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include: getPostDataInclude(user.id),
  });
  // update through React Queries via api, not a 'revalidate path'
  return newPost;
}
