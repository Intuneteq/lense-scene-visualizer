import z from "zod";
import { ImageSchema } from "./image.validation";

export const SceneSchema = z.object({
  name: z.enum(["Mountain", "Road", "Beach"]),
  nakedEyeImage: ImageSchema,
  sceneImage: ImageSchema,
});


