//src/app/api/users/[userId]/followers/route.ts
//api enpoint route for user's followers

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { FollowerInfo } from "@/lib/types";

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    // who is current logged in user
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if authorized
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: {
            followerId: loggedInUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });
    // if not user, invalid request
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    // return data to the frontend
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: loggedInUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();
    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.follow.deleteMany({
      where: {
        followerId: loggedInUser.id,
        followingId: userId,
      },
    });
    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
