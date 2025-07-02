import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/admin', '/agente'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 🔒 Bloquear acceso si no hay sesión y está en ruta protegida
  if (isProtected && (!user || userError)) {
    console.log('🔒 Usuario no autenticado, redirigiendo a /login');
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // 🧠 Validar rol si hay sesión
  if (user) {
    const { data: userInfo, error: infoError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (!userInfo || infoError) {
      console.log('❌ No se pudo obtener el rol del usuario');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/unauthorized';
      return NextResponse.redirect(redirectUrl);
    }

    const rol = userInfo.rol;

    if (pathname.startsWith('/admin') && rol !== 'admin') {
      console.log('⛔ Acceso denegado: no es admin');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/unauthorized';
      return NextResponse.redirect(redirectUrl);
    }

    if (pathname.startsWith('/agente') && rol !== 'agente') {
      console.log('⛔ Acceso denegado: no es agente');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/unauthorized';
      return NextResponse.redirect(redirectUrl);
    }
  }

  // ✅ IMPORTANTE: devolver `res` modificado por Supabase
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/agente/:path*'],
};
