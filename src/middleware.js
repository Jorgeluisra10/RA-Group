import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res }); // este `res` se debe devolver luego

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/admin', '/agente'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && (!user || userError)) {
    console.log('🔒 Usuario no autenticado, redirigiendo a /login');
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (user) {
    const { data: userInfo, error: infoError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (!userInfo || infoError) {
      console.log('❌ No se pudo obtener el rol del usuario');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const rol = userInfo.rol;

    if (pathname.startsWith('/admin') && rol !== 'admin') {
      console.log('⛔ Acceso denegado: no es admin');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/agente') && rol !== 'agente') {
      console.log('⛔ Acceso denegado: no es agente');
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // ⚠️ MUY IMPORTANTE: devolver `res` modificado, no uno nuevo
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/agente/:path*'],
};
