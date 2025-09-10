import { Lense } from "@models/lense.model";
import productData from "@lib/product.json";

import { RawLensePartSchema, RawProductSchema } from "@utils/validations";

export async function GET() {
  try {
    const renegades = RawProductSchema.parse(productData.renegades);
    const rawLensePart = renegades.parts.find((part) => part.name === "Lenses");
    const lensePart = RawLensePartSchema.parse(rawLensePart);

    const lenses: Lense[] = lensePart.options.map((l) => ({
      id: l.id,
      name: l.name,
      sku: l.sku,
    }));

    return Response.json({ data: lenses }, { status: 200 });
  } catch (error: any) {
    console.error("GET /lenses failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
