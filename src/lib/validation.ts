//src/lib/validation.ts
//Validation Schemas
import { getDisplayName } from "next/dist/shared/lib/utils";
import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Must be a valid email"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, underscores, and dashes",
  ),
  password: requiredString.min(6, "Password must be at least 6 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

// validate posts
export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(4, "Max 4 media per post"),
});

//validation schema for uploadthing
export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Bio max 1000 characters only"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
