import { ImageTyPe } from "./image.model";

export type SceneType = "Mountain" | "Road" | "Beach"

export type Scene = {
  name: SceneType;
  nakedEyeImage: ImageTyPe;
  sceneImage: ImageTyPe;
};

export type SceneImageType = [string, { image: ImageTyPe }];
