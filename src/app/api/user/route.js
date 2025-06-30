import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Buscar en usuarios o agentes
  let userInfo = null;

  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if (data) {
    userInfo = data;
  } else {
    const { data: agenteData } = await supabase
      .from("agentes")
      .select("*")
      .eq("id", user.id)
      .single();

    userInfo = agenteData || null;
  }

  return new Response(JSON.stringify({ user, userInfo }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
