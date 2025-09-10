import { NextRequest } from "next/server";

import productData from "@lib/product.json";
import { RawLensePartSchema, RawProductSchema } from "@utils/validations";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/lenses/[sku]">) {
  const { sku } = await ctx.params;

  try {
    const renegades = RawProductSchema.parse(productData.renegades);
    const rawLensePart = renegades.parts.find((part) => part.name === "Lenses");
    const lensePart = RawLensePartSchema.parse(rawLensePart);

    const lense = lensePart.options.find(l => l.sku === sku)

    if(!lense)  return Response.json({ error: "Not found" }, { status: 404 });

    return Response.json({ data: lense }, { status: 200 });
  } catch (error: any) {
    console.error("GET /lense/[sku] failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
