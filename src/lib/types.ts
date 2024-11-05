//src/lib/types.ts
//own narrower data type

import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

// export const userDataSelect = {
//   id: true,
//   username: true,
//   displayName: true,
//   avatarUrl: true,
// } satisfies Prisma.UserSelect;

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
      },
    },
  } satisfies Prisma.PostInclude;
}

// export const postDataInclude = {
//   user: {
//     select: userDataSelect,
//   },
// } satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

// used in route.ts 'for-you' server
export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

// used in route.ts 'followers' server
export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

// used in route.ts 'likes' server
export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}
