import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/cookie";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(new URL("/auth/masuk", request.url));
}
