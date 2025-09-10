'use client'

import Image from 'next/image'
import { Divider } from '@heroui/divider'
import { useState, useRef, useEffect } from 'react'

import type { ImageTyPe } from '@models/image.model'

type Props = {
  leftImage: ImageTyPe
  rightImage: ImageTyPe
}

export default function ImageCompare({ leftImage, rightImage }: Props) {
  const [dividerX, setDividerX] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  // handle drag state
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setDividerX(newPercentage)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex"
    >
      {/* Left (naked eye) */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${dividerX}%` }}
      >
        <Image
          priority
          src={leftImage.responsiveImage.src}
          alt={leftImage.responsiveImage.alt || "Naked eye view"}
          width={leftImage.responsiveImage.width}
          height={leftImage.responsiveImage.height}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 bottom-0 cursor-grabbing"
        style={{
          left: `${dividerX}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <Divider
          orientation="vertical"
          className="w-0.5 bg-white h-full"
        />
      </div>

      {/* Right (scene) */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${100 - dividerX}%` }}
      >
        <Image
          priority
          src={rightImage.responsiveImage.src}
          alt={rightImage.responsiveImage.alt || "Scene view"}
          width={rightImage.responsiveImage.width}
          height={rightImage.responsiveImage.height}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
