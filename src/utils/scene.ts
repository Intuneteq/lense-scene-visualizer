import { RawSceneType } from "./validations";
import { Scene } from "@models/scene.model";

/**
 * Builds a mapping of Lens SKU → Scenes in which they appear.
 * - Groups scenes by SKU
 *
 * ## Example Input (`RawSceneType[]`):
 * [
 *   {
 *     sceneName: "Mountain",
 *     nakedEyeImage: { id: "img1", responsiveImage: { src: "naked-eye.jpg", ... } },
 *     sceneImages: {
 *       "SKU123": { image: { id: "img2", responsiveImage: { src: "scene-123.jpg", ... } } },
 *       "SKU456": { image: { id: "img3", responsiveImage: { src: "scene-456.jpg", ... } } }
 *     }
 *   },
 *   {
 *     sceneName: "Beach",
 *     nakedEyeImage: { id: "img4", responsiveImage: { src: "naked-eye-beach.jpg", ... } },
 *     sceneImages: {
 *       "SKU123": { image: { id: "img5", responsiveImage: { src: "scene-123-beach.jpg", ... } } }
 *     }
 *   }
 * ]
 *
 * ## Example Output (Map<string, Scene[]>):
 * {
 *   "SKU123" => [
 *     { name: "Mountain", nakedEyeImage: {...}, sceneImage: {...} },
 *     { name: "Beach",   nakedEyeImage: {...}, sceneImage: {...} }
 *   ],
 *   "SKU456" => [
 *     { name: "Mountain", nakedEyeImage: {...}, sceneImage: {...} }
 *   ]
 * }
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
