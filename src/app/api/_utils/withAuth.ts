import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";

export const withAuth =
  <T>(
    handler: (request: Request, ...args: T[]) => Promise<Response> | Response,
  ) =>
  async (request: Request, ...args: T[]) => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return handler(request, ...args);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_: unknown) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  };
