import { NextResponse } from "next/server";
import { protectedRoutes } from "./utils/routes";

export async function middleware(request) {
  const tokenName = process.env.NEXT_PUBLIC_Token;
  const cookie = request.cookies.get(tokenName);
  const token = cookie?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      const response = await fetch(`${apiUrl}/api/auth/userProfile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userEmail =
          data?.user?.email || data?.email || data?.data?.user?.email;

        if (userEmail) {
          return NextResponse.next();
        }
      } else {
        const errorText = await response.text();
        console.warn(
          `Auth API returned status ${response.status}: ${errorText}`
        );
      }
    } catch (error) {
      console.error("Middleware fetch failed:", error.message);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
