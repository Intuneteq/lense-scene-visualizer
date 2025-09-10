'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import type { ImageTyPe } from '@models/image.model'
import { Divider } from '@heroui/divider'

import nakedEyeImageDefault from '@assets/naked-eye-image.png'
import sceneImageDefault from '@assets/scene-image.png'

type Props = {
  nakedEyeImage?: ImageTyPe
  sceneImage?: ImageTyPe
}

export default function ImageCompare({ nakedEyeImage, sceneImage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dividerX, setDividerX] = useState(50) // default middle

  // Fallback to default imports if props aren't provided
  const leftImage = nakedEyeImage ?? {
    id: 'default-naked-eye',
    responsiveImage: {
      src: nakedEyeImageDefault.src,
      width: nakedEyeImageDefault.width,
      height: nakedEyeImageDefault.height,
      srcSet: '',
      webpSrcSet: '',
      sizes: '',
      aspectRatio: nakedEyeImageDefault.width / nakedEyeImageDefault.height,
      base64: '',
    },
  }

  const rightImage = sceneImage ?? {
    id: 'default-scene',
    responsiveImage: {
      src: sceneImageDefault.src,
      width: sceneImageDefault.width,
      height: sceneImageDefault.height,
      srcSet: '',
      webpSrcSet: '',
      sizes: '',
      aspectRatio: sceneImageDefault.width / sceneImageDefault.height,
      base64: '',
    },
  }

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
          src={leftImage.responsiveImage.src}
          alt="Naked eye view"
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
          src={rightImage.responsiveImage.src}
          alt="Scene view"
          width={rightImage.responsiveImage.width}
          height={rightImage.responsiveImage.height}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
