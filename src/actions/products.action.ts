import { Get } from "@utils/api";
import { Product } from "@models/product.model";

export async function getProduct(): Promise<Product> {
  const res = await Get<Product>(`/products`);

  if (res.code >= 400) {
    throw new Error(res.message);
  }

  return res.data;
}
