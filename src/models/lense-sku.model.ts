import z from "zod";
import { LensSKUSchema } from "@utils/validations/lense.validation";

export type LensSKU = z.infer<typeof LensSKUSchema>;
