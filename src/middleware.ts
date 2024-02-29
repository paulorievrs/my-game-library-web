import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/", "/register"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser");
  const { pathname } = request.nextUrl;

  const staticFileRegex = /\.(?:png|jpg|jpeg|gif|ico|svg|css|js)$/;
  const isStaticFile =
    pathname.match(staticFileRegex) || pathname.includes("/_next/static/");
  const isInPublicPages = publicPages.includes(pathname);

  if (!currentUser && !isStaticFile && !isInPublicPages) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (currentUser && isInPublicPages) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
}
