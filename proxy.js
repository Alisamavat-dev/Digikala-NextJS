import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req) {
  const cookie = await cookies();
  const tokenCookie = cookie.get("token");
  const token = tokenCookie?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
