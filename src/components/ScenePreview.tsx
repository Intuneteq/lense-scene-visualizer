"use client"

import ImageCompare from "./ImageCompare"
import SceneNotFound from "./SceneNotFound"
import type { Scene } from "@models/scene.model"

type Props = {
  scene: Scene | null
}

export default function ScenePreview({ scene }: Props) {
  if (!scene) return <SceneNotFound />
  return <ImageCompare leftImage={scene.nakedEyeImage} rightImage={scene.sceneImage} />
}
