'use client'

import { useState } from 'react'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'

export default function PressPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)

  return (
    <div
      className="h-screen min-h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#CBCBCB',
        height: '100dvh',
      }}
    >
      {/* Sharp background (bottom layer) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/events-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      {/* Blurred copy on top — covers the entire viewport (no fade mask) so
          the blur is uniform across the whole screen. */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: '-40px',
          backgroundImage: 'url(/events-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'blur(3px)',
          zIndex: 0,
        }}
      />
      {/* All content sits above the blurred bg */}
      <div className="relative flex flex-col flex-1" style={{ zIndex: 1 }}>
        <MenuOverlay
          isOpen={isMenuOverlayOpen}
          onClose={() => { setIsMenuOverlayOpen(false); setMenuScrollTarget(undefined) }}
          scrollToSection={menuScrollTarget}
        />
        <DiningOverlay
          isOpen={isDiningOpen}
          onClose={() => setIsDiningOpen(false)}
          onViewMenu={() => { setIsDiningOpen(false); setIsMenuOverlayOpen(true) }}
        />

        {/* Header */}
        <header
          className="relative"
          style={{
            zIndex: 46,
            opacity: isDiningOpen ? 0 : 1,
            pointerEvents: isDiningOpen ? 'none' : 'all',
            transition: 'opacity 0.5s ease',
          }}
        >
          <SiteNav
            aboutHref="/#about"
            pressHref="/press"
            onOpenDining={() => setIsDiningOpen(true)}
            onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
            linkColor="#FFFFFF"
          />
        </header>

        <MobileNav
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onMenuClick={() => setIsMenuOverlayOpen(true)}
          aboutHref="/#about"
          pressHref="/press"
        />

        {/* Main content */}
        <main className="flex-1" />
      </div>
    </div>
  )
}
