'use client'

import { useState, useRef } from 'react'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'

const PRESS_ITEMS = [
  {
    title: 'Michelin Guide: Corima',
    href: 'https://guide.michelin.com/us/en/new-york-state/new-york/restaurant/corima',
    logo: { src: '/footer-logo.png', alt: 'Corima emblem', className: 'h-12 w-12 md:h-14 md:w-14' },
  },
  {
    title: "North America's 50 Best Restaurants",
    href: 'https://www.theworlds50best.com/northamerica/en/the-list/corima.html',
    logo: { src: '/award-worlds-50-best.avif', alt: "The World's 50 Best logo", className: 'h-12 w-auto md:h-14' },
  },
  {
    title: 'The 2026 James Beard Restaurant and Chef Award Nominees',
    href: 'https://www.jamesbeard.org/stories/james-beard-awards-restaurant-and-chef-nominees-2026',
    logo: { src: '/award-james-beard-2026.png', alt: 'James Beard Foundation 2026 Award Winner medallion', className: 'h-14 w-14 md:h-16 md:w-16' },
  },
  {
    title: 'The New York Times: The 100 Best Restaurants in New York City',
    href: 'https://www.nytimes.com/interactive/2026/dining/best-nyc-restaurants.html',
  },
  {
    title: 'The New York Times: Is This the Mexican Restaurant New York Has Been Waiting For?',
    href: 'https://www.nytimes.com/2026/03/03/dining/corima-chinatown-restaurant-review.html',
  },
  {
    title: 'Bon Appetit: Best New Restaurants 2024',
    href: 'https://www.bonappetit.com/story/best-new-restaurants-2024/?srsltid=AfmBOooubeXt2SVi05FuUYYArLTqqDVbgKeSWuFe53LKEqRzIMhxjSrp',
  },
  {
    title: 'Starstruck: How Chef Fidel Caballero Struck Gold with Corima',
    href: 'https://guide.michelin.com/us/en/article/dining-out/michelin-guide-star-spotlight-corima-fidel-caballero-new-york-city',
  },
  {
    title: 'The Best Chef Awards',
    href: 'https://thebestchefawards.com/chefs/fidel-caballero/',
  },
]

function PressRow({ item }: { item: (typeof PRESS_ITEMS)[number] }) {
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="press-link inline-flex"
      >
        <span
          className="press-underline font-sans text-pretty text-[24px] md:text-[28px]"
          style={{
            color: '#FFFFFF',
            lineHeight: 1.4,
            fontWeight: 400,
          }}
        >
          {item.title}
        </span>
      </a>
      {'logo' in item && item.logo ? (
        <img
          src={item.logo.src || '/placeholder.svg'}
          alt={item.logo.alt}
          className={`shrink-0 object-contain ${item.logo.className}`}
        />
      ) : null}
    </div>
  )
}

export default function PressPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const scrollRef = useRef<HTMLElement>(null)
  // The nav stays fixed/visible at all times on the press page (no hide-on-scroll).
  const [navVisible] = useState(true)

  return (
    <div
      className="h-screen min-h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#CBCBCB',
        height: '100dvh',
      }}
    >
      <h1 className="sr-only">CORIMA Press &amp; Recognition</h1>
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
      <div className="relative flex flex-col flex-1 min-h-0" style={{ zIndex: 1 }}>
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

        {/* Header — overlays the scrolling content and slides up/down with the
            scroll direction, matching the home page behavior. */}
        <header
          className="absolute top-0 left-0 right-0"
          style={{
            zIndex: 46,
            // Keep the header (and logo) visible while the dining panel is open;
            // SiteNav's hideLinks fades only the right-side links/burger.
            pointerEvents: 'none',
            transform: (navVisible || isDiningOpen) ? 'translateY(0)' : 'translateY(-110%)',
            transition: 'transform 0.35s ease',
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

        {/* Main content — full-width editorial press index */}
        <main
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col"
          style={{
            filter: isDiningOpen ? 'blur(2px)' : 'none',
            transition: 'filter 0.35s ease',
          }}
        >
          <div className="w-full pl-6 lg:pl-9 pr-6 lg:pr-9 pt-40 pb-60 md:py-12 md:my-auto">
            <ul className="flex flex-col gap-10 md:gap-6">
              {PRESS_ITEMS.map((item) => (
                <li key={item.title}>
                  <PressRow item={item} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
