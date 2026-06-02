'use client'

import Image from 'next/image'
import type { ComponentProps } from 'react'
import { blurDataMap } from '@/lib/blur-data'

type NextImageProps = ComponentProps<typeof Image>

type ProgressiveImageProps = Omit<
  NextImageProps,
  'placeholder' | 'blurDataURL' | 'width' | 'height'
> & {
  width?: number
  height?: number
}

/**
 * Renders a next/image with a real "blur-up" placeholder: a tiny base64 preview
 * (generated at build time in lib/blur-data.ts) fills the frame instantly and
 * sharpens to the full image once it finishes loading.
 *
 * Intrinsic width/height come from the generated map, so callers keep using the
 * same className-driven layout (object-cover, w-full h-auto, etc.) without
 * needing `fill` or positioned parents.
 */
export default function ProgressiveImage({
  src,
  width,
  height,
  sizes,
  ...props
}: ProgressiveImageProps) {
  const key = typeof src === 'string' ? src : ''
  const meta = key ? blurDataMap[key] : undefined
  const isSvg = key.toLowerCase().endsWith('.svg')

  return (
    <Image
      src={src}
      width={width ?? meta?.width ?? 1200}
      height={height ?? meta?.height ?? 1600}
      sizes={sizes ?? '100vw'}
      placeholder={meta ? 'blur' : 'empty'}
      blurDataURL={meta?.blurDataURL}
      unoptimized={isSvg}
      {...props}
    />
  )
}
