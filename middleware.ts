import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/","/api/webhooks(.*)"]
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
