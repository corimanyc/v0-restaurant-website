'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react'

type ProgressiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Blur radius (px) shown while the image is still loading. */
  blurAmount?: number
  /** How long (seconds) the blur-to-sharp resolve takes. */
  resolveDuration?: number
}

/**
 * Drop-in replacement for <img> that loads progressively:
 * - defers offscreen images (loading="lazy") and decodes off the main thread
 * - shows a soft blur placeholder until the full image has loaded, then
 *   smoothly resolves to a sharp, opaque image
 *
 * Only the `filter` (blur) and `opacity` transitions are managed here, so any
 * opacity-based crossfades on the consuming element keep working.
 */
export default function ProgressiveImage({
  style,
  blurAmount = 14,
  resolveDuration = 1.2,
  onLoad,
  ...props
}: ProgressiveImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Images already in cache may finish before React attaches onLoad.
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  const loadTransition = `filter ${resolveDuration}s ease, opacity ${resolveDuration}s ease`
  const mergedStyle: CSSProperties = {
    ...style,
    filter: loaded
      ? style?.filter
      : `blur(${blurAmount}px)${style?.filter ? ` ${style.filter}` : ''}`,
    transition: style?.transition
      ? `${style.transition}, ${loadTransition}`
      : loadTransition,
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      {...props}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
      style={mergedStyle}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
    />
  )
}
