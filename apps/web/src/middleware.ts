import { config as conf } from "@common/config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/mon-diagnostic") && conf.ff.previewMonDiag) return NextResponse.next();
  if (!pathname.startsWith("/maintenance") && conf.ff.maintenance) {
    console.log({ pathname });
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
