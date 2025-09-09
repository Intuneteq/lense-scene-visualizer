import { LensSKU } from "@models/lense-sku.model";
import { Scene, SceneImageType } from "@models/scene.model";

import { RawSceneType } from "./validations";

/**
 * Builds a mapping of Lens SKU → Scenes in which they appear.
 */
export function buildLensSceneMap(scenes: RawSceneType[]): Map<LensSKU, Scene[]> {
  const lensSceneMap = new Map<LensSKU, Scene[]>();

  for (const { sceneName, nakedEyeImage, sceneImages } of scenes) {
    for (const [sku, { image }] of Object.entries(sceneImages) as SceneImageType[]) {
      const scenes = lensSceneMap.get(sku) ?? [];
      const scene: Scene = {
        name: sceneName,
        nakedEyeImage,
        sceneImage: image,
      };

      lensSceneMap.set(sku, [...scenes, scene]);
    }
  }

  return lensSceneMap;
}
