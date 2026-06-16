'use client'

import { useState, useRef, useEffect } from 'react'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'

const PRESS_ITEMS = [
  {
    title: "North America's 50 Best Restaurants",
    date: 'May 28, 2026',
    href: 'https://www.theworlds50best.com/northamerica/en/the-list/corima.html',
  },
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
  {
    title: 'The Best Chef Awards',
    date: 'October 2025',
    href: 'https://thebestchefawards.com/chefs/fidel-caballero/',
  },
]

function PressRow({ item }: { item: (typeof PRESS_ITEMS)[number] }) {
  const titleRef = useRef<HTMLSpanElement>(null)
  const [wrapped, setWrapped] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const measure = () => {
      // Below md the title and date are stacked, so the flat full-width line
      // (which sits under the date) would never underline the title. Always
      // treat mobile rows as "wrapped" so they use per-text underlines.
      if (window.innerWidth < 768) {
        setWrapped(true)
        return
      }
      // Desktop: count the actual rendered text lines — a Range over the
      // title's text returns one client rect per line, so >1 rect means the
      // title has wrapped.
      const range = document.createRange()
      range.selectNodeContents(el)
      setWrapped(range.getClientRects().length > 1)
    }
    measure()
    // Re-measure once the web font has loaded (initial measure can run with the
    // fallback font, which may wrap differently).
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`press-link flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6 ${wrapped ? 'is-wrapped' : 'is-flat'}`}
    >
      <span
        ref={titleRef}
        className="press-underline font-sans text-pretty"
        style={{
          color: '#FFFFFF',
          fontSize: 24,
          lineHeight: 1.4,
          fontWeight: 400,
        }}
      >
        {item.title}
      </span>
      <span
        className="press-underline font-sans shrink-0"
        style={{
          color: '#FFFFFF',
          fontSize: 18,
          lineHeight: 1.4,
          fontWeight: 400,
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        {item.date}
      </span>
    </a>
  )
}

export default function PressPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const scrollRef = useRef<HTMLElement>(null)
  const [navVisible, setNavVisible] = useState(true)

  // Match the home page: hide the nav on downward scroll, show it on upward
  // scroll. The press page scrolls inside <main> (overflow-y-auto), so we listen
  // on that element rather than the window. The work is throttled with rAF and
  // gated by a threshold so small jitters don't flip the nav back and forth.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let lastY = el.scrollTop
    let ticking = false
    const THRESHOLD = 12
    const update = () => {
      ticking = false
      const y = el.scrollTop
      // Always reveal the nav near the top of the list.
      if (y < 64) {
        setNavVisible(true)
        lastY = y
        return
      }
      const delta = y - lastY
      if (delta > THRESHOLD) {
        setNavVisible(false)
        lastY = y
      } else if (delta < -THRESHOLD) {
        setNavVisible(true)
        lastY = y
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

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
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
          style={{
            filter: isDiningOpen ? 'blur(2px)' : 'none',
            transition: 'filter 0.35s ease',
          }}
        >
          <div className="w-full pl-6 lg:pl-9 pr-6 lg:pr-9 pt-28 md:pt-48 pb-60 md:pb-20">
              <ul className="flex flex-col gap-10 md:gap-7">
              {PRESS_ITEMS.map((item) => (
                <li key={`${item.title}-${item.date}`}>
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
