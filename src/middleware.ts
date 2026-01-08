import { NextRequest, NextResponse } from "next/server";
import routes from "./routes";
import {
  authenticatedUser,
  rewriteCognitoCookiesWithUserId,
} from "./services/aws/amplifyServerUtils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const result = rewriteCognitoCookiesWithUserId(request);
  const finalRequest = result?.modifiedRequest ?? request;

  const isOnDashboard = request.nextUrl.pathname.startsWith(routes.DASHBOARD);
  const isRoot = request.nextUrl.pathname === routes.HOME;
  const isLogin = request.nextUrl.pathname === routes.LOGIN;

  try {
    const user = await authenticatedUser({ request: finalRequest, response });
    if (user) {
      if (isLogin || isRoot) {
        return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
      }
    }
  } catch (err) {}
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
