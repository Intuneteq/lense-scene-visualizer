import { ImageTyPe } from "./image.model";
import { LensSKU } from "./lense-sku.model";

export type Scene = {
  name: "Mountain" | "Road" | "Beach";
  nakedEyeImage: ImageTyPe;
  sceneImage: ImageTyPe;
};

export type SceneImageType = [LensSKU, { image: ImageTyPe }];
