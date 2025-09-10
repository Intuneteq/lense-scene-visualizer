import z from "zod";
import { ImageSchema } from "./image.validation";

// validate scene json
export const RawSceneSchema = z.object({
  sceneName: z.enum(["Mountain", "Road", "Beach"]),
  nakedEyeImage: ImageSchema,
  sceneImages: z.record(
    z.string(),
    z.object({
      image: ImageSchema,
      lensType: z.string(),
      lensColour: z.string(),
      secondaryImage: ImageSchema.nullable(),
    })
  ),
});

export const RawSceneArraySchema = z.array(RawSceneSchema);

export type RawSceneType = z.infer<typeof RawSceneSchema>
