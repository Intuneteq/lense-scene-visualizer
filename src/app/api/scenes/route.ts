import { NextRequest } from "next/server";

import sceneData from "@lib/scene.json";
import { buildLensSceneMap } from "@utils/scene";
import { RawSceneArraySchema } from "@utils/validations";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const skus = searchParams.getAll("sku"); // supports ?sku=one&sku=two

    const parsedScenes = RawSceneArraySchema.parse(sceneData);
    const scenesMap = buildLensSceneMap(parsedScenes);

    // If no sku provided, maybe return all?
    if (skus.length === 0) {
      return Response.json({ data: Array.from(scenesMap.entries()) });
    }

    // Otherwise, collect for the requested SKUs
    const scenes = skus.flatMap((sku) => scenesMap.get(sku) || []);

    return Response.json({ data: scenes });
  } catch (error: any) {
    console.error("GET /scenes failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
