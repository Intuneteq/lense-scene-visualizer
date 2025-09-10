'use client'

import React from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'

type Props = {
  message?: string
}

export default function EmptySelection({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <EyeIcon className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-lg font-medium text-gray-700">
        {message || "Please select a lens and a scene to preview"}
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Use the side controls to make your selection
      </p>
    </div>
  )
}
