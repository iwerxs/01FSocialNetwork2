//src/app/(auth)/signup/actions.ts
// Backend Server Action Endpoints
"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const parsedCredentials = signUpSchema.parse(credentials);

    const passwordHash = await hash(parsedCredentials.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: parsedCredentials.username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return { error: "Username already exists." };
    }

    const existingemail = await prisma.user.findFirst({
      where: {
        email: {
          equals: parsedCredentials.email,
          mode: "insensitive",
        },
      },
    });

    if (existingemail) {
      return { error: "Email already exists." };
    }

    await prisma.user.create({
      data: {
        id: userId,
        username: parsedCredentials.username,
        displayName: parsedCredentials.username,
        email: parsedCredentials.email,
        passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "An unexpected error occurred." };
  }
}
