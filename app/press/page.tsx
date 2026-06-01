'use client'

import { useState } from 'react'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'

const PRESS_ITEMS = [
  {
    title: 'The New York Times: The 100 Best Restaurants in New York City',
    date: 'May 10, 2026',
    href: 'https://www.nytimes.com/interactive/2026/dining/best-nyc-restaurants.html',
  },
  {
    title: 'The 2026 James Beard Restaurant and Chef Award Nominees',
    date: 'March 31, 2026',
    href: 'https://www.jamesbeard.org/stories/james-beard-awards-restaurant-and-chef-nominees-2026',
  },
  {
    title: 'The New York Times: Is This the Mexican Restaurant New York Has Been Waiting For?',
    date: 'March 3, 2026',
    href: 'https://www.nytimes.com/2026/03/03/dining/corima-chinatown-restaurant-review.html',
  },
  {
    title: 'The Best Chef Awards',
    date: 'October 2025',
    href: 'https://thebestchefawards.com/chefs/fidel-caballero/',
  },
  {
    title: 'The 8 Must-Visit Restaurants to Try This Fall',
    date: 'September 22, 2025',
    href: 'https://www.bonappetit.com/story/best-new-restaurant-openings-fall-2025',
  },
  {
    title: "North America's 50 Best Restaurants",
    date: 'May 28, 2025',
    href: 'https://www.theworlds50best.com/northamerica/en/the-list/corima.html',
  },
  {
    title: 'Starstruck: How Chef Fidel Caballero Struck Gold with Corima',
    date: 'January 21, 2025',
    href: 'https://guide.michelin.com/us/en/article/dining-out/michelin-guide-star-spotlight-corima-fidel-caballero-new-york-city',
  },
]

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

        {/* Main content — editorial press grid */}
        <main className="flex flex-1 items-center overflow-y-auto">
          <div className="w-full pl-6 lg:pl-9 pr-6 lg:pr-9 py-16">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-9 md:grid-cols-2 xl:grid-cols-3">
              {PRESS_ITEMS.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start"
                  >
                    <span className="flex flex-col gap-1.5">
                      <span
                        className="font-sans text-balance underline-offset-4 transition-all duration-300 group-hover:underline"
                        style={{
                          color: '#FFFFFF',
                          fontSize: 22,
                          lineHeight: 1.3,
                          fontWeight: 400,
                        }}
                      >
                        {item.title}
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className="font-sans underline-offset-4 transition-all duration-300 group-hover:underline"
                          style={{
                            color: '#FFFFFF',
                            fontSize: 15,
                            lineHeight: 1.4,
                            fontWeight: 400,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {item.date}
                        </span>
                        <span
                          aria-hidden
                          className="-translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                          style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}
                        >
                          &#8599;
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
