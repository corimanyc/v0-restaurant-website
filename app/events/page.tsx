'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'

const POSTERS = [
  { src: '/events/contra.jpg', alt: 'Corima x Contra' },
  { src: '/events/sanchez.jpg', alt: 'Sanchez x Corima' },
  { src: '/events/eliane.png', alt: 'Corima x Eliane' },
  { src: '/events/oriole.jpg', alt: 'Oriole x Corima' },
  { src: '/events/osito.jpg', alt: 'Corima x Osito' },
  { src: '/events/reverie.jpg', alt: 'Corima x Reverie' },
  { src: '/events/lysee.jpg', alt: 'Lysee x Corima' },
]

// Scale range: image at viewport center reaches MAX_SCALE; far from center returns to MIN_SCALE.
const MIN_SCALE = 0.72
const MAX_SCALE = 1.0

export default function EventsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const [expandedPoster, setExpandedPoster] = useState<{ src: string; alt: string } | null>(null)

  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let frame = 0
    const update = () => {
      const vh = window.innerHeight
      const center = vh / 2
      itemRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2
        const distance = Math.abs(itemCenter - center)
        // Normalize: 0 at viewport center, 1 at half viewport away.
        const t = Math.min(1, distance / (vh / 2))
        // Smooth easing — eased-in-out cosine.
        const eased = (1 - Math.cos((1 - t) * Math.PI)) / 2
        const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * eased
        el.style.transform = `scale(${scale})`
      })
      frame = 0
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'url(/main-bg.jpeg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '512px 512px',
        color: '#CBCBCB',
      }}
    >
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
        className="sticky top-0"
        style={{
          zIndex: 46,
          opacity: isDiningOpen ? 0 : 1,
          pointerEvents: isDiningOpen ? 'none' : 'all',
          transition: 'opacity 0.5s ease',
        }}
      >
        <nav className="relative flex items-center justify-between px-5 md:px-12 pt-6 pb-4">
          <Link href="/" className="flex-shrink-0 w-24 h-auto">
            <img src="/logo.svg" alt="CORIMA" className="w-full h-full object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>About</Link>
            <Link href="https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>Reservations</Link>
            <button onClick={() => setIsDiningOpen(true)} className="nav-link tracking-wider text-left" style={{ color: 'inherit', background: 'transparent', border: 'none', fontSize: '16px', fontFamily: 'inherit', lineHeight: 'inherit', cursor: 'pointer' }}>Dining</button>
            <Link href="/events" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>Events</Link>
            <Link href="/#press" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>Press</Link>
            <Link href="https://corimanyc.bigcartel.com" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>Shop</Link>
          </div>

          <button className="md:hidden flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
            <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
            <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
            <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
          </button>
        </nav>
      </header>

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onMenuClick={() => setIsMenuOverlayOpen(true)}
      />

      {/* Vertical carousel — each poster scales up as it approaches viewport center */}
      <main className="flex-1 flex flex-col items-center px-5 md:px-12 pt-12 pb-24" style={{ gap: '6vh' }}>
        {POSTERS.map((poster, i) => (
          <div
            key={poster.src}
            ref={(el) => { itemRefs.current[i] = el }}
            onClick={() => setExpandedPoster(poster)}
            className="cursor-pointer"
            style={{
              transform: `scale(${MIN_SCALE})`,
              transformOrigin: 'center',
              willChange: 'transform',
              transition: 'transform 0.05s linear',
            }}
          >
            <img
              src={poster.src}
              alt={poster.alt}
              draggable={false}
              className="block select-none"
              style={{
                height: 'min(75vh, 640px)',
                width: 'auto',
              }}
            />
          </div>
        ))}
      </main>

      {/* Expanded poster lightbox */}
      {expandedPoster && (
        <div
          onClick={() => setExpandedPoster(null)}
          className="fixed inset-0 flex items-center justify-center px-5 md:px-12 py-12"
          style={{
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            cursor: 'zoom-out',
            animation: 'lightbox-fade 0.25s ease',
          }}
        >
          <img
            src={expandedPoster.src}
            alt={expandedPoster.alt}
            onClick={(e) => e.stopPropagation()}
            className="block select-none"
            draggable={false}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              cursor: 'default',
              animation: 'lightbox-zoom 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)',
            }}
          />
          <button
            onClick={() => setExpandedPoster(null)}
            aria-label="Close"
            className="absolute top-6 right-6 md:top-8 md:right-12"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#CBCBCB',
              fontSize: '32px',
              lineHeight: 1,
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            ×
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes lightbox-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightbox-zoom {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
