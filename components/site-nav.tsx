'use client'

import Link from 'next/link'

type SiteNavProps = {
  /** Anchors that point to home-page sections. On the events (or other) pages,
   *  use absolute "/#about", "/#press". On the home page, leave as "#about" / "#press"
   *  so we can intercept and smooth-scroll. */
  aboutHref?: string
  pressHref?: string
  /** Whether to attach the smooth-scroll handler for the About link.
   *  Should be true only on pages where the #about element exists in the same document. */
  smoothScrollAbout?: boolean
  /** Open the dining overlay. */
  onOpenDining: () => void
  /** Toggle the mobile menu. */
  onToggleMobileMenu: () => void
  /** Optional font size for desktop nav links (defaults to 15). */
  linkFontSize?: number
  /** Optional override color for desktop nav links and the mobile burger bars. */
  linkColor?: string
  /** When true, fade the right-side nav links and burger but keep the logo fully visible. */
  hideLinks?: boolean
}

/**
 * Single source of truth for the top navigation across all pages.
 * Outer wrapper, padding (md:px-9), and logo size/position MUST stay identical
 * across pages — change them here only.
 */
export default function SiteNav({
  aboutHref = '#about',
  pressHref = '#press',
  smoothScrollAbout = false,
  onOpenDining,
  onToggleMobileMenu,
  linkFontSize = 15,
  linkColor,
  hideLinks = false,
}: SiteNavProps) {
  const linkStyle = { color: linkColor ?? 'inherit', fontSize: `${linkFontSize}px` }
  // Burger bars always render white for consistent contrast against the
  // dark background, regardless of the desktop link color.
  const burgerColor = '#FFFFFF'
  const hideStyle: React.CSSProperties = {
    opacity: hideLinks ? 0 : 1,
    // Re-enable pointer events on the interactive group (parent <nav> has them
    // disabled so empty space doesn't block the dining panel beneath).
    pointerEvents: hideLinks ? 'none' : 'auto',
    transition: 'opacity 0.5s ease',
  }

  return (
    <nav
      className="relative flex items-center justify-between px-6 lg:px-9 pt-6"
      style={{ pointerEvents: 'none' }}
    >
      {/* Logo — 100px on mobile, 88px on desktop. Logo SVG aspect is 1070:302
          (~3.543:1), so the rendered height is ~28.2px on mobile and ~24.8px
          on desktop. The mobile burger below matches the mobile logo height. */}
      <Link
        href="/"
        className="flex-shrink-0 h-auto block w-[110px] lg:w-[100px]"
        style={{ pointerEvents: 'auto' }}
      >
        <img src="/logo.svg" alt="CORIMA" className="w-full h-full object-contain" />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8" style={hideStyle}>
        <Link
          href={aboutHref}
          className="nav-link tracking-wider"
          style={linkStyle}
          onClick={
            smoothScrollAbout
              ? (e) => {
                  e.preventDefault()
                  document
                    .getElementById('about')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              : undefined
          }
        >
          About
        </Link>
        <Link
          href="https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link tracking-wider"
          style={linkStyle}
        >
          Reservations
        </Link>
        <button
          onClick={onOpenDining}
          className="nav-link tracking-wider text-left"
          style={{
            ...linkStyle,
            background: 'transparent',
            border: 'none',
            fontFamily: 'inherit',
            lineHeight: 'inherit',
            cursor: 'pointer',
          }}
        >
          Dining
        </button>
        <Link href="/events" className="nav-link tracking-wider" style={linkStyle}>
          Events
        </Link>
        <Link href={pressHref} className="nav-link tracking-wider" style={linkStyle}>
          Press
        </Link>
        <Link
          href="https://corimanyc.bigcartel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link tracking-wider"
          style={linkStyle}
        >
          Shop
        </Link>
      </div>

      {/* Mobile burger — 6px gap between bars. Total visual height ≈ 18px
          (3 × 2px bars + 2 × 6px gaps), kept vertically centered against the
          28px-tall logo via items-center on the parent nav. */}
      <button
        className="md:hidden flex flex-col gap-[6.5px]"
        onClick={onToggleMobileMenu}
        aria-label="Open menu"
        style={hideStyle}
      >
        <div className="w-6 h-0.5" style={{ backgroundColor: burgerColor }}></div>
        <div className="w-6 h-0.5" style={{ backgroundColor: burgerColor }}></div>
        <div className="w-6 h-0.5" style={{ backgroundColor: burgerColor }}></div>
      </button>
    </nav>
  )
}
