'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type ScaledSectionProps = {
  /** Design canvas width in pixels. The children are authored against this width. */
  designWidth?: number
  /** At or below this viewport width, scaling is disabled and children render at natural size. */
  mobileBreakpoint?: number
  /**
   * Horizontal anchor in design pixels. Design coord `paddingX` is locked to
   * `paddingX` screen pixels on the left, and design coord `designWidth - paddingX`
   * is locked to `viewport - paddingX` screen pixels on the right. Only the area
   * between those anchors scales with the viewport. Use this so content edges
   * stay aligned with fixed-padding chrome (e.g. a 36px-padded site nav).
   */
  paddingX?: number
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
  paddingX = 36,
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
      // Lock `paddingX` design px to `paddingX` screen px on both edges; scale
      // only the content area between the two anchors. This keeps the inner
      // grid's left/right edges aligned with the fixed-padding site chrome
      // (nav, bottom icon, footer) at every viewport width.
      const designContent = designWidth - 2 * paddingX
      const screenContent = vw - 2 * paddingX
      const next = shouldScale ? Math.max(screenContent, 0) / designContent : 1
      setScale(next)
      if (innerRef.current) {
        const h = innerRef.current.offsetHeight
        setScaledHeight(shouldScale ? h * next : null)
      }
    }
    recompute()
    window.addEventListener('resize', recompute)

    const ro = new ResizeObserver(recompute)
    if (innerRef.current) ro.observe(innerRef.current)

    return () => {
      window.removeEventListener('resize', recompute)
      ro.disconnect()
    }
  }, [designWidth, mobileBreakpoint, paddingX])

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
            ? ({
                position: 'absolute',
                top: 0,
                // Offset so design coord `paddingX` lands exactly on screen
                // x=`paddingX` after the scale transform (transform-origin is
                // top-left). Algebra: screenX = left + scale * designX, set
                // screenX = paddingX at designX = paddingX → left = paddingX*(1-scale).
                left: `${paddingX * (1 - scale)}px`,
                width: `${designWidth}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                ['--scale' as string]: scale,
              } as CSSProperties)
            : ({ ['--scale' as string]: 1 } as CSSProperties)
        }
      >
        {children}
      </div>
    </div>
  )
}
