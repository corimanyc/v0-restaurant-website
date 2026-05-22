'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'

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
      {/* Persistent logo when dining overlay is open */}
      <div
        className="fixed top-0 left-0 transition-opacity duration-500"
        style={{
          padding: '24px 48px',
          zIndex: 50,
          opacity: isDiningOpen ? 1 : 0,
          pointerEvents: isDiningOpen ? 'all' : 'none',
        }}
      >
        <Link href="/" className="flex-shrink-0 w-24 h-auto block">
          <img src="/logo.svg" alt="CORIMA" className="w-full h-full object-contain" />
        </Link>
      </div>
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

        {/* Header/Navigation — fixed, hidden only when dining overlay open */}
        <header
          className="fixed top-0 left-0 right-0"
          style={{
            zIndex: 46,
            opacity: isDiningOpen ? 0 : 1,
            pointerEvents: isDiningOpen ? 'none' : 'all',
            color: '#FFFFFF',
            transition: 'opacity 0.5s ease',
          }}
        >
          <nav className="relative flex items-center justify-between px-5 md:px-12 pt-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 h-auto" style={{ width: '88px' }}>
              <img
                src="/logo.svg"
                alt="CORIMA"
                className="w-full h-full object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#about"
                className="nav-link tracking-wider"
                style={{ color: 'inherit', fontSize: '15px' }}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                About
              </Link>
              <Link href="https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '15px' }}>Reservations</Link>
              <button onClick={() => setIsDiningOpen(true)} className="nav-link tracking-wider text-left" style={{ color: 'inherit', background: 'transparent', border: 'none', fontSize: '15px', fontFamily: 'inherit', lineHeight: 'inherit', cursor: 'pointer' }}>Dining</button>
              <Link href="/events" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '15px' }}>Events</Link>
              <Link href="#press" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '15px' }}>Press</Link>
              <Link href="https://corimanyc.bigcartel.com" target="_blank" rel="noopener noreferrer" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '15px' }}>Shop</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
              <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
              <div className="w-6 h-0.5" style={{ backgroundColor: '#CBCBCB' }}></div>
            </button>
          </nav>

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
          <div className="flex items-center justify-between px-5 md:px-12 py-6">
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
        className="px-5 md:px-12 relative overflow-hidden"
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
        <div style={{ paddingLeft: '36px', paddingRight: '36px', position: 'relative', zIndex: 1 }}>

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

            {/* Bottom paired images — equal width, equal height, cols 5–12, 100px below text above */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '100px', alignItems: 'stretch' }}>
              <div className="col-start-5 col-end-9" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2781%204-AhmiUqGR3K9yrP5KneeCueYQcdD5aE.png"
                  alt="Chef Fidel Caballero plating in the kitchen"
                  className="w-full h-full block"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-start-9 col-end-13" style={{ aspectRatio: '1 / 1' }}>
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
          <section style={{ paddingTop: '200px' }}>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-start-2 col-end-4">
                <p style={{ fontSize: '20px', fontWeight: 400, color: '#CBCBCB', letterSpacing: '0.01em' }}>Ethos</p>
              </div>
            </div>

            {/* Staircase headline */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '120px' }}>
              <div
                className="col-start-2 col-end-9"
                style={{
                  fontSize: '32px',
                  lineHeight: 1.35,
                  color: '#E8E8E8',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                <div>Circle of Sharing does not just</div>
                <div>apply to our cuisine, it&apos;s a living</div>
                <div>exchange between</div>
                <div style={{ paddingLeft: '20%' }}>our kitchen, our guests, farmers,</div>
                <div style={{ paddingLeft: '30%' }}>foragers, and artisans who</div>
                <div style={{ paddingLeft: '40%' }}>shape how we cook.</div>
              </div>
            </div>

            {/* Body copy (cols 4–7) + large dining-nook image (cols 7–13) */}
            <div className="grid grid-cols-12 gap-5" style={{ marginTop: '80px', alignItems: 'start' }}>
              <div className="col-start-4 col-end-7" style={{ paddingTop: '220px' }}>
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
              <div className="col-start-7 col-end-13">
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/622368293_18070748996628283_84941654303889225_n%20%281%29%205-jj4VRg7UvADc1NfSYvY494CRI8A1g8.png"
                  alt="Corima kitchen line during service"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </section>

        </div>
      </section>
      {/* End dark section */}
      </div>

      {/* About Section — 12-col desktop grid, single-col mobile */}
      <section
        style={{
          backgroundColor: '#1a1a1a',
          backgroundImage: 'url(/main-bg.jpeg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
        }}
        className="py-16 lg:py-24"
      >

        <div className="px-5 md:px-20 mb-10">
          <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#CBCBCB' }}>OUR STORY</h2>
        </div>

        {/* Part 1: Corima Story */}
        <div className="grid-12 mb-16 lg:mb-24" style={{ alignItems: 'start' }}>
          {/* Corima SVG — desktop: cols 3–7 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '3 / 7' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20name%20Corima%20comes%20from%20the%20Tarahumara%20word%20for%20%E2%80%9Ccircle%20of%20sharing.%E2%80%9D-YCtwkAUM4TNjBZdGk8w5lgYn8QoMOA.svg"
              alt="The name Corima comes from the Tarahumara word for circle of sharing."
              style={{ width: '100%', height: 'auto', filter: 'invert(1)' }}
            />
          </div>
          {/* Portrait image — desktop: cols 9–12, rows 1–3 | mobile: full width after SVG */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '9 / 12', gridRow: '1 / 3' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2781%204-AhmiUqGR3K9yrP5KneeCueYQcdD5aE.png"
              alt="Chef Fidel Caballero at Corima"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
          {/* Body text — desktop: cols 4–7, row 2 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '4 / 7', marginTop: '60px' }}>
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              The restaurant is built around gathering people at the table and sharing the culinary traditions of Northern Mexico&mdash;particularly Sonora and Chihuahua, regions rarely represented in New York City.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              Chef Fidel Caballero was raised between Ciudad Ju&aacute;rez and El Paso, where the food of the border region continues to shape his cooking. His perspective was further developed in the Basque Country at Mart&iacute;n Berasategui and in New York as sous chef at Contra, experiences that refined his approach while keeping it grounded in tradition.
            </p>
          </div>
        </div>

        {/* Part 2: Cooking Philosophy */}
        <div className="grid-12 mb-16 lg:mb-24" style={{ marginTop: '-100px' }}>
          {/* Dish image — desktop: cols 2–4 | mobile: hidden (chef is sufficient) */}
          <div className="hidden lg:block" style={{ gridColumn: '2 / 4', gridRow: '1', alignSelf: 'center' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CorimaNov24_JovaniDemetrie_22_Original%201-oG0EDkxE2vNa7KNJ0WDNsyohkWo3nQ.png"
              alt="Plated dish at Corima"
              className="w-full object-cover"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
          {/* Chef cooking image — desktop: cols 8–11 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '8 / 11', gridRow: '1', alignSelf: 'start', marginTop: '100px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/622368293_18070748996628283_84941654303889225_n%20%281%29%205-jj4VRg7UvADc1NfSYvY494CRI8A1g8.png"
              alt="Chef cooking at Corima"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
          {/* SVG line 1 — desktop: cols 2–6 | mobile: full width */}
          <div className="mb-2 lg:mb-0" style={{ gridColumn: '2 / 6', gridRow: '2', paddingTop: '32px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20cooking%20is%20guided%20by%20a%20broad%20Mexican%20pantry%2C-EDZiNUXnZAkOvRkrUo8JtlYDLW1vZZ.svg"
              alt="The cooking is guided by a broad Mexican pantry,"
              style={{ width: '100%', height: 'auto', filter: 'invert(1)' }}
            />
          </div>
          {/* SVG line 2 — desktop: cols 5–9 indented | mobile: full width with left indent */}
          <div style={{ gridColumn: '5 / 9', gridRow: '3', paddingTop: '16px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shaped%20in%20practice%20by%20the%20seasons%20and%20conditions%20of%20the%20Northeast.-VPG1UrRBB5QVCjKBQNQw76eKsckRFc.svg"
              alt="shaped in practice by the seasons and conditions of the Northeast."
              style={{ width: '100%', height: 'auto', filter: 'invert(1)' }}
            />
          </div>
        </div>

        {/* Part 3: Philosophy text + hand image */}
        <div className="grid-12 mb-16 lg:mb-24" style={{ alignItems: 'start' }}>
          {/* Body text — desktop: cols 5–8 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '5 / 8' }}>
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              The menu follows a steady rhythm of change, adapting traditional foundations to reflect what is available at a given moment. This approach reflects what Fidel Caballero describes as Progressive Mexican cooking, rooted in tradition while remaining forward-looking. It draws from a broad Mexican pantry alongside ingredients from the Northeast. Familiar preparations shift over time, adjusting to seasonality while maintaining a clear sense of origin.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              The beverage program follows a similar direction, with a focus on Northern Mexico&apos;s distilling traditions and a particular emphasis on sotol from the Chihuahuan Desert. Selections are made with attention to origin and production, supporting a program that aligns closely with the structure of the menu.
            </p>
          </div>
          {/* Hand image — desktop: cols 9–12 | mobile: full width */}
          <div style={{ gridColumn: '9 / 12', gridRow: '1', transform: 'translateX(calc(50% / 3))' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CorimaDec24_JovaniDemetrie_67_Original%203-IRGsT5HtQAQEdo07xOECpKYlsPUWqx.png"
              alt="Tattooed hand with knife"
              className="w-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>
        </div>

        {/* Part 4: Sharing Philosophy SVGs */}
        <div className="grid-12 mb-16 lg:mb-24">
          {/* First SVG — desktop: cols 2–7 | mobile: full width */}
          <div className="mb-3 lg:mb-0" style={{ gridColumn: '2 / 7', gridRow: '1' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20idea%20of%20sharing%20extends%20beyond%20the%20dining%20room%2C%20shaping%20the%20relationships%20that%20support%20the%20kitchen%E2%80%99s%20work%2C-hB7zhSwk303icgfIRSHCgAX4r63jWa.svg"
              alt="The idea of sharing extends beyond the dining room, shaping the relationships that support the kitchen's work,"
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'invert(1)' }}
            />
          </div>
          {/* Second SVG — desktop: cols 4–8 indented | mobile: full width with left indent */}
          <div style={{ gridColumn: '4 / 8', gridRow: '2', marginTop: '12px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/from%20farmers%20and%20foragers%20to%20artisans%20and%20guests.-3VLH1UA8tsfp7qWlJNGSzjkYbLbVJM.svg"
              alt="from farmers and foragers to artisans and guests."
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'invert(1)' }}
            />
          </div>
        </div>

        {/* Part 5: Producer Partnership & Recognition */}
        <div className="grid-12" style={{ alignItems: 'start' }}>
          {/* Kitchen image — desktop: cols 3–6 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '3 / 6' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2818%202-61XN6Jf0t53SCva3TBf63oJO510MRq.jpg"
              alt="Two chefs in the kitchen"
              className="w-full object-cover"
              style={{ aspectRatio: '1/1' }}
            />
          </div>
          {/* Text — desktop: cols 7–10 | mobile: full width */}
          <div style={{ gridColumn: '7 / 10' }}>
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              Corima works closely with farmers, foragers, and producers who follow seasonal growing practices and responsible stewardship. These relationships shape the menu as much as the kitchen itself, guiding how ingredients are sourced, used, and understood over time.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#CBCBCB' }}>
              Within its first year, Corima earned a Michelin star, was named one of Bon Appétit&apos;s Best New Restaurants of 2024, and received a James Beard Award nomination. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
            </p>
          </div>
        </div>

      </section>

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
          <a
            href="#"
            className="nav-link tracking-wider"
            style={{ fontSize: '14px', color: '#FFFFFF', margin: '0', fontWeight: 400 }}
          >
            Spotify
          </a>
        </div>
      </footer>
    </div>
  )
}
