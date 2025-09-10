'use client'

import React, { useState } from 'react'
import Selector, { SelectorType } from './Selector'
import { Product } from '@models/product.model'
import { Lense } from '@models/lense.model'
import { Scene } from '@models/scene.model'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
   lenses: Lense[]
   scenes: Scene[]
}
export default function LenseSceneControl({ lenses, scenes }: Props) {
   const router = useRouter()
   const pathname = usePathname()
    const searchParams = useSearchParams()
 
  const sku = searchParams.get('sku')

   const lensesOptions = lenses.map(lense => ({ key: lense.sku, label: lense.name }))
   const scenesOptions = scenes.map(scene => ({ key: scene.name, label: scene.name }))

   function handleSelectLense(key: string) {
      router.replace(pathname + `?sku=${key}`)
   }

   function handleSelectScene(scene: string) {
      const sku = searchParams.get('sku')
      console.log(pathname, scene);
      
      router.replace(pathname + `?sku=${sku}&sceneType=${scene}`)
   }

   return (
      <section className="w-[30%] px-6 py-12 flex flex-col justify-start items-start gap-4 min-h-screen">
         <Selector id="lenses" name="lenses" options={lensesOptions} onChange={handleSelectLense} />
         <Selector id='scene' name='scene' options={scenesOptions} onChange={handleSelectScene} />
      </section>
   )
}
