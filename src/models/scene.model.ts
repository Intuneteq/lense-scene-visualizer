import { ImageTyPe } from "./image.model";
import { LensSKU } from "./lense-sku.model";

export type SceneType = "Mountain" | "Road" | "Beach"

export type Scene = {
  name: SceneType;
  nakedEyeImage: ImageTyPe;
  sceneImage: ImageTyPe;
};

export type SceneImageType = [LensSKU, { image: ImageTyPe }];
