import React from 'react'

import { LenseSceneControl } from '@components'

type Props = {
  searchParams: Promise<{ sku?: string; sceneType?: string }>;
}

export default async function ControlsPage({ searchParams }: Props) {
  const { sku, sceneType } = await searchParams
  return <LenseSceneControl initialSku={sku} initialScene={sceneType} />
}
