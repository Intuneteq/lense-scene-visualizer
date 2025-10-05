import React from 'react'

import { redirect, RedirectType } from 'next/navigation';
import { LenseSceneControl } from '@components'

import { getLenses } from '@actions/lenses.action';
import { searchParamsSchema } from '@utils/validations';

type Props = {
  searchParams: Promise<{ sku?: string; sceneType?: string }>;
}

export default async function ControlsPage({ searchParams }: Props) {
  const { sku, sceneType } = await searchParams
  const initialParsed = searchParamsSchema.safeParse({ sku, sceneType });

  const lenses = await getLenses()

  if (lenses.length <= 0) {
    return (
      <LenseSceneControl
        sku=''
        scene=''
        lenses={[]}
      />
    )
  }

  // No initial value in route param
  if (!initialParsed.data?.sku) {
    redirect(`/?sku=${lenses[0].sku}&sceneType=${'Mountain'}`, RedirectType.replace) // set initial values
  }

  return (
    <LenseSceneControl
      sku={initialParsed.data?.sku || ''}
      scene={initialParsed.data?.sceneType || ''}
      lenses={lenses}
    />
  )
}
