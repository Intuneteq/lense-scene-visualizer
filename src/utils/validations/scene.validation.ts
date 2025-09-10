import z from "zod";
import { ImageSchema } from "./image.validation";

// validate adapted scene structure
export const SceneSchema = z.object({
  name: z.enum(["Mountain", "Road", "Beach"]),
  nakedEyeImage: ImageSchema,
  sceneImage: ImageSchema,
});


