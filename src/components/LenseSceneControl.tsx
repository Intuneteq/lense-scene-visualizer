'use client'

import useSWR from 'swr'
import React, { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Selector from './Selector'
import { Lense } from '@models/lense.model'
import { getLenses } from '@actions/lenses.action'
import { searchParamsSchema } from '@utils/validations'

type Props = {
   initialSku?: string;
   initialScene?: string;
}

export default function LenseSceneControl({ initialSku, initialScene }: Props) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

  const initialParsed = searchParamsSchema.safeParse({
    sku: initialSku,
    sceneType: initialScene,
  });

  const paramsObj = useMemo(
    () => ({
      sku: searchParams?.get("sku") || initialParsed.data?.sku,
      sceneType: searchParams?.get("sceneType") || initialParsed.data?.sceneType,
    }),
    [searchParams, initialParsed.data]
  );

   const parsed = searchParamsSchema.safeParse(paramsObj)
   const selectedLense = parsed.data?.sku
   const selectedScene = parsed.data?.sceneType

   const { data, isLoading } = useSWR<Lense[]>(`/lenses`, getLenses)
   const lensesOptions = data?.map((lense) => ({ key: lense.sku, label: lense.name })) || []

   function handleSelectLense(key: string) {
      router.replace(`${pathname}?sku=${key}&sceneType=${selectedScene || 'Mountain'}`)
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
            placeholder='Select Lense'
            options={lensesOptions}
            onChange={handleSelectLense}
            isLoading={isLoading}
         />

         <Selector
            id="scene"
            name="scene"
            placeholder='Select Scene'
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
