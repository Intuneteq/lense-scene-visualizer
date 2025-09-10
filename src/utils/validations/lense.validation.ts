import { z } from "zod";
import { SceneSchema } from "./scene.validation";

export const LenseSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  scenes: z.array(SceneSchema),
});
