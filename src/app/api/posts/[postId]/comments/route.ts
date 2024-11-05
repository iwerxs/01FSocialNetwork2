//src/app/api/posts/[postId]/comments/route.ts
//Server Endpoint for Comment request, with a route handler

import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const cursor = request.nextUrl.searchParams.get("cursor") || undefined;
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
