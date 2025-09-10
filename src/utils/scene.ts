import { RawSceneType } from "./validations";
import { Scene } from "@models/scene.model";

/**
 * Builds a mapping of Lens SKU → Scenes in which they appear.
 * - Groups scenes by SKU
 */
export function buildLensSceneMap(scenes: RawSceneType[]): Map<string, Scene[]> {
  const lensSceneMap = new Map<string, Scene[]>();

  for (const { sceneName, nakedEyeImage, sceneImages } of scenes) {
    for (const [lenseSku, { image }] of Object.entries(sceneImages)) {
      const scenesForLense = lensSceneMap.get(lenseSku) ?? [];

      const scene: Scene = {
        name: sceneName,
        nakedEyeImage,
        sceneImage: image,
      };

      lensSceneMap.set(lenseSku, [...scenesForLense, scene]);
    }
  }

  return lensSceneMap;
}
