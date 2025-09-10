import sceneData from "@lib/scene.json";
import productData from "@lib/product.json";

import { Product } from "@models/product.model";

import { buildLensSceneMap } from "@utils/scene";
import { RawLensePartSchema, RawProductSchema, RawSceneArraySchema } from "@utils/validations";

export async function GET() {
  try {
    const renegades = RawProductSchema.parse(productData.renegades);
    const rawLensePart = renegades.parts.find((part) => part.name === 'Lenses');
    const lensePart = RawLensePartSchema.parse(rawLensePart);
    
    const scenes = RawSceneArraySchema.parse(sceneData);
    const scenesMap = buildLensSceneMap(scenes);

    const product: Product = {
      id: renegades.id,
      name: renegades.name,
      lenses: lensePart.options.map((lense) => ({
        id: lense.id,
        name: lense.name,
        sku: lense.sku,
        // scenes: scenesMap.get(lense.sku) || [],
      })),
    };

    return Response.json({ data: product });
  } catch (error: any) {
    console.error("GET /product failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
