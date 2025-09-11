import React from 'react'

import { LenseSceneControl } from '@components'
import { searchParamsSchema } from '@utils/validations';

type Props = {
  searchParams: Promise<{ sku?: string; sceneType?: string }>;
}

export default async function ControlsPage({ searchParams }: Props) {
  // Initial values for the controls
  // This prevents hydration mismatches (server and client rendering different initial values).
  const { sku, sceneType } = await searchParams

  // Parse server-provided "initial" values
  // This ensure hydration is consistent with the HTML rendered on the server.
  const initialParsed = searchParamsSchema.safeParse({ sku, sceneType });

  // Pass them down as "initial" props to the client component
  // These act as SSR-safe defaults before `useSearchParams` becomes available on the client.
  return <LenseSceneControl initialSku={initialParsed.data?.sku} initialScene={initialParsed.data?.sceneType} />
}
