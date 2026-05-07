'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'
import MobileNav from '@/components/mobile-nav'

const heroImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5160%202-9rUNzC6kmRQxuPNwa5oZORQycZa9Nr.png',
    alt: 'CORIMA fine dining — a dry-aged cut of beef presented tableside',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23961C38-CBF4-4307-AC90-345364EE350F_1_201_a-SFVhjEpDnwUKeJfiFk7bZkfnLc0ZV6.jpeg',
    alt: 'CORIMA kitchen — 9:34 PM service in progress',
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

  const [isAtTop, setIsAtTop] = useState(true)

  const prevAboutImg = () => setAboutImgIndex((i) => (i - 1 + aboutSectionImages.length) % aboutSectionImages.length)
  const nextAboutImg = () => setAboutImgIndex((i) => (i + 1) % aboutSectionImages.length)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Switch when the hero (full viewport) scrolls past the nav line (~80px)
      setIsAtTop(window.scrollY < window.innerHeight - 80)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
          padding: '24px',
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
      <section className="relative h-screen overflow-hidden w-full">
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
                objectPosition: index === 1 ? 'center 20%' : 'center',
              }}
            />
          ))}
        </div>

        {/* Header/Navigation — fixed, hidden only when dining overlay open */}
        <header
          className="fixed top-0 left-0 right-0 z-40"
          style={{
            opacity: isDiningOpen ? 0 : 1,
            pointerEvents: isDiningOpen ? 'none' : 'all',
            color: isAtTop ? '#ffffff' : '#000000',
            transition: 'opacity 0.5s ease, color 0.2s ease',
          }}
        >
          <nav className="flex items-center justify-between" style={{ padding: '24px' }}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 w-24 h-auto">
              <img
                src="/logo.svg"
                alt="CORIMA"
                className="w-full h-full object-contain"
                style={{
                  filter: isAtTop ? 'none' : 'brightness(0)',
                  transition: 'filter 0.2s ease',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-sm uppercase tracking-wider hover:opacity-70" style={{ color: 'inherit', transition: 'opacity 0.2s ease' }}>About</Link>
              <Link href="#reservations" className="text-sm uppercase tracking-wider hover:opacity-70" style={{ color: 'inherit', transition: 'opacity 0.2s ease' }}>Reservations</Link>
              <button onClick={() => setIsDiningOpen(true)} className="text-sm uppercase tracking-wider hover:opacity-70 text-left" style={{ color: 'inherit', background: 'transparent', border: 'none', padding: 0, transition: 'opacity 0.2s ease' }}>Dining</button>
              <Link href="#events" className="text-sm uppercase tracking-wider hover:opacity-70" style={{ color: 'inherit', transition: 'opacity 0.2s ease' }}>Events</Link>
              <Link href="#press" className="text-sm uppercase tracking-wider hover:opacity-70" style={{ color: 'inherit', transition: 'opacity 0.2s ease' }}>Press</Link>
              <Link href="#shop" className="text-sm uppercase tracking-wider hover:opacity-70" style={{ color: 'inherit', transition: 'opacity 0.2s ease' }}>Shop</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-0.5 transition-colors duration-200" style={{ backgroundColor: isAtTop ? '#ffffff' : '#000000' }}></div>
              <div className="w-6 h-0.5 transition-colors duration-200" style={{ backgroundColor: isAtTop ? '#ffffff' : '#000000' }}></div>
              <div className="w-6 h-0.5 transition-colors duration-200" style={{ backgroundColor: isAtTop ? '#ffffff' : '#000000' }}></div>
            </button>
          </nav>

        </header>

        {/* Mobile Nav Overlay — slides in from top */}
        <MobileNav
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onMenuClick={() => setIsMenuOverlayOpen(true)}
        />

        {/* Footer — hidden when scrolled past hero or dining overlay open */}
        <footer
          className="fixed bottom-0 left-0 right-0 z-40 transition-opacity duration-500"
          style={{ opacity: isAtTop && !isDiningOpen ? 1 : 0, pointerEvents: isAtTop && !isDiningOpen ? 'all' : 'none' }}
        >
          <div style={{ padding: '24px' }} className="flex items-center justify-between">
            <p className="text-xs md:text-sm tracking-widest uppercase text-white">
              {'3 ALLEN ST NY 10002   TUESDAY -  SATURDAY  5:30PM - 10PM'}
            </p>
            <img src="/footer-logo.png" alt="CORIMA" className="w-6 h-6 object-contain" />
          </div>
        </footer>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-5 md:px-20"
        style={{
          backgroundImage: 'url(/about-bg.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '512px 512px',
          backgroundColor: '#e5e5e5',
          color: '#000000',
          paddingBottom: '100px',
        }}
      >
        {/* Headline */}
        <div className="flex items-center justify-center py-24 md:min-h-screen">
          <h2 className="leading-snug text-center mx-auto text-[26px] md:text-[48px]" style={{ fontWeight: 400, maxWidth: '1100px' }}>
            Northern Mexican cooking, carrying tradition into new forms through seasonality, craft, and lived experience. Corima was awarded its first Michelin Star in the 2025 Michelin Guide USA.
          </h2>
        </div>

        {/* Two Column Layout — 36px gap, 60:40 split */}
        <div className="flex flex-col lg:flex-row" style={{ gap: '100px' }}>
          {/* Left Column - A La Carte */}
          <div style={{ flex: '0 0 calc(60% - 50px)' }} className="flex flex-col order-2 lg:order-1">
            <div style={{ maxWidth: '80%' }}>
              <h3 className="uppercase tracking-widest mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>A La Carte</h3>

              <p className="leading-relaxed mb-3" style={{ fontSize: '16px' }}>
                Offered alongside our tasting menu, the &agrave; la carte selection provides a more open, self-directed way to experience Corima. Rather than a structured progression, this menu invites guests to explore individual dishes at their own pace.
              </p>

              <p className="leading-relaxed mb-5" style={{ fontSize: '16px' }}>
                While the selection evolves over time, the focus here is on immediacy and choice, allowing each dish to stand on its own while reflecting the same perspective as our tasting menu.
              </p>

              <button
                onClick={() => setIsMenuOverlayOpen(true)}
                className="hover:opacity-70 transition inline-block text-left"
                style={{ marginBottom: '64px', fontSize: '16px', color: '#000000' }}
              >
                <span className="mr-2">&bull;</span>View Menu
              </button>
            </div>

            <div 
              className="relative overflow-hidden w-full bg-black" 
              style={{ maxWidth: '905px', paddingBottom: '81.87%', position: 'relative' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Black & White Base Layer — always visible when current slide */}
              {aboutSectionImages.map((image, index) => (
                <img
                  key={`bw-${index}`}
                  src={image.bw}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full transition-opacity duration-700"
                  style={{ 
                    opacity: index === aboutImgIndex ? 1 : 0,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ))}
              
              {/* Color Overlay Layer — fades in on top of BW, no gap */}
              {aboutSectionImages.map((image, index) => (
                <img
                  key={`color-${index}`}
                  src={image.color}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full transition-opacity duration-700"
                  style={{ 
                    opacity: (index === aboutImgIndex && isHovering) ? 1 : 0,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ))}
              
              {/* Left half — previous image */}
              <button
                onClick={prevAboutImg}
                className="absolute left-0 top-0 h-full z-10"
                style={{ width: '50%', cursor: 'w-resize' }}
                aria-label="Previous image"
              />
              {/* Right half — next image */}
              <button
                onClick={nextAboutImg}
                className="absolute right-0 top-0 h-full z-10"
                style={{ width: '50%', cursor: 'e-resize' }}
                aria-label="Next image"
              />
            </div>

            {/* Wine section */}
            <div style={{ marginTop: '36px', display: 'flex', gap: '36px', alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 35%' }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EFCCDF8B-84EF-4A20-AC24-C05E7DB2DA6A_1_201_a-YYbbLS597HJP5xsPLqQGq2rHOwJi8K.jpeg"
                  alt="Wine bottle with lamp"
                  className="w-full object-cover"
                />
              </div>
              <div style={{ flex: '1' }}>
                <h3 className="uppercase tracking-widest mb-4" style={{ fontSize: '20px', fontWeight: 500, color: '#000000' }}>Wine</h3>
                <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#000000' }}>
                  The wine program focuses on producer-driven bottles from Mexico and Europe. Selections are guided by origin and production, forming a list that moves easily across the menu.
                </p>
                <p className="leading-relaxed mb-5" style={{ fontSize: '16px', color: '#000000' }}>
                  The list remains concise and continuously evolving, reflecting both availability and the direction of the kitchen.
                </p>
                <button
                  onClick={() => { setMenuScrollTarget('wine'); setIsMenuOverlayOpen(true) }}
                  className="hover:opacity-70 transition inline-block text-left"
                  style={{ fontSize: '16px', color: '#000000', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <span className="mr-2">&bull;</span>Our wine list
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Tasting Menu */}
          <div style={{ flex: '0 0 calc(40% - 50px)' }} className="flex flex-col order-1 lg:order-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5248%201-nkuaJEhn3Fi6iA6AWdhayUKFF2iNDH.png"
              alt="Tasting menu dish"
              className="object-cover w-full"
              style={{ marginBottom: '64px' }}
            />

            <h3 className="uppercase tracking-widest mb-4" style={{ fontSize: '20px', fontWeight: 500 }}>Tasting Menu</h3>

            <p className="leading-relaxed mb-3" style={{ fontSize: '16px' }}>
              At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
            </p>

            <p className="leading-relaxed mb-3" style={{ fontSize: '16px' }}>
              The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
            </p>

            <p className="leading-relaxed mb-6" style={{ fontSize: '16px' }}>
              We are unable to accommodate most allergies or dietary restrictions but please e-mail info@corimanyc.com and we will do our best to accommodate if possible.
            </p>

            <Link href="mailto:info@corimanyc.com" className="hover:opacity-70 transition" style={{ fontSize: '16px' }}>
              <span className="mr-2">&bull;</span>Contact
            </Link>
          </div>

        </div>
      </section>
      {/* End dark section */}
      </div>
      {/* About Section — 12-col desktop grid, single-col mobile */}
      <section style={{ backgroundColor: '#d1d1d1' }} className="py-16 lg:py-24">

        <div className="px-5 md:px-20 mb-10">
          <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#000000' }}>OUR STORY</h2>
        </div>

        {/* Part 1: Corima Story */}
        <div className="grid-12 mb-16 lg:mb-24" style={{ alignItems: 'start' }}>
          {/* Corima SVG — desktop: cols 3–7 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '3 / 7' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20name%20Corima%20comes%20from%20the%20Tarahumara%20word%20for%20%E2%80%9Ccircle%20of%20sharing.%E2%80%9D-YCtwkAUM4TNjBZdGk8w5lgYn8QoMOA.svg"
              alt="The name Corima comes from the Tarahumara word for circle of sharing."
              style={{ width: '100%', height: 'auto' }}
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
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
              The restaurant is built around gathering people at the table and sharing the culinary traditions of Northern Mexico&mdash;particularly Sonora and Chihuahua, regions rarely represented in New York City.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
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
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          {/* SVG line 2 — desktop: cols 5–9 indented | mobile: full width with left indent */}
          <div style={{ gridColumn: '5 / 9', gridRow: '3', paddingTop: '16px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shaped%20in%20practice%20by%20the%20seasons%20and%20conditions%20of%20the%20Northeast.-VPG1UrRBB5QVCjKBQNQw76eKsckRFc.svg"
              alt="shaped in practice by the seasons and conditions of the Northeast."
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Part 3: Philosophy text + hand image */}
        <div className="grid-12 mb-16 lg:mb-24" style={{ alignItems: 'start' }}>
          {/* Body text — desktop: cols 5–8 | mobile: full width */}
          <div className="mb-6 lg:mb-0" style={{ gridColumn: '5 / 8' }}>
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
              The menu follows a steady rhythm of change, adapting traditional foundations to reflect what is available at a given moment. This approach reflects what Fidel Caballero describes as Progressive Mexican cooking, rooted in tradition while remaining forward-looking. It draws from a broad Mexican pantry alongside ingredients from the Northeast. Familiar preparations shift over time, adjusting to seasonality while maintaining a clear sense of origin.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
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
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {/* Second SVG — desktop: cols 4–8 indented | mobile: full width with left indent */}
          <div style={{ gridColumn: '4 / 8', gridRow: '2', marginTop: '12px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/from%20farmers%20and%20foragers%20to%20artisans%20and%20guests.-3VLH1UA8tsfp7qWlJNGSzjkYbLbVJM.svg"
              alt="from farmers and foragers to artisans and guests."
              style={{ width: '100%', height: 'auto', display: 'block' }}
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
            <p className="leading-relaxed mb-6" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
              Corima works closely with farmers, foragers, and producers who follow seasonal growing practices and responsible stewardship. These relationships shape the menu as much as the kitchen itself, guiding how ingredients are sourced, used, and understood over time.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#000' }}>
              Within its first year, Corima earned a Michelin star, was named one of Bon Appétit&apos;s Best New Restaurants of 2024, and received a James Beard Award nomination. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
            </p>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#d1d1d1', width: '100%', padding: '40px 24px 12px 24px' }}>
        <div className="flex w-full items-center gap-8 justify-between">
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Contact</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>3 Allen St. NY 10002</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Tuesday - Saturday &nbsp; 5:30PM - 10PM</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Instagram</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Spotify</p>
          <img src="/footer-logo.png" alt="Corima" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'invert(1)' }} />
        </div>
      </footer>
    </div>
  )
}
