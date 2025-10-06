'use client'

import Image from 'next/image'
import { Divider } from '@heroui/divider'
import { useState, useRef, useEffect } from 'react'
import type { ImageTyPe } from '@models/image.model'

type Props = {
  nakedEyeImage: ImageTyPe
  seceneImage: ImageTyPe
}

export default function ImageCompare({ nakedEyeImage, seceneImage }: Props) {
  const [dividerX, setDividerX] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.userSelect = 'none'
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.body.style.userSelect = 'auto'
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return
    e.preventDefault()

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPercentage = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setDividerX(newPercentage)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newPercentage = Math.max(5, Math.min(95, (x / rect.width) * 100))
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
      onClick={handleClick}
      className="relative w-full h-screen overflow-hidden select-none cursor-pointer"
    >
      {/* Bottom layer: Scene image */}
      <Image
        priority
        src={seceneImage.responsiveImage.src}
        alt={seceneImage.responsiveImage.alt || 'Scene view'}
        width={seceneImage.responsiveImage.width}
        height={seceneImage.responsiveImage.height}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top layer: Naked-eye image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
        style={{
          clipPath: `inset(0 ${100 - dividerX}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - dividerX}% 0 0)`,
        }}
      >
        <Image
          priority
          src={nakedEyeImage.responsiveImage.src}
          alt={nakedEyeImage.responsiveImage.alt || 'Naked eye view'}
          width={nakedEyeImage.responsiveImage.width}
          height={nakedEyeImage.responsiveImage.height}
          className="w-full h-full object-cover"
        />

        {/* Label: Naked eye */}
        <span className="absolute bottom-15 left-15 text-white text-3xl font-bold">
          Naked eye.
        </span>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center transition-all duration-300 ease-out"
        style={{
          left: `${dividerX}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <Divider orientation="vertical" className="h-full" />
    
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/60 shadow-md border border-gray-300 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <div className="w-2 h-2 rounded-full bg-gray-500" />
        </div>
      </div>
    </div>
  )
}
