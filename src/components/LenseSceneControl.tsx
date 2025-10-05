'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Selector from './Selector'
import { Lense } from '@models/lense.model'

type Props = {
   sku: string
   scene: string
   lenses: Lense[]
}

export default function LenseSceneControl({ sku, scene, lenses }: Props) {
   const router = useRouter()
   const pathname = usePathname()

   const lensesOptions = lenses.map((lense) => ({ key: lense.sku, label: lense.name }))

   function handleSelectLense(key: string) {
      router.replace(`${pathname}?sku=${key}&sceneType=${scene || 'Mountain'}`, { scroll: false })
   }

   function handleSelectScene(sceneType: string) {
      router.replace(`${pathname}?sku=${sku}&sceneType=${sceneType}`, { scroll: false })
   }

   return (
      <section className="w-full px-6 py-12 flex flex-col justify-start items-start gap-4 min-h-screen">
         <Selector
            id="lenses"
            name="lenses"
            value={sku}
            placeholder="Select Lense"
            options={lensesOptions}
            onChange={handleSelectLense}
         />

         <Selector
            id="scene"
            name="scene"
            placeholder="Select Scene"
            value={scene}
            options={lensesOptions.length > 0 ? scenesOptions : []}
            onChange={handleSelectScene}
         />
      </section>
   )
}

const scenesOptions = [
   { key: 'Mountain', label: 'Mountain' },
   { key: 'Beach', label: 'Beach' },
   { key: 'Road', label: 'Road' },
]
