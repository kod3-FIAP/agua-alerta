import { auth } from "~/server/auth";
import { NextResponse } from "next/server";

export function withAuth<T>(
  handler: (request: Request, ...args: T[]) => Promise<Response> | Response,
) {
  return async (request: Request, ...args: T[]) => {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return handler(request, ...args);
  };
}
