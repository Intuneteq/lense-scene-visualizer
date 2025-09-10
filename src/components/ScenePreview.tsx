"use client"

import useSWR from "swr"
import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { ImageCompare } from "@components"
import EmptySelection from "./EmptySelection"
import PreviewLoading from "./PreviewLoading"

import { getScene } from "@actions/scenes.action"
import { searchParamsSchema } from "@utils/validations"
import type { Scene, SceneType } from "@models/scene.model"

export default function ScenePreview() {
  const searchParams = useSearchParams()

  const paramsObj = useMemo(
    () => ({
      sku: searchParams.get("sku") ?? undefined,
      sceneType: searchParams.get("sceneType") ?? undefined,
    }),
    [searchParams]
  )

  const parsed = searchParamsSchema.safeParse(paramsObj)

  if (!parsed.success) {
    return <EmptySelection />
  }

  const { sku, sceneType } = parsed.data
  const url = sku && sceneType ? [`/lenses/${sku}/scenes/${sceneType}`, sku, sceneType] : null
  const { data, error, isLoading } = useSWR<Scene>(url, () => getScene(sku as string, sceneType as SceneType))

  if (isLoading) {
    return <PreviewLoading />
  }

  if (error) {
    return <EmptySelection />
  }

  if (!data) {
    return <EmptySelection />
  }

  return <ImageCompare leftImage={data.nakedEyeImage} rightImage={data.sceneImage} />
}
