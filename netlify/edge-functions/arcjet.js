import arcjet, { detectBot, shield } from "https://esm.sh/@arcjet/deno";

const aj = arcjet({
  key: Netlify.env.get("ajkey_01knf9hs69f7z8ndf33ss5ct3t"),
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
  ],
});

export default async (request, context) => {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    return new Response("Accès refusé par Arcjet pour SADOJ", { status: 403 });
  }

  return context.next();
};

export const config = { path: "/*" };