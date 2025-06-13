import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import axios from "axios";
import cheerio from "cheerio";
import { supabase } from "../supabaseClient";


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { id, marca, modelo, anio } = await req.json();

  try {
    const query = `${marca} ${modelo} ${anio} ficha técnica site:autocosmos.com.co`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    const html = await axios.get(searchUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(html.data);
    let summary = "";
    $("div").each((_, el) => {
      const text = $(el).text();
      if (text.length > 300 && text.includes("motor")) {
        summary = text;
        return false;
      }
    });

    const prompt = `
A continuación te paso una descripción técnica de un auto. Evaluá del 1 al 100 los siguientes ítems:

1. Seguridad
3. Valor por dinero
4. Popularidad en Colombia

Además, escribe una breve opinión profesional como experto de la marca y el modelo.

Descripción:
${summary}

Devolvé un JSON con los siguientes campos: seguridad, eficiencia, valor, popularidad, opinion_ia.
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const result = JSON.parse(aiResponse.choices[0].message.content);

    // Guardar en Supabase
    await supabase
      .from("carros")
      .update({
        seguridad: result.seguridad,
        eficiencia: result.eficiencia,
        valor: result.valor,
        popularidad: result.popularidad,
        opinion_ia: result.opinion_ia,
        evaluado: true,
      })
      .eq("id", id);

    return Response.json({ status: "ok", result });
  } catch (error) {
    console.error("Error al evaluar auto", error);
    return Response.json({ error: "Error al generar score" }, { status: 500 });
  }
}
