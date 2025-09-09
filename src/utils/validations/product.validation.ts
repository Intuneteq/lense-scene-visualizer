import z from "zod";
import { LenseSchema } from "./lense.validation";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  lenses: z.array(LenseSchema),
});


