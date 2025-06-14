import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import axios from "axios";
import { supabase } from "../../../lib/supabaseClientAI";

export async function POST(req) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: "La variable de entorno OPENAI_API_KEY no está definida" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });

    const body = await req.json();
    const carroId = body?.carroId;

    if (!carroId) {
      return NextResponse.json({ error: "Falta carroId" }, { status: 400 });
    }

    const { data: carro, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", carroId)
      .single();

    if (error) {
      return NextResponse.json({ error: "Error al obtener el carro" }, { status: 500 });
    }

    if (!carro) {
      return NextResponse.json({ error: "Carro no encontrado" }, { status: 404 });
    }

    // Buscar dimensiones (opcional)
    let dimensionesAuto = "";
    try {
      const match = carro.marca && carro.modelo
        ? `${carro.marca} ${carro.modelo}`.match(/(ford|chevrolet|kia|renault|mazda|bmw|mercedes|toyota|hyundai)\s+([a-z0-9\s]+)/i)
        : null;

      if (match) {
        const [_, marca, modeloRaw] = match;
        const modelo = modeloRaw.trim();
        const query = `${marca} ${modelo} dimensiones site:autocosmos.com.co`;

        const search = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
          headers: { "User-Agent": "Mozilla/5.0" },
          timeout: 5000,
        });

        const regex = /(\d{3,4})\s?mm/g;
        const mm = [...search.data.matchAll(regex)].map(r => parseInt(r[1]));

        if (mm.length >= 2) {
          dimensionesAuto = `Las dimensiones aproximadas del auto consultado (${marca} ${modelo}) son: largo ${mm[0] / 1000}m y ancho ${mm[1] / 1000}m.`;
        }
      }
    } catch (e) {
      console.warn("⚠️ No se pudieron obtener dimensiones del auto:", e.message);
    }

    const prompt = `
Eres un asesor experto en autos de Inmova. Ayudas a clientes a entender mejor los autos en venta.

Información del auto:
- Vehiculo: ${carro.title}
- Marca: ${carro.marca}
- Año: ${carro.modelo || "N/D"}
- Transmisión: ${carro.transmision}
- Combustible: ${carro.combustible}
- Consumo ciudad: ${carro.ciudad_consumo} km/L
- Consumo carretera: ${carro.carretera_consumo} km/L

${dimensionesAuto}

Evalúa este vehículo y entrega una opinión profesional basada en:
1. Seguridad
2. Eficiencia
3. Valor por dinero

Usa una escala de 0 a 100 en cada categoría. Formato: Seguridad: XX, Eficiencia: XX, Valor: XX.

⚠️ IMPORTANTE: Basate únicamente en fuentes confiables y colombianas como Revista Motor, Autocosmos, El Tiempo, etc. Al final de tu análisis, indica dos fuentes utilizadas (una principal y una secundaria) con nombre de la fuente claramente identificable. Formato:
Fuente principal: [Nombre de la fuente]
Fuente secundaria: [Nombre de la fuente]
`;

    // Llamada a OpenAI
    let respuestaIA;
    try {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      respuestaIA = res.choices[0].message.content;
    } catch (e) {
      return NextResponse.json({ error: "Falla con OpenAI" }, { status: 500 });
    }

    // Extraer puntuaciones desde la respuesta
    const extractScore = (label) => {
      const regex = new RegExp(`${label}\\s*:\\s*(\\d{1,3})`, "i");
      const match = respuestaIA.match(regex);
      return match ? Math.min(100, parseInt(match[1])) : 0;
    };

    // Extraer fuentes desde la respuesta de la IA
    const extractFuente = (tipo) => {
      const regex = new RegExp(`${tipo}\\s*:\\s*(.+)`, "i");
      const match = respuestaIA.match(regex);
      return match ? match[1].trim() : "";
    };

    const puntuaciones = {
      seguridad: extractScore("Seguridad"),
      eficiencia: extractScore("Eficiencia"),
      valor: extractScore("Valor"),
      opinion_ia: respuestaIA,
      fuente_principal: extractFuente("Fuente principal"),
      fuente_secundaria: extractFuente("Fuente secundaria"),
    };

    // Guardar en Supabase
    const { error: updateError } = await supabase
      .from("cars")
      .update(puntuaciones)
      .eq("id", carroId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      respuesta: respuestaIA,
      puntajes: puntuaciones,
    });

  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
