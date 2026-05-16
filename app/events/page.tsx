'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'

const posters = [
  { src: '/events/contra.jpg', alt: 'Corima x Contra — January 20', aspect: '9 / 16' },
  { src: '/events/sanchez.jpg', alt: 'Sanchez x Corima — Circle of Sharing, December 16, presented by Resy', aspect: '4 / 5' },
  { src: '/events/eliane.png', alt: 'Corima x Eliane — presented by Resy', aspect: '4 / 5' },
  { src: '/events/oriole.jpg', alt: 'Oriole x Corima — April 15', aspect: '1 / 1' },
  { src: '/events/osito.jpg', alt: 'Corima x Osito — 1 Year Anniversary Collab, January 15, 2025', aspect: '1 / 1' },
  { src: '/events/reverie.jpg', alt: 'Corima x Reverie', aspect: '1 / 1' },
  { src: '/events/lysee.jpg', alt: 'Lysée x Corima', aspect: '1 / 1' },
]

export default function EventsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)

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

      {/* Header — mirrors the home nav */}
      <header
        className="relative"
        style={{
          zIndex: 46,
          opacity: isDiningOpen ? 0 : 1,
          pointerEvents: isDiningOpen ? 'none' : 'all',
          color: '#CBCBCB',
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

      {/* Carousel — left edge aligned to nav gutter */}
      <main className="flex-1 flex items-center py-16 lg:py-24">
        <div
          className="flex gap-6 overflow-x-auto pb-4 w-full items-center"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'var(--gutter)',
            paddingRight: 'var(--gutter)',
          }}
        >
          {posters.map((poster) => (
            <img
              key={poster.src}
              src={poster.src}
              alt={poster.alt}
              className="block flex-shrink-0 w-auto"
              style={{
                height: 'min(70vh, 600px)',
                scrollSnapAlign: 'start',
              }}
            />
          ))}
        </div>
      </main>

      {/* Footer — matches home (icon + address) */}
      <footer
        style={{
          opacity: isDiningOpen ? 0 : 1,
          pointerEvents: isDiningOpen ? 'none' : 'all',
          transition: 'opacity 0.5s ease',
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-12 py-6">
          <p className="text-xs md:text-sm tracking-widest uppercase text-white">
            {'3 ALLEN ST NY 10002   TUESDAY -  SATURDAY  5:30PM - 10PM'}
          </p>
          <img src="/footer-logo.png" alt="CORIMA" className="w-6 h-6 object-contain ml-auto" />
        </div>
      </footer>
    </div>
  )
}
