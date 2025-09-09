import { LensSKU } from "./lense-sku.model"
import { Scene } from "./scene.model"

export type Lense = {
   id: string
   name: string
   sku: LensSKU
   scenes: Scene[]
}