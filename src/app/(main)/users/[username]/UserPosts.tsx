//src/app/(main)/users/[username]/UserPosts.tsx
//React Query Client component for the route.ts file in the 'posts' server folder

"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/lib/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "user-posts", userId],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          `/api/users/${userId}/posts`,
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  // first page is loading
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }
  // check if feed is empty
  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No posts yet from this user
      </p>
    );
  }

  if (status === "error") {
    return <p className="text-center text-destructive">Error loading posts</p>;
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
      <DeletePostDialog open onClose={() => {}} post={posts[0]} />
    </InfiniteScrollContainer>
  );
}
