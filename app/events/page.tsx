'use client'

import { useState } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'
import ProgressiveImage from '@/components/progressive-image'

const POSTERS = [
  { src: '/events/holbox.jpg', alt: 'Holbox at Corima, presented by Resy', label: 'Holbox' },
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
      className="h-screen min-h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#CBCBCB',
        height: '100dvh',
      }}
    >
      <h1 className="sr-only">CORIMA Events &amp; Collaboration Dinners</h1>
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
          // Keep the header (and logo) visible while the dining panel is open;
          // SiteNav's hideLinks fades only the right-side links/burger.
          pointerEvents: 'none',
        }}
      >
        <SiteNav
          aboutHref="/#about"
          pressHref="/press"
          onOpenDining={() => setIsDiningOpen(true)}
          onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
          linkColor="#FFFFFF"
          hideLinks={isDiningOpen}
        />
      </header>

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onMenuClick={() => setIsMenuOverlayOpen(true)}
        aboutHref="/#about"
        pressHref="/press"
      />

      {/* Carousel — single overflow-x scroller. Left padding shifts the first poster
          to the right of the nav gutter. No right padding/margin anywhere.
          Bottom padding: 80px on mobile, 56px on desktop. */}
      <main className="flex-1 flex items-end pb-[130px] lg:pb-14">
        <div
          className="overflow-x-auto w-full"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            className="flex pl-6 lg:pl-9"
            style={{
              gap: '12px',
              paddingRight: 0,
              marginRight: 0,
              width: 'max-content',
            }}
          >
            {POSTERS.map((poster) => (
              <ProgressiveImage
                key={poster.src}
                src={poster.src}
                alt={poster.alt}
                onClick={() => setExpandedPoster(poster)}
                className="block select-none poster-img"
                draggable={false}
                style={{
                  height: 'min(50vh, 420px)',
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
            animation: 'lightbox-fade 0.25s ease',
          }}
        >
          <ProgressiveImage
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
              animation: 'lightbox-zoom 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)',
            }}
          />
          <button
            onClick={() => setExpandedPoster(null)}
            aria-label="Close"
            className="nav-link uppercase"
            style={{
              position: 'absolute',
              top: '24px',
              right: '48px',
              background: 'transparent',
              border: 'none',
              color: '#CBCBCB',
              fontSize: '32px',
              lineHeight: 1,
              fontWeight: 300,
              padding: '0 0 4px 0',
              zIndex: 2,
            }}
          >
            X
          </button>
        </div>
      )}

      <style jsx>{`
        @media (hover: hover) {
          .poster-img:hover {
            transform: scale(0.97);
          }
        }
        /* Restore the larger desktop poster size on lg+ viewports. */
        @media (min-width: 1024px) {
          .poster-img {
            height: min(60.9vh, 525px) !important;
          }
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
