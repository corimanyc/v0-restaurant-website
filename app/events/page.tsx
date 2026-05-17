'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'

const POSTERS = [
  { src: '/events/contra.jpg', alt: 'Corima x Contra', label: 'Contra' },
  { src: '/events/sanchez.jpg', alt: 'Sanchez x Corima', label: 'Sanchez' },
  { src: '/events/eliane.png', alt: 'Corima x Eliane', label: 'Eliana' },
  { src: '/events/oriole.jpg', alt: 'Oriole x Corima', label: 'Oriole' },
  { src: '/events/osito.jpg', alt: 'Corima x Osito', label: 'Osito' },
  { src: '/events/reverie.jpg', alt: 'Corima x Reverie', label: 'Drev' },
  { src: '/events/lysee.jpg', alt: 'Lysee x Corima', label: 'Lysee' },
]

export default function EventsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const [expandedPoster, setExpandedPoster] = useState<{ src: string; alt: string; label: string } | null>(null)

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#CBCBCB',
      }}
    >
      {/* Blurred background — sits behind all content. Slightly oversized + negative
          inset so the blur edges don't reveal the dark base color. */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: '-40px',
          backgroundImage: 'url(/events-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          filter: 'blur(2px)',
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
        <nav className="relative flex items-center justify-between px-5 md:px-12 pt-6">
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

      {/* Carousel — single overflow-x scroller. Left padding shifts the first poster
          to the right of the nav gutter. No right padding/margin anywhere. */}
      <main className="flex-1 flex items-end pb-10 lg:pb-14">
        <div
          className="overflow-x-auto w-full"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            className="flex pl-5 md:pl-12"
            style={{
              gap: '12px',
              paddingRight: 0,
              marginRight: 0,
              width: 'max-content',
            }}
          >
            {POSTERS.map((poster) => (
              <img
                key={poster.src}
                src={poster.src}
                alt={poster.alt}
                onClick={() => setExpandedPoster(poster)}
                className="block select-none poster-img"
                draggable={false}
                style={{
                  height: 'min(60.9vh, 525px)',
                  width: 'auto',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </div>
        </div>
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
            className="nav-link uppercase absolute top-6 right-6 md:top-8 md:right-12"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#CBCBCB',
              fontSize: '32px',
              lineHeight: 1,
              fontWeight: 300,
              padding: '0 0 4px 0',
              cursor: 'pointer',
            }}
          >
            X
          </button>
        </div>
      )}

      <style jsx>{`
        .poster-img:hover {
          transform: scale(0.97);
        }
        @keyframes lightbox-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightbox-zoom {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Footer removed on events page */}
      </div>
    </div>
  )
}
