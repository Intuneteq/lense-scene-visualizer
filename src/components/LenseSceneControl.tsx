'use client'

import useSWR from 'swr'
import React, { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Selector from './Selector'
import { Lense } from '@models/lense.model'
import { getLenses } from '@actions/lenses.action'
import { searchParamsSchema } from '@utils/validations'

export default function LenseSceneControl() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const paramsObj = useMemo(
      () => ({
         sku: searchParams.get('sku') || undefined,
         sceneType: searchParams.get('sceneType') || undefined,
      }),
      [searchParams]
   )

   const parsed = searchParamsSchema.safeParse(paramsObj)
   const selectedLense = parsed.data?.sku
   const selectedScene = parsed.data?.sceneType

   const { data, isLoading } = useSWR<Lense[]>(`/lenses`, getLenses)
   const lensesOptions = data?.map((lense) => ({ key: lense.sku, label: lense.name })) || []

   function handleSelectLense(key: string) {
      router.replace(`${pathname}?sku=${key}`)
   }

   function handleSelectScene(sceneType: string) {
      router.replace(`${pathname}?sku=${selectedLense}&sceneType=${sceneType}`)
   }

   return (
      <section className="w-full px-6 py-12 flex flex-col justify-start items-start gap-4 min-h-screen">
         <Selector
            id="lenses"
            name="lenses"
            value={selectedLense}
            options={lensesOptions}
            onChange={handleSelectLense}
            isLoading={isLoading}
         />

         <Selector
            id="scene"
            name="scene"
            value={selectedScene}
            options={selectedLense ? scenesOptions : []}
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
