import { Get } from "@utils/api";
import { Lense } from "@models/lense.model";

export async function getLenses(): Promise<Lense[]> {
  const res = await Get<Lense[]>(`/lenses`);

  if (res.code >= 400) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function getLense(sku: string): Promise<Lense> {
  const res = await Get<Lense>(`/lenses/${sku}`);

  if (res.code >= 400) {
    throw new Error(res.message);
  }

  return res.data;
}