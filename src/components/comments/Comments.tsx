//src/components/comments/Comments.tsx
//react query client component for the route.ts file in the 'comments' server folder
"use client";

import { PostData } from "@/lib/types";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  return <div>Comments</div>;
}
