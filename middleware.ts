import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware corriendo para:", req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/agentes")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/agentes/:path*"],
};
