import { ImageCompare, LenseSceneControl } from "@components";
import { Product } from "@models/product.model";
import { Scene, SceneType } from "@models/scene.model";

type SearchParams = {
  sku: string | undefined
  sceneType: SceneType | undefined
}

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: Props) {
  const { sku, sceneType } = await searchParams

  const response = await fetch('http://localhost:3000/api/products')
  const product: Product = (await response.json()).data

  const scenesResponse = await fetch(`http://localhost:3000/api/scenes?sku=${sku}`)
  const scenes: Scene[] = (await scenesResponse.json()).data

  const activeScene = scenes.find(i => i.name === sceneType)


  return (
    <main className="w-full flex justify-start items-start">
      <LenseSceneControl lenses={product.lenses} scenes={scenes} />

      <section className="w-[70%] bg-foreground">
        <ImageCompare /> 
      </section>
    </main>
  );
}
