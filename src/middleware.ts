import { NextResponse, type NextRequest } from "next/server";

export { default } from "next-auth/middleware";
export async function middleware(request: NextRequest) {
   const token = request.cookies.get("next-auth.session-token")?.value;

   if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
   }
      return NextResponse.next();
}
export const config = {
   matcher: ["/", "/pagesat", "/punetoret/:path*","/kompania", "/raporti/:path*", "/users/:path*"],
};
