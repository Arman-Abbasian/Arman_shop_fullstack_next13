import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAut";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  // console.log(req.url, req.nextUrl.pathname);
  if (pathname.startsWith("/profile")) {
    // "middlewareAuth" method return the user information
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
  }

  if (pathname.startsWith("/admin")) {
    // "middlewareAuth" method return the user information
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/auth")) {
    // "middlewareAuth" method return the user information
    const user = await middlewareAuth(req);
    if (user) return NextResponse.redirect(new URL("/", url));
  }
  if (pathname.startsWith("/complete-profile")) {
    // "middlewareAuth" method return the user information
    const user = await middlewareAuth(req);
    if (user) return NextResponse.redirect(new URL("/", url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*","/auth","/complete-profile"],
};
