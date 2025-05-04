import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Si NO hay token y trata de entrar a cualquier ruta protegida
  if (
    !token &&
    ["/datos-personales", "/agregar", "/index"].some((path) =>
      pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si HAY token e intenta acceder a login
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/datos-personales", request.url));
  }

  return NextResponse.next();
}

//Rutas protegidas
export const config = {
  matcher: ["/datos-personales", "/agregar/:path*", "/index"],
};
