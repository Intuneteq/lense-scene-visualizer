import { NextRequest } from "next/server";

import sceneData from "@lib/scene.json";

import productData from "@lib/product.json";
import { buildLensSceneMap } from "@utils/scene";
import { RawLensePartSchema, RawProductSchema, RawSceneArraySchema } from "@utils/validations";

export async function GET(_req: NextRequest, ctx: RouteContext<'/api/lenses/[sku]/scenes/[name]'>) {
  const { sku, name } = await ctx.params;

  try {
    const renegades = RawProductSchema.parse(productData.renegades);
    const rawLensePart = renegades.parts.find((part) => part.name === "Lenses");
    const lensePart = RawLensePartSchema.parse(rawLensePart);

    const lense = lensePart.options.find(l => l.sku === sku)

    if(!lense)  return Response.json({ error: "Not found" }, { status: 404 });

    const parsedScenes = RawSceneArraySchema.parse(sceneData);
    const scenesMap = buildLensSceneMap(parsedScenes);

    const scenes = scenesMap.get(sku) || []

    const scene = scenes.find(sc => sc.name === name)

    return Response.json({ data: scene });
  } catch (error: any) {
    console.error("GET /lense/[sku]/scenes/[name] failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}