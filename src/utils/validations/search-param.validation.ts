import z from "zod";

export const searchParamsSchema = z.object({
  sku: z.string().optional(),
  sceneType: z.enum(["Mountain", "Road", "Beach"]).optional()
})