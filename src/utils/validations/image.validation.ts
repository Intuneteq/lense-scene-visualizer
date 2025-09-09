import { z } from "zod";

export const ImageSchema = z.object({
  id: z.string(),
  responsiveImage: z.object({
    srcSet: z.string(),
    webpSrcSet: z.string(),
    sizes: z.string(),
    src: z.string(),
    width: z.number(),
    height: z.number(),
    aspectRatio: z.number(),
    alt: z.string().nullable(),
    title: z.string().nullable(),
    bgColor: z.string(),
    base64: z.string(),
  }),
  focalPoint: z.object({
    x: z.number(),
    y: z.number(),
  }),
});
