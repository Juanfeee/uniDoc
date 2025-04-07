import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas accesibles sin autenticación
const publicRoutes = ['/', '/login', '/register']

// Rutas que requieren autenticación
const protectedRoutes = ['/index', '/datos-personales', '/agregar']

// Prefijo para rutas de API de autenticación
const apiAuthPrefix = '/api/auth'

// Ruta por defecto después de login
const DEFAULT_LOGIN_REDIRECT = '/index'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  
  // Obtener el token de sesión de las cookies
  const sessionToken = cookies.get('sessionToken')?.value

  // Verificar si es una ruta de API de autenticación
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  
  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  
  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)

  // 1. Permitir todas las rutas de API de autenticación
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // 2. Si el usuario está logueado y accede a una ruta pública, redirigir al dashboard
  if (sessionToken && isPublicRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  // 3. Si el usuario NO está logueado y accede a una ruta protegida, redirigir al login
  if (!sessionToken && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // 4. Para todos los demás casos, continuar con la petición
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo favicon)
     * - imágenes (.svg, .png, .jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}