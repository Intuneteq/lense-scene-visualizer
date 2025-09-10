import z from "zod";

// Schema for a single option inside "Lenses"
export const RawLensOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(), 
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