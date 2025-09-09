import z from "zod";
import { LensSKUSchema } from "./lense.validation";

// Schema for a single option inside "Lenses"
export const RawLensOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: LensSKUSchema, // runtime validation of SKU
});

// Schema for a product parts 
export const RawPartSchema = z.object({
  id: z.string(),
  name: z.enum(['Lenses', 'Frame', 'Icons']),
  options: z.array(z.any()),
});

// Schema for a product part (we only care about Lenses)
export const RawLensePartSchema = z.object({
  id: z.string(),
  name: z.enum(['Lenses']),
  options: z.array(RawLensOptionSchema),
});

// Schema for a product (renegades)
export const RawProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  parts: z.array(RawPartSchema),
});