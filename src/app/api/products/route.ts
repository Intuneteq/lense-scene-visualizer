import productData from "@lib/product.json";
import { Product } from "@models/product.model";
import { RawProductSchema } from "@utils/validations";

export async function GET() {
  try {
    const renegades = RawProductSchema.parse(productData.renegades);

    const product: Product = {
      id: renegades.id,
      name: renegades.name,
    };

    return Response.json({ data: product });
  } catch (error: any) {
    console.error("GET /product failed", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
