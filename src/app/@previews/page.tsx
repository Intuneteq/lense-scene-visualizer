import React from 'react'

import { EmptySelection, ScenePreview } from '@components'

import { getScene } from '@actions/scenes.action';
import { searchParamsSchema } from '@utils/validations';

type Props = {
  searchParams: Promise<{ sku?: string; sceneType?: string }>;
}

export default async function PreviewsPage({ searchParams }: Props) {
  const { sku, sceneType } = await searchParams
  const parsed = searchParamsSchema.safeParse({ sku, sceneType })

  if (!parsed.data?.sku || !parsed.data.sceneType) return <EmptySelection />

  const scene = await getScene(parsed.data.sku, parsed.data.sceneType)

  return <ScenePreview scene={scene} />
}