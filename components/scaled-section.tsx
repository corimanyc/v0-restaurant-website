'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type ScaledSectionProps = {
  /** Design canvas width in pixels. The children are authored against this width. */
  designWidth?: number
  /** At or below this viewport width, scaling is disabled and children render at natural size. */
  mobileBreakpoint?: number
  /** Optional className for the outer wrapper. */
  className?: string
  /** Optional style overrides for the outer wrapper. */
  style?: CSSProperties
  children: ReactNode
}

/**
 * Locks its children to a fixed design width and uniformly scales the entire
 * subtree to fit the current viewport. This preserves every internal pixel
 * relationship (paddings, margins, grid alignment) as the window resizes.
 *
 * Below `mobileBreakpoint`, scaling is bypassed and children render naturally
 * so mobile layouts can still take over via media queries.
 */
export default function ScaledSection({
  designWidth = 1440,
  mobileBreakpoint = 1024,
  className,
  style,
  children,
}: ScaledSectionProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [scaledHeight, setScaledHeight] = useState<number | null>(null)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const recompute = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : designWidth
      const shouldScale = vw > mobileBreakpoint
      setEnabled(shouldScale)
      const next = shouldScale ? vw / designWidth : 1
      setScale(next)
      // Measure the natural height of the inner block (at design width) and
      // multiply by the scale so the outer container reserves the right space.
      if (innerRef.current) {
        const h = innerRef.current.offsetHeight
        setScaledHeight(shouldScale ? h * next : null)
      }
    }
    recompute()
    window.addEventListener('resize', recompute)

    // Re-measure when images inside finish loading (they change height).
    const ro = new ResizeObserver(recompute)
    if (innerRef.current) ro.observe(innerRef.current)

    return () => {
      window.removeEventListener('resize', recompute)
      ro.disconnect()
    }
  }, [designWidth, mobileBreakpoint])

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        // When scaling, the inner block is positioned absolutely; reserve its
        // scaled height on the outer container so siblings flow correctly.
        height: enabled && scaledHeight != null ? scaledHeight : 'auto',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        ref={innerRef}
        style={
          enabled
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${designWidth}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  )
}
