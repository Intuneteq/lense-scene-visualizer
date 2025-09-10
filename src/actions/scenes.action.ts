import { Get } from "@utils/api";
import { Scene, SceneType } from "@models/scene.model";

export async function getScenes(sku: string): Promise<Scene[]> {
  const res = await Get<Scene[]>(`/lenses/${sku}/scenes`);

  if (res.code >= 400) {
    throw new Error(res.message);
  }

  return res.data;
}

export async function getScene(sku: string, name: SceneType): Promise<Scene> {
  const res = await Get<Scene>(`/lenses/${sku}/scenes/${name}`);

  if (res.code >= 400) {
    throw new Error(res.message);
  }

  return res.data;
}