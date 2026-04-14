import arcjet, { detectBot, shield } from "@arcjet/next";
import { NextResponse } from "next/server";

// Configuration de ton "videur" Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY, // Il ira chercher ta clé sur Netlify
  rules: [
    shield({ mode: "LIVE" }), // Protège contre les injections et attaques courantes
    detectBot({ mode: "LIVE", allow: [] }), // Bloque les robots malveillants
  ],
});

export default async function middleware(request) {
  const decision = await aj.protect(request);

  // Si Arcjet décide de bloquer (bot ou attaque)
  if (decision.isDenied()) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  return NextResponse.next();
}