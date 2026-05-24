'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'
import SiteNav from '@/components/site-nav'

const heroImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/corima_carousel-ud1JMifr4LEWSaRzmOBrGEnict94W2.png',
    alt: 'CORIMA fine dining — a dry-aged cut of beef presented tableside',
  },
  {
    src: '/hero-counter-service.jpeg',
    alt: 'CORIMA chef\u2019s counter — diners watching the line during service',
  },
  {
    src: '/hero-kitchen-934.jpeg',
    alt: 'CORIMA kitchen — 9:34 PM, chef\u2019s shadow across the line during service',
  },
  {
    src: '/hero-dining-nook.jpeg',
    alt: 'CORIMA dining nook — wooden chairs and table against slatted wainscoting',
  },
]

const aboutSectionImages = [
  {
    bw: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B6767198-A11A-4F32-8C93-F2AA3ACA83CA%202-crfmYdcYcAwg7v0h4lBf6ZfINvBH7E.png',
    color: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B6767198-A11A-4F32-8C93-F2AA3ACA83CA%202-crfmYdcYcAwg7v0h4lBf6ZfINvBH7E.png',
    alt: 'Chef preparing service with traditional pottery',
  },
  {
    bw: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1305D7C9-5A98-4D73-B74E-1A6F046A1C86_1_201_a-EFAUCGZA4GiiJzrPF2Ko0f5bV7IVns.jpeg',
    color: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/09484B47-6D79-4A3E-9592-DC2DA3694214_1_201_a-v2N8UXXtfZelqKLdLmnZWGboCvDhfU.jpeg',
    alt: 'CORIMA chef cooking on wood-fire grill',
  },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [menuScrollTarget, setMenuScrollTarget] = useState<'a-la-carte' | 'cocktail' | 'wine' | undefined>(undefined)
  const [isDiningOpen, setIsDiningOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [aboutImgIndex, setAboutImgIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 8)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-white flex-1" style={{ backgroundColor: '#1f1c18' }}>
      <MenuOverlay isOpen={isMenuOverlayOpen} onClose={() => { setIsMenuOverlayOpen(false); setMenuScrollTarget(undefined) }} scrollToSection={menuScrollTarget} />
      <DiningOverlay
        isOpen={isDiningOpen}
        onClose={() => setIsDiningOpen(false)}
        onViewMenu={() => { setIsDiningOpen(false); setIsMenuOverlayOpen(true) }}
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
          {heroImages.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                objectPosition: index === 2 ? 'center 20%' : 'center',
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
          }}
        >
          <SiteNav
            aboutHref="#about"
            pressHref="#press"
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
            opacity: isDiningOpen ? 0 : 1,
            // Wrapper itself never blocks clicks; only the icon below opts back into pointer events.
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="flex items-center justify-between px-5 md:px-9 py-6">
            {/* Address — visible only while the hero is intersecting the viewport.
                Driven by IntersectionObserver on the hero ref below. */}
            <p
              className="tracking-wider text-white"
              style={{
                fontSize: '16px',
                opacity: heroVisible ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease',
                fontWeight: 400,
              }}
            >
              3 Allen St. NY 10002 &nbsp;&nbsp;&nbsp; Tuesday - Saturday &nbsp; 5:30PM - 10PM
            </p>
            {/* Persistent logo — stays white regardless of scroll */}
            <img
              src="/footer-logo.png"
              alt="CORIMA"
              className="w-6 h-6 object-contain ml-auto"
              style={{ pointerEvents: isDiningOpen ? 'none' : 'auto' }}
            />
          </div>
        </footer>
      </section>

      {/* About Section */}
      <section
        id="about"
          className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/about-bg-v5.jpeg)',
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
          className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 w-[140%] sm:w-[130%] md:w-[125%] lg:w-full"
          style={{
            maxWidth: '1200px',
            zIndex: 0,
            // Combine vertical (bottom fade) and horizontal (left/right fade) masks; both must be visible -> use intersect by composing two gradients.
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%)',
            WebkitMaskComposite: 'source-in',
            maskComposite: 'intersect',
          }}
        >
          <img
            src="/about-bg.jpg"
            alt=""
            className="block w-full h-auto"
          />
        </div>
        {/* Headline pinned to left gutter — fills the viewport so the photo + headline act as a hero */}
        <div className="relative py-16 min-h-screen flex items-center" style={{ zIndex: 1 }}>
          <img
            src="/hero-text-v3.svg?v=white"
            alt='Corima (ko-ree-ma) is a cornerstone principle of Tarahumara / Raramuri society. Literally translated, it means "circle of sharing." In Tarahumara culture, it is the community, rather than the individual, the owner of pretty much everything.'
            className="block w-full h-auto relative"
            style={{ maxWidth: '1100px', zIndex: 1 }}
          />
        </div>

        {/*
          Our Story + Ethos — built on the locked grid spec:
            outer margin 36px (inline padding on the wrapper)
            12 columns, 20px gutter (grid-cols-12 gap-5)
            vertical placement in absolute pixels
        */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ===== OUR STORY ===== */}
          <section style={{ paddingTop: '160px' }}>
            {/* Section label — col 2 */}
            <div className="grid grid-cols-12 gap-5">
              <div className="col-start-2 col-end-4">
                <p style={{ fontSize: '20px', fontWeight: 400, color: '#CBCBCB', letterSpacing: '0.01em' }}>Our Story</p>
              </div>
            </div>

            {/* Staircase headline (SVG) — col 2 → right edge of col 8, 50px below label */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '50px' }}>
              <div className="col-start-2 col-end-9">
                <img
                  src="/our-story-headline.svg"
                  alt="Working with the roughness, yet simplicity of the desert as inspiration, Corima takes what is familiar to some and makes it sensible to all."
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Counter image (cols 3–8, right edge aligned with SVG above) + intro copy (cols 9–11) */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '100px', alignItems: 'center' }}>
              <div className="col-start-3 col-end-9">
                <img
                  src="/hero-counter-service.jpeg"
                  alt="Corima chef's counter during service — diners watching the line"
                  className="w-full h-auto block"
                />
              </div>
              <div className="col-start-9 col-end-12">
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB' }}>
                  The concept of Corima was born out of a gap Chef Caballero identified in the Mexican culinary landscape expressed in New York City.
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB', marginTop: '28px' }}>
                  Until now, &ldquo;Mexican cuisine&rdquo; in NYC has been limited to specific regions and types of food. Chef Caballero draws from the monumental perception and never-ending exploration of Mexican land and distills it into a type of Mexican cuisine that has yet to be expressed in this country.
                </p>
              </div>
            </div>

            {/* Chef bio — cols 4–7, indented */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '100px' }}>
              <div className="col-start-4 col-end-8" style={{ paddingRight: 'calc((100% - 60px) / 8 + 10px)' }}>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB' }}>
                  Chef Fidel Caballero was raised between Ciudad Ju&aacute;rez, Chihuahua, and El Paso, Texas, shaped by the rhythms, flavors, and realities of the border. That perspective continues to guide his cooking.
                </p>
              </div>
            </div>

            {/* Bottom paired images — cols 6–11, equal width, equal height squares */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '100px', alignItems: 'stretch' }}>
              <div className="col-start-6 col-end-9" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2781%204-AhmiUqGR3K9yrP5KneeCueYQcdD5aE.png"
                  alt="Chef Fidel Caballero plating in the kitchen"
                  className="w-full h-full block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-start-9 col-end-12" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src="/hero-interior-brick.jpeg"
                  alt="Corima dining room — exposed brick wall at low light"
                  className="w-full h-full block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>

          {/* ===== ETHOS ===== */}
          <section style={{ paddingTop: '120px' }}>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-start-2 col-end-4">
                <p style={{ fontSize: '20px', fontWeight: 400, color: '#CBCBCB', letterSpacing: '0.01em' }}>Ethos</p>
              </div>
            </div>

            {/* Staircase headline (SVG) — col 2 → right edge of col 6, 50px below label */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '50px' }}>
              <div className="col-start-2 col-end-7">
                <img
                  src="/ethos-headline.svg"
                  alt="Circle of Sharing does not just apply to our cuisine, it's a living exchange between our kitchen, our guests, farmers, foragers, and artisans who shape how we cook."
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Body copy (cols 4–7) + large dining-nook image (cols 7–13, full to last column edge), 60px below ethos SVG */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '60px', alignItems: 'start' }}>
              <div className="col-start-3 col-end-6" style={{ paddingTop: '230px' }}>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB' }}>
                  Seasonal sourcing, whole-product utilization, and long-term partnerships with responsible producers allow us to honor ingredients fully while creating a resilient, forward-thinking kitchen.
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB', marginTop: '28px' }}>
                  We are deeply indebted to our purveyors who ensure we have pristine product throughout the seasons.
                </p>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#CBCBCB', marginTop: '80px' }}>
                  Within its first year, Corima earned a Michelin star and was named one of Bon App&eacute;tit&apos;s Best New Restaurants of 2024. Chef Fidel Caballero was also named a James Beard Best Chef finalist in 2026. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
                </p>
              </div>
              <div className="col-start-7 col-end-13" style={{ paddingRight: '36px' }}>
                <img
                  src="/hero-dining-nook.jpeg"
                  alt="Corima dining nook — wooden chairs and table against slatted wainscoting"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Bottom kitchen action image — cols 3–9 */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '140px' }}>
              <div className="col-start-3 col-end-9">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF0787%202-BbH3Aw6sCJRs6RYSsDvMKhThMDXGav.png"
                  alt="Corima open kitchen during service — Chef Caballero plating with the line and chef's counter behind"
                  className="w-full h-auto block"
                />
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
          backgroundImage: 'url(/main-bg.jpeg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
          width: '100%',
          // Left padding matches the CORIMA wordmark (48px) at the top of the page.
          // Bottom padding is tuned so the row of links is vertically centered with
          // the fixed white footer icon (24px tall, 24px from viewport bottom -> center at 36px from bottom).
          // Content line-height is ~16px, so paddingBottom = 36 - 8 = 28px.
          // Right padding leaves room for the persistent fixed white logo
          // (24px icon + 48px right offset = ~72px reserved, plus ~32px gap).
          padding: '40px 144px 24px 48px',
        }}
      >
        <div className="flex w-full items-center gap-8 justify-between">
          <p className="tracking-wider" style={{ fontSize: '14px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}>3 Allen St. NY 10002</p>
          <p className="tracking-wider" style={{ fontSize: '14px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}>Tuesday - Saturday &nbsp; 5:30PM - 10PM</p>
          <a
            href="mailto:info@corimanyc.com"
            className="nav-link tracking-wider"
            style={{ fontSize: '14px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}
          >
            Contact
          </a>
          <a
            href="https://www.instagram.com/corima.nyc/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link tracking-wider"
            style={{ fontSize: '14px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}
          >
            Instagram
          </a>
          <span
            className="nav-link tracking-wider"
            style={{
              fontSize: '14px',
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
              href="https://open.spotify.com/playlist/31bCtQZ5iDh34anUn9elz0"
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
                width: '380px',
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
              <iframe
                data-testid="embed-iframe"
                title="Corima Spotify playlist"
                style={{ borderRadius: '12px', display: 'block', width: '100%', height: '352px', border: 0 }}
                src="https://open.spotify.com/embed/playlist/31bCtQZ5iDh34anUn9elz0?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </span>
        </div>
      </footer>
    </div>
  )
}
