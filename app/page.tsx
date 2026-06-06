'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'
import ProgressiveImage from '@/components/progressive-image'

const heroImages = [
  {
    src: '/hero-carousel1new.avif',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/carousel3_no_napkin.avif',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/hero-carousel3new.avif',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/hero-carousel4.avif',
    alt: 'CORIMA fine dining interior',
  },
]

// Mobile (portrait) carousel images — shown below the `md` breakpoint where
// the nav collapses to the hamburger. These crops are framed for tall screens.
const heroImagesMobile = [
  {
    src: '/hero-mobile1.jpg',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/hero-mobile2.jpg',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/hero-mobile3.jpg',
    alt: 'CORIMA fine dining interior',
  },
  {
    src: '/hero-mobile4.jpg',
    alt: 'CORIMA fine dining interior',
  },
]

const aboutSectionImages = [
  {
    bw: '/our-story-kitchen.jpg',
    color: '/our-story-kitchen-color.jpg',
    alt: 'Corima open kitchen during service — chefs plating at the pass',
  },
  {
    bw: '/our-story-grilling.jpg',
    color: '/our-story-grilling-color.jpg',
    alt: 'Corima cook grilling on the line during service',
  },
]

const interiorImages = [
  {
    bw: '/bio-interior-1.jpg',
    color: '/bio-interior-1-color.jpg',
    alt: 'Chefs plating blue-corn tostadas at the Corima pass',
  },
  {
    bw: '/bio-interior-2.jpg',
    color: '/bio-interior-2-color.jpg',
    alt: 'Corima dining nook — banquette and table beneath a pendant light beside a wine shelf',
  },
  {
    bw: '/bio-interior-3.jpg',
    color: '/bio-interior-3-color.jpg',
    alt: 'Corima banquette — framed landscape prints on a wood-panel and exposed-brick wall with a candle niche above the tables',
    position: 'top',
  },
  {
    bw: '/bio-plating.jpg',
    color: '/bio-plating-color.jpg',
    alt: 'A Corima cook spooning sauce and garnish onto speckled ceramic plates at the pass',
  },
]

const ethosImages = [
  {
    bw: '/ethos-brick-wall.jpg',
    color: '/ethos-brick-wall-color.jpg',
    alt: 'Corima dining room — exposed brick wall with a candle-lit niche, a ribbed globe pendant, and dark tables below',
    position: 'top',
  },
  {
    bw: '/ethos-chefs.jpg',
    color: '/ethos-chefs-color.jpg',
    alt: 'Corima cooks working the line at the pass, with a tall floral arrangement and prep tools in the foreground',
  },
  {
    bw: '/ethos-kitchen.jpg',
    color: '/ethos-kitchen-color.jpg',
    alt: 'Corima kitchen during service — a chef searing over an open flame beside bamboo steamers and stockpots',
  },
]

const endingImages = [
  {
    src: '/ending-image.jpg',
    alt: "Corima chef's counter — leather bar stools along a tiled wall with a single spotlit floral arrangement on the counter",
  },
  {
    src: '/ending-bar.jpg',
    alt: 'Corima bar — a long counter with stools and backlit shelves of bottles against an exposed brick wall, looking toward the lit dining room',
  },
]


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [aboutImgIndex, setAboutImgIndex] = useState(0)
  const [interiorIndex, setInteriorIndex] = useState(0)
  const interiorTouchStartX = useRef<number | null>(null)
  const [ethosIndex, setEthosIndex] = useState(0)
  const ethosTouchStartX = useRef<number | null>(null)
  const [endingIndex, setEndingIndex] = useState(0)
  const endingTouchStartX = useRef<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)

  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0
    const onScroll = () => {
      const y = window.scrollY
      setHasScrolled(y > 8)
      // Pure scroll-direction behavior: hide on downward scroll, show on
      // upward scroll. The nav starts visible (initial state above) and only
      // hides once the user actually scrolls downward.
      const delta = y - lastY
      if (delta > 4) {
        setNavVisible(false)
      } else if (delta < -4) {
        setNavVisible(true)
      }
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // The address sits at the bottom of the viewport (~48px above the bottom).
    // Only show it while the hero element actually intersects that line. We use
    // a negative bottom rootMargin so the observer's effective bottom edge is
    // ~48px above the viewport bottom — exactly where the address text lives.
    const el = heroRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -48px 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const prevAboutImg = () => setAboutImgIndex((i) => (i - 1 + aboutSectionImages.length) % aboutSectionImages.length)
  const nextAboutImg = () => setAboutImgIndex((i) => (i + 1) % aboutSectionImages.length)

  const nextInterior = () => setInteriorIndex((i) => (i + 1) % interiorImages.length)
  const prevInterior = () => setInteriorIndex((i) => (i - 1 + interiorImages.length) % interiorImages.length)
  const onInteriorTouchStart = (e: React.TouchEvent) => {
    interiorTouchStartX.current = e.touches[0].clientX
  }
  const onInteriorTouchEnd = (e: React.TouchEvent) => {
    if (interiorTouchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - interiorTouchStartX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? nextInterior() : prevInterior()
    }
    interiorTouchStartX.current = null
  }

  const nextEthos = () => setEthosIndex((i) => (i + 1) % ethosImages.length)
  const prevEthos = () => setEthosIndex((i) => (i - 1 + ethosImages.length) % ethosImages.length)
  const onEthosTouchStart = (e: React.TouchEvent) => {
    ethosTouchStartX.current = e.touches[0].clientX
  }
  const onEthosTouchEnd = (e: React.TouchEvent) => {
    if (ethosTouchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - ethosTouchStartX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? nextEthos() : prevEthos()
    }
    ethosTouchStartX.current = null
  }

  const nextEnding = () => setEndingIndex((i) => (i + 1) % endingImages.length)
  const prevEnding = () => setEndingIndex((i) => (i - 1 + endingImages.length) % endingImages.length)
  const onEndingTouchStart = (e: React.TouchEvent) => {
    endingTouchStartX.current = e.touches[0].clientX
  }
  const onEndingTouchEnd = (e: React.TouchEvent) => {
    if (endingTouchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - endingTouchStartX.current
    if (Math.abs(dx) > 40) {
      dx < 0 ? nextEnding() : prevEnding()
    }
    endingTouchStartX.current = null
  }


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Scroll to the #about / #press section when arriving with a hash in the URL
  // (e.g. navigating here from the events page). App Router doesn't reliably
  // scroll to a hash after a cross-route navigation, so we handle it on mount
  // and on subsequent hashchange events.
  // Take over scroll positioning so the browser never restores the previous
  // scroll position on reload (which would drop the user at the About/Corima
  // paragraph instead of the hero carousel). Run before paint to avoid any
  // visible jump, and keep restoration 'manual' for the life of the page
  // (no reset-to-'auto' on cleanup, which could race a reload).
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    history.scrollRestoration = 'manual'
    // Only force the top when there's no deep-link hash to honor.
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace('#', '')
      if (!id) {
        // No hash: always land on the hero carousel at the top.
        window.scrollTo(0, 0)
        return
      }
      // Defer to the next frame so the target section is mounted/laid out.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
    // Cover bfcache restores (back/forward) which fire 'pageshow', not mount.
    const onPageShow = () => {
      if (!window.location.hash) window.scrollTo(0, 0)
    }
    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      window.removeEventListener('hashchange', scrollToHash)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="sr-only">CORIMA — Contemporary Mexican Restaurant</h1>
      <div
        className="text-white flex-1"
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: "url('/grain-texture-v2.jpeg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
        }}
      >
      <MenuOverlay isOpen={isMenuOverlayOpen} onClose={() => { setIsMenuOverlayOpen(false); setMenuScrollTarget(undefined) }} scrollToSection={menuScrollTarget} />
      <DiningOverlay
        isOpen={isDiningOpen}
        onClose={() => setIsDiningOpen(false)}
        onViewMenu={(section) => { setIsDiningOpen(false); setMenuScrollTarget(section); setIsMenuOverlayOpen(true) }}
      />
      {/* Hero Section — full screen container, nav/footer sit on top via fixed positioning */}
      <section ref={heroRef} className="relative h-screen overflow-hidden w-full">
        {/* Hero images compress when dining open */}
        <div
          className="absolute top-0 left-0 h-full"
          style={{
            width: isDiningOpen ? '50%' : '100%',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          {/* Desktop (md+) landscape carousel */}
          {heroImages.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 hidden md:block"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                objectPosition: index === 0 ? 'center 60%' : 'center',
              }}
            />
          ))}
          {/* Mobile (below md) portrait carousel — paired to the hamburger nav breakpoint */}
          {heroImagesMobile.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 md:hidden"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                objectPosition: 'center',
              }}
            />
          ))}
        </div>

        {/* Gradient blur layer — always visible at top of viewport. Sits below
            the dining side panel (z-45) so the panel covers it on the right,
            and below the nav header (z-46) so nav text stays sharp. */}
        {/* Progressive blur — stacked layers each with greater blur radius
            and a higher start position. Because each layer fully covers from
            its start to the top, blurs accumulate downward, which the eye
            reads as a smooth, edge-less gradient blur. */}
        <div
          aria-hidden
          className="fixed top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '88px',
            zIndex: 44,
            opacity: hasScrolled ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        >
          {[
            // Lightest layer extends almost the full band, providing the soft tail.
            { blur: 0.75, stops: '1 0%, 1 60%, 0 90%' },
            // Mid layer holds opacity longer through the upper-middle so the middle-top
            // area accumulates more blur, then eases out smoothly.
            { blur: 1.5, stops: '1 0%, 1 35%, 0.6 55%, 0 75%' },
            // Strongest layer concentrated at the top with a soft eased tail rather
            // than a hard stop so it doesn't read as a band edge.
            { blur: 3, stops: '1 0%, 1 20%, 0.5 40%, 0 55%' },
          ].map((layer, i) => {
            const mask = `linear-gradient(to bottom, ${layer.stops
              .split(',')
              .map((s) => {
                const [a, p] = s.trim().split(' ')
                return `rgba(0,0,0,${a}) ${p}`
              })
              .join(', ')})`
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  backdropFilter: `blur(${layer.blur}px)`,
                  WebkitBackdropFilter: `blur(${layer.blur}px)`,
                  maskImage: mask,
                  WebkitMaskImage: mask,
                }}
              />
            )
          })}
        </div>

        {/* Header/Navigation — fixed; logo stays put always, only links/burger fade when dining opens */}
        <header
          className="fixed top-0 left-0 right-0"
          style={{
            zIndex: 46,
            color: '#FFFFFF',
            // Header itself must not block clicks/hover on what's beneath
            // (e.g. the dining panel's X button). SiteNav re-enables pointer
            // events on the actual interactive children.
            pointerEvents: 'none',
            // Slide the nav up out of view when the user scrolls down; it
            // re-enters as soon as they scroll up. Keep it visible while the
            // dining panel is open so the close affordance stays reachable.
            transform: (navVisible || isDiningOpen) ? 'translateY(0)' : 'translateY(-110%)',
            transition: 'transform 0.35s ease',
          }}
        >
          <SiteNav
            aboutHref="#about"
            pressHref="/press"
            smoothScrollAbout
            onOpenDining={() => setIsDiningOpen(true)}
            onToggleMobileMenu={() => setIsMenuOpen(!isMenuOpen)}
            hideLinks={isDiningOpen}
          />

        </header>

        {/* Mobile Nav Overlay — slides in from top */}
        <MobileNav
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onMenuClick={() => setIsMenuOverlayOpen(true)}
        />

        {/* Footer — persistent icon, address only on landing */}
        <footer
          className="fixed bottom-0 left-0 right-0 z-40"
          style={{
            // Wrapper itself never blocks clicks; only the icon below opts back into pointer events.
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="relative flex items-end justify-between px-6 md:px-9 pt-6 pb-6">
            {/* Address — visible only while the hero is intersecting the viewport.
                Driven by IntersectionObserver on the hero ref below.
                Two whitespace-nowrap spans inside a flex-wrap container so they
                stay inline on wide viewports and stack (left-aligned) when
                they would otherwise wrap mid-line. */}
            <div
              className="tracking-wider text-white flex flex-wrap gap-x-3"
              style={{
                fontSize: '16px',
                opacity: heroVisible ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease',
                fontWeight: 400,
              }}
            >
              <span className="whitespace-nowrap">3 Allen St. NY 10002</span>
              <span className="whitespace-nowrap">Tuesday - Saturday &nbsp; 5:30PM - 10PM</span>
            </div>
            {/* Persistent logo — stays white regardless of scroll */}
            <img
              src="/footer-logo.png"
              alt="CORIMA"
              className="w-6 h-6 object-contain ml-auto"
              style={{
                pointerEvents: isDiningOpen ? 'none' : 'auto',
                opacity: isDiningOpen ? 0 : 1,
                transition: 'opacity 0.5s ease',
              }}
            />
          </div>
        </footer>
      </section>

      {/* About Section */}
      <section
        id="about"
          className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/grain-texture-v2.jpeg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
          backgroundColor: '#1a1a1a',
          color: '#CBCBCB',
          paddingBottom: '100px',
        }}
      >
        {/* Full-width vase image — full natural aspect ratio, with bottom + sides masked so it fades into the dark section background instead of dominating vertically. */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute right-0 md:right-[8.33%] hidden md:block"
          style={{
            // Smooth fluid sizing between mobile (~62vw) and desktop (cap 800px).
            // Linear interp: at 360px viewport ≈ 224px wide; at 1280px viewport ≈ 793px wide.
            width: 'clamp(200px, 62vw + 0px, 800px)',
            // Top offset fluidly interpolates: ~180px lower on mobile so the flower sits below the lifted Corima paragraph but not too far, easing back to ~12-24px from md and up.
            top: 'clamp(12px, -29vw + 372px, 180px)',
            maxWidth: '800px',
            // Combine vertical (bottom fade) and horizontal (left/right fade) masks; both must be visible -> use intersect by composing two gradients.
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        >
          <ProgressiveImage
            src="/flower-sketch.png"
            alt=""
            className="block w-full h-auto"
          />
        </div>
        {/* Headline pinned to left gutter — fills the viewport so the photo + headline act as a hero */}
        <div className="relative pt-[100px] md:pt-48 pb-[104px] md:pb-16 min-h-screen md:min-h-screen flex items-center px-6 md:px-9" style={{ zIndex: 1 }}>
          <div className="w-full md:grid md:grid-cols-12 md:gap-5">
            <div className="md:col-start-2 md:col-end-9 relative">
              {/* Mobile-only flower, anchored just below the paragraph's bottom-right corner with the same bottom + side fade masks as the desktop version. Sits BEHIND the text via negative z-index. Hidden from md+ where the absolute version higher up is used instead. */}
              <div
                aria-hidden
                className="md:hidden pointer-events-none select-none absolute bottom-0 translate-y-[55%] right-0 mr-4"
                style={{
                  zIndex: -1,
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%)',
                  maskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 100%)',
                  WebkitMaskComposite: 'source-in',
                  maskComposite: 'intersect',
                }}
              >
                <ProgressiveImage
                  src="/flower-sketch.png"
                  alt=""
                  className="block h-auto"
                  style={{ width: 'clamp(200px, 62vw, 360px)' }}
                />
              </div>
              <p
                className="text-[26px] md:text-[36px] relative"
                style={{
                  fontFamily: "'Switzer', system-ui, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: '#CBCBCB',
                }}
              >
                Corima (ko-ree-ma) is a cornerstone principle of Tarahumara society. Literally translated, it means &ldquo;circle of sharing.&rdquo;
                <br />
                <br />
                In Tarahumara culture, the community, rather than the individual, owns pretty much everything. Working with the roughness, yet simplicity of the desert as inspiration, Corima takes what is familiar to some and makes it sensible to all.
              </p>
            </div>
          </div>
        </div>

        {/*
          Our Story + Ethos — built on the locked grid spec:
            outer margin 36px (inline padding on the wrapper)
            12 columns, 20px gutter (grid-cols-12 gap-5)
            vertical placement in absolute pixels
        */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ===== OUR STORY ===== */}
          <section className="pt-16 md:pt-[200px] px-6 md:px-9">
            {/* Section label */}
            <div className="md:grid md:grid-cols-12 md:gap-5">
              <div className="md:col-start-2 md:col-end-4">
                <p style={{ fontSize: '20px', fontWeight: 400, color: '#CBCBCB', letterSpacing: '0.01em' }}>Our Story</p>
              </div>
            </div>

            {/* Staircase headline (SVG) — mobile and desktop variants */}
            <div className="mt-8 md:mt-[50px] md:grid md:grid-cols-12 md:gap-5">
            <div className="md:col-start-2 md:col-end-9">
                {/* Mobile: two separate text elements — first clause left-aligned, second right-aligned, matching the SVG staircase */}
                <p
                  className="block min-[620px]:hidden"
                  style={{
                    fontFamily: "'Switzer', system-ui, sans-serif",
                    fontWeight: 400,
                    // Fluidly scales with viewport up to the 620px swap point (~26px at 390px, ~41px near 620px)
                    fontSize: 'clamp(22px, 6.6vw, 41px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#CBCBCB',
                    textAlign: 'left',
                    maxWidth: '440px',
                  }}
                >
                  Working with the roughness, yet simplicity of the desert as inspiration
                </p>
                <p
                  className="block min-[620px]:hidden"
                  style={{
                    fontFamily: "'Switzer', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 6.6vw, 41px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#CBCBCB',
                    textAlign: 'right',
                    width: 'clamp(300px, 78vw, 480px)',
                    maxWidth: '100%',
                    marginLeft: 'auto',
                  }}
                >
                  Corima takes what is familiar to some and makes it sensible to all
                </p>
                {/* Tablet (620px–lg): mobile SVG variant — shares the same 557px inherent width as the ethos mobile SVG so both headlines scale consistently */}
                <img
                  src="/our-story-headline-mobile.svg"
                  alt="Working with the roughness, yet simplicity of the desert as inspiration, Corima takes what is familiar to some and makes it sensible to all."
                  className="w-full h-auto hidden min-[620px]:block md:hidden"
                />
                {/* Desktop (lg+): wide staircase SVG */}
                <img
                  src="/our-story-headline.svg"
                  alt="Working with the roughness, yet simplicity of the desert as inspiration, Corima takes what is familiar to some and makes it sensible to all."
                  className="w-full h-auto hidden md:block"
                />
              </div>
            </div>

            {/* On mobile, image appears above the intro copy. On desktop (lg+),
                md:contents promotes both children back to normal flow so document
                order (copy, then image) is restored. */}
            <div className="flex flex-col md:contents">
              {/* Intro copy — right-aligned to the SVG's right edge (col-end-9), 80px below the SVG */}
              <div className="order-2 md:order-none mt-[50px] md:mt-[80px] md:grid md:grid-cols-12 md:gap-5">
                <div className="md:col-start-6 md:col-end-9">
                  <p className="body-copy" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                    The concept of Corima was born out of a gap Chef Caballero identified in the Mexican culinary landscape expressed in New York City.
                  </p>
                  <p className="body-copy mt-7" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                    Until now, &ldquo;Mexican cuisine&rdquo; in NYC has been limited to specific regions and types of food. Chef Caballero draws from the monumental perception and never-ending exploration of Mexican land and distills it into a type of Mexican cuisine that has yet to be expressed in this country.
                  </p>
                </div>
              </div>

              {/* Counter image — desktop: under the intro copy, 100px below.
                  Mobile: rendered before the copy via order-1, with 50px gap above. */}
              <div className="order-1 md:order-none mt-[62px] md:mt-[100px] md:grid md:grid-cols-12 md:gap-5">
                <div className="md:col-start-6 md:col-end-12">
                  <button
                    type="button"
                    onClick={nextAboutImg}
                    aria-label="Show next photo"
                    className="group relative block w-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    style={{ aspectRatio: '2048 / 1118' }}
                  >
                    <ProgressiveImage
                      src={aboutSectionImages[aboutImgIndex].bw || "/placeholder.svg"}
                      alt={aboutSectionImages[aboutImgIndex].alt}
                      className="absolute inset-0 w-full h-full object-cover object-top block"
                    />
                    <ProgressiveImage
                      src={aboutSectionImages[aboutImgIndex].color || "/placeholder.svg"}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Chef bio */}
            <div className="mt-7 md:mt-[100px] md:grid md:grid-cols-12 md:gap-5">
              <div
                className="md:col-start-2 md:col-end-6"
                style={{ paddingRight: 'var(--bio-right-pad, 0)' }}
              >
                <style>{`@media (min-width: 1024px) { :root { --bio-right-pad: calc((100% - 60px) / 8 + 10px); } }`}</style>
                <p className="body-copy" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                  Chef Fidel Caballero was raised between Ciudad Ju&aacute;rez, Chihuahua, and El Paso, Texas, shaped by the rhythms, flavors, and realities of the border. That perspective continues to guide his cooking.
                </p>
              </div>
            </div>

            {/* Bottom paired images */}
            <div className="mt-[76px] md:mt-[100px] flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-12 md:gap-5 md:items-stretch">
              <div className="md:col-start-3 md:col-end-7" style={{ aspectRatio: '4 / 5' }}>
                <ProgressiveImage
                  src="/bio-chef-1.jpg"
                  alt="Chef Fidel Caballero plating a dish at the kitchen pass"
                  className="w-full h-full object-cover block"
                />
              </div>
              <div className="block md:col-start-7 md:col-end-10" style={{ aspectRatio: '4 / 5' }}>
                <button
                  type="button"
                  onClick={nextInterior}
                  onTouchStart={onInteriorTouchStart}
                  onTouchEnd={onInteriorTouchEnd}
                  aria-label="Show next photo"
                  className="group relative block w-full h-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
  {interiorImages.map((img, i) => (
  <div
  key={img.bw}
  className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === interiorIndex ? 'opacity-100' : 'opacity-0'}`}
  >
                  <ProgressiveImage
                    src={img.bw || "/placeholder.svg"}
                    alt={img.alt}
                    style={{ objectPosition: img.position ?? 'center' }}
                    className="absolute inset-0 w-full h-full object-cover block"
                  />
                  <ProgressiveImage
                    src={img.color || "/placeholder.svg"}
                    alt=""
                    aria-hidden="true"
                    style={{ objectPosition: img.position ?? 'center' }}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                  />
  </div>
  ))}
  </button>
              </div>
            </div>
          </section>

          {/* ===== ETHOS ===== */}
          <section className="pt-[96px] md:pt-[140px] px-6 md:px-9">
            <div className="md:grid md:grid-cols-12 md:gap-5">
              <div className="md:col-start-2 md:col-end-4">
                <p style={{ fontSize: '20px', fontWeight: 400, color: '#CBCBCB', letterSpacing: '0.01em' }}>Ethos</p>
              </div>
            </div>

            {/* Staircase headline (SVG) — mobile and desktop variants */}
            <div className="mt-8 md:mt-[50px] md:grid md:grid-cols-12 md:gap-5">
              <div className="md:col-start-2 md:col-end-7">
                {/* Mobile: two separate text elements — first clause left-aligned, second right-aligned, matching the SVG staircase */}
                <p
                  className="block min-[620px]:hidden"
                  style={{
                    fontFamily: "'Switzer', system-ui, sans-serif",
                    fontWeight: 400,
                    // Fluidly scales with viewport up to the 620px swap point (~26px at 390px, ~41px near 620px)
                    fontSize: 'clamp(22px, 6.6vw, 41px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#CBCBCB',
                    textAlign: 'left',
                    maxWidth: 'clamp(380px, 88vw, 640px)',
                  }}
                >
                  Circle of Sharing does not just apply to our cuisine, it&apos;s a living exchange between
                </p>
                <p
                  className="block min-[620px]:hidden"
                  style={{
                    fontFamily: "'Switzer', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 6.6vw, 41px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: '#CBCBCB',
                    textAlign: 'right',
                    width: '570px',
                    maxWidth: '100%',
                    marginLeft: 'auto',
                  }}
                >
                  our kitchen, our guests, farmers, foragers, and artisans who shape how we cook.
                </p>
                {/* Tablet (620px–lg): mobile SVG variant — shares the same 557px inherent width as the our-story mobile SVG so both headlines scale consistently */}
                <img
                  src="/ethos-headline-mobile.svg"
                  alt="Circle of Sharing does not just apply to our cuisine, it's a living exchange between our kitchen, our guests, farmers, foragers, and artisans who shape how we cook."
                  className="w-full h-auto hidden min-[620px]:block md:hidden"
                />
                {/* Desktop (lg+): staircase SVG */}
                <img
                  src="/ethos-headline.svg"
                  alt="Circle of Sharing does not just apply to our cuisine, it's a living exchange between our kitchen, our guests, farmers, foragers, and artisans who shape how we cook."
                  className="w-full h-auto hidden md:block"
                />
              </div>
            </div>

            {/* Body copy + dining-nook image */}
            <div className="mt-[62px] mb-[62px] md:mb-0 md:mt-[60px] flex flex-col gap-[62px] md:gap-0 md:grid md:grid-cols-12 md:gap-5 md:items-start">
              <div className="md:col-start-3 md:col-end-6 md:pt-[190px]">
                <p className="body-copy" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                  Seasonal sourcing, whole-product utilization, and long-term partnerships with responsible producers allow us to honor ingredients fully while creating a resilient, forward-thinking kitchen.
                </p>
                <p className="body-copy mt-7" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                  We are deeply indebted to our purveyors who ensure we have pristine product throughout the seasons.
                </p>
                <p className="body-copy hidden md:block mt-10 md:mt-20" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
                  Within its first year, Corima earned a Michelin star and was named one of Bon App&eacute;tit&apos;s Best New Restaurants of 2024. Chef Fidel Caballero was also named a James Beard Best Chef finalist in 2026. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
                </p>
              </div>
              <div className="md:col-start-7 md:col-end-13">
                <button
                  type="button"
                  onClick={nextEthos}
                  onTouchStart={onEthosTouchStart}
                  onTouchEnd={onEthosTouchEnd}
                  aria-label="Show next photo"
                  className="group relative block w-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{ aspectRatio: '3 / 2' }}
                >
                  {ethosImages.map((img, i) => (
                    <div
                      key={img.bw}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === ethosIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ProgressiveImage
                        src={img.bw || "/placeholder.svg"}
                        alt={img.alt}
                        style={{ objectPosition: img.position ?? 'center' }}
                        className="absolute inset-0 w-full h-full object-cover block"
                      />
                      <ProgressiveImage
                        src={img.color || "/placeholder.svg"}
                        alt=""
                        aria-hidden="true"
                        style={{ objectPosition: img.position ?? 'center' }}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                      />
                    </div>
                  ))}
                </button>
              </div>
            </div>

            {/* Mobile-only: recognition copy between the dining-nook and kitchen images */}
            <p className="body-copy md:hidden mt-0" style={{ lineHeight: 1.6, color: '#CBCBCB' }}>
              Within its first year, Corima earned a Michelin star and was named one of Bon App&eacute;tit&apos;s Best New Restaurants of 2024. Chef Fidel Caballero was also named a James Beard Best Chef finalist in 2026. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
            </p>

            {/* Bottom kitchen action image */}
            <div className="mt-[62px] md:mt-[140px] md:grid md:grid-cols-12 md:gap-5">
              <div className="md:col-start-3 md:col-end-9">
                <button
                  type="button"
                  onClick={nextEnding}
                  onTouchStart={onEndingTouchStart}
                  onTouchEnd={onEndingTouchEnd}
                  aria-label="Show next photo"
                  className="relative block w-full overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{ aspectRatio: '3 / 2' }}
                >
                  {endingImages.map((img, i) => (
                    <ProgressiveImage
                      key={img.src}
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-500 ease-out ${i === endingIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                </button>
              </div>
            </div>
          </section>

        </div>
      </section>
      {/* End dark section */}
      </div>


      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: 'url(/grain-texture-v2.jpeg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
          width: '100%',
          // Horizontal padding matches the SiteNav (24px on mobile, 36px ≥1024px)
          // for a consistent left/right edge across the whole site. Right padding
          // adds extra room so footer links don't sit underneath the persistent
          // fixed white CORIMA icon at the bottom-right.
          paddingTop: '40px',
          paddingBottom: '24px',
          paddingLeft: 'var(--site-pad-x, 24px)',
          paddingRight: '132px',
        }}
      >
        <div className="hidden min-[880px]:flex w-full items-center gap-8 justify-between" style={{ fontFamily: "'Switzer', system-ui, sans-serif" }}>
          <p className="tracking-wider" style={{ fontSize: '15px', color: '#FFFFFF', margin: '0', fontWeight: 400, paddingTop: '3px', paddingBottom: '1px' }}>3 Allen St. NY 10002</p>
          <p className="tracking-wider" style={{ fontSize: '15px', color: '#FFFFFF', margin: '0', fontWeight: 400, paddingTop: '3px', paddingBottom: '1px' }}>Tue-Sat 5:30PM - 10PM</p>
          {/* Small white "O" from the CORIMA wordmark, sized to the footer text cap height */}
          <svg
            viewBox="153 15 283 272"
            aria-hidden="true"
            style={{ height: '12px', width: 'auto', flex: 'none', display: 'block', position: 'relative', top: '1px' }}
          >
            <path
              fill="#FFFFFF"
              d="M294.5,286.1c-39.7,0-75.7-14-101.6-39.4c-25.3-24.9-39.3-58.9-39.3-95.6c0-37.3,13.1-71.2,36.7-95.4c25.5-26,61.5-39.7,104.2-39.7c42.7,0,78.7,13.7,104.2,39.7c23.7,24.2,36.7,58,36.7,95.4c0,36.8-14,70.7-39.3,95.6C370.2,272.1,334.1,286.1,294.5,286.1 M294.5,56.4c-31.6,0-57.6,9.5-75.3,27.6c-16.5,16.8-25.2,40-25.2,67c0,54.8,42.2,94.6,100.4,94.6c58.2,0,100.4-39.8,100.4-94.6c0-27.1-8.7-50.2-25.2-67C352,65.9,326,56.4,294.5,56.4"
            />
          </svg>
          <a
            href="mailto:info@corimanyc.com"
            className="nav-link tracking-wider"
            style={{ fontSize: '15px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}
          >
            Contact
          </a>
          <a
            href="https://www.instagram.com/corima.nyc/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link tracking-wider"
            style={{ fontSize: '15px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}
          >
            Instagram
          </a>
          <span
            className="nav-link tracking-wider"
            style={{
              fontSize: '15px',
              color: '#FFFFFF',
              margin: '0',
              fontWeight: 400,
              position: 'relative',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const popover = e.currentTarget.querySelector<HTMLDivElement>('[data-spotify-popover]')
              if (popover) popover.style.opacity = '1'
              if (popover) popover.style.pointerEvents = 'auto'
              if (popover) popover.style.transform = 'translateY(0)'
            }}
            onMouseLeave={(e) => {
              const popover = e.currentTarget.querySelector<HTMLDivElement>('[data-spotify-popover]')
              if (popover) popover.style.opacity = '0'
              if (popover) popover.style.pointerEvents = 'none'
              if (popover) popover.style.transform = 'translateY(8px)'
            }}
          >
            <a
              href="https://open.spotify.com/playlist/5oMsfRzrZzZXaSBQ9obYry"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Spotify
            </a>
            <div
              data-spotify-popover
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 12px)',
                right: 0,
                width: '420px',
                opacity: 0,
                pointerEvents: 'none',
                transform: 'translateY(8px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                zIndex: 60,
              }}
            >
              {/* Invisible hover bridge so the cursor can cross the 12px gap
                  from the "Spotify" label to the iframe without triggering
                  mouseleave on the parent span. */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '-12px',
                  height: '12px',
                }}
              />
              {/* Card: photo background with the Spotify embed centered on top */}
              <div
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  padding: '20px',
                  backgroundImage: 'url(/hero-counter-service.jpeg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                }}
              >
                {/* Dark scrim for legibility over the photo */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)',
                  }}
                />
                <iframe
                  data-testid="embed-iframe"
                  title="Corima Spotify playlist"
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    display: 'block',
                    width: '100%',
                    height: '352px',
                    border: 0,
                  }}
                  src="https://open.spotify.com/embed/playlist/5oMsfRzrZzZXaSBQ9obYry?utm_source=generator"
                  width="100%"
                  height="352"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </span>
        </div>

        {/* Below 880px (where the single row begins to wrap): links spread across
            the top in a single row, then hours and address stacked left-aligned
            beneath them. */}
        <div
          className="flex flex-col min-[880px]:hidden"
          style={{
            fontFamily: "'Switzer', system-ui, sans-serif",
            marginTop: '40px',
            gap: '16px',
            // Cancel the container's extra right padding (132px, reserved for the
            // fixed corner icon) down to the standard horizontal padding so the
            // links row spans the full width edge-to-edge.
            marginRight: 'calc(-132px + var(--site-pad-x, 24px))',
          }}
        >
          {/* Links row with rounded-dash dividers above and below. SVG is used
              (instead of border-dashed) so the dashes can have rounded caps. */}
          <div className="flex flex-col" style={{ gap: '12px' }}>
            <svg width="100%" height="2" aria-hidden="true" style={{ display: 'block' }}>
              <line x1="1" y1="1" x2="100%" y2="1" stroke="#FEFEFE" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 6" />
            </svg>
            <div className="flex items-center justify-between gap-x-4" style={{ fontSize: '15px' }}>
              <a href="https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider whitespace-nowrap" style={{ color: '#FFFFFF', fontWeight: 400 }}>Reservations</a>
              <a href="mailto:info@corimanyc.com" className="nav-link tracking-wider whitespace-nowrap" style={{ color: '#FFFFFF', fontWeight: 400 }}>Contact</a>
              <a href="https://www.instagram.com/corima.nyc/" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider whitespace-nowrap" style={{ color: '#FFFFFF', fontWeight: 400 }}>Instagram</a>
              <a href="https://open.spotify.com/playlist/5oMsfRzrZzZXaSBQ9obYry" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider whitespace-nowrap" style={{ color: '#FFFFFF', fontWeight: 400 }}>Spotify</a>
            </div>
            <svg width="100%" height="2" aria-hidden="true" style={{ display: 'block' }}>
              <line x1="1" y1="1" x2="100%" y2="1" stroke="#FEFEFE" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 6" />
            </svg>
          </div>
          {/* Hours, then address — stacked and left-aligned */}
          <div className="flex flex-col" style={{ gap: '12px' }}>
            <span className="tracking-wider whitespace-nowrap" style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 400 }}>Tue-Sat 5:30PM - 10PM</span>
            <span className="tracking-wider whitespace-nowrap" style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 400 }}>3 Allen St. NY 10002</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
