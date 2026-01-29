import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function hasRole(token, roles) {
  return token?.roles?.some((r) => roles.includes(r));
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Admin + User portal
    if (path.startsWith("/portal")) {
      if (!hasRole(token, ["Admin", "User"])) {
        return NextResponse.redirect(new URL("/auth/access", req.url));
      }
    }

    // Applicant area
    if (path.startsWith("/applicant")) {
      if (!hasRole(token, ["Applicant"])) {
        return NextResponse.redirect(new URL("/auth/access", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/portal/:path*", "/applicant/:path*"],
};
