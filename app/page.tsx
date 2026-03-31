'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'
import DiningOverlay from '@/components/dining-overlay'

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
      setIsAtTop(window.scrollY < window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="text-white" style={{ backgroundColor: '#1f1c18' }}>
      <MenuOverlay isOpen={isMenuOverlayOpen} onClose={() => setIsMenuOverlayOpen(false)} />
      <DiningOverlay
        isOpen={isDiningOpen}
        onClose={() => setIsDiningOpen(false)}
        onViewMenu={() => { setIsDiningOpen(false); setIsMenuOverlayOpen(true) }}
      />
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

        {/* Header/Navigation — hidden when scrolled or dining overlay open */}
        <header
          className="fixed top-0 left-0 right-0 z-40 transition-opacity duration-500"
          style={{ opacity: isAtTop && !isDiningOpen ? 1 : 0, pointerEvents: isAtTop && !isDiningOpen ? 'all' : 'none' }}
        >
          <nav className="flex items-center justify-between" style={{ padding: '24px' }}>
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 w-24 h-auto">
              <img src="/logo.svg" alt="CORIMA" className="w-full h-full object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-sm uppercase tracking-wider hover:opacity-70 transition">About</Link>
              <Link href="#reservations" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Reservations</Link>
              <button onClick={() => setIsDiningOpen(true)} className="text-sm uppercase tracking-wider hover:opacity-70 transition text-white text-left">Dining</button>
              <Link href="#events" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Events</Link>
              <Link href="#press" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Press</Link>
              <Link href="#shop" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Shop</Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden flex flex-col gap-1.5" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black border-t border-gray-800">
              <div className="px-6 py-4 flex flex-col gap-4">
                <Link href="#about" className="text-sm uppercase tracking-wider hover:opacity-70 transition">About</Link>
                <Link href="#reservations" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Reservations</Link>
                <button onClick={() => setIsDiningOpen(true)} className="text-sm uppercase tracking-wider hover:opacity-70 transition text-white text-left">Dining</button>
                <Link href="#events" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Events</Link>
                <Link href="#press" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Press</Link>
                <Link href="#shop" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Shop</Link>
              </div>
            </div>
          )}
        </header>

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
      <section id="about" className="text-white" style={{ backgroundColor: '#1f1c18', padding: '56px 24px 48px 24px' }}>
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl leading-snug max-w-2xl" style={{ marginTop: '100px', marginBottom: '100px' }}>
          Translating to &ldquo;circle of sharing,&rdquo; Corima (ko-ree-ma) is rooted in Northern Mexico and expressed in New York through tradition defined by experience and shaped by place.
        </h2>

        {/* Two Column Layout — 36px gap, 40:60 split */}
        <div className="flex flex-col lg:flex-row" style={{ gap: '36px' }}>
          {/* Left Column - Tasting Menu */}
          <div style={{ flex: '0 0 calc(40% - 18px)' }} className="flex flex-col">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5248%201-nkuaJEhn3Fi6iA6AWdhayUKFF2iNDH.png"
              alt="Tasting menu dish"
              className="object-cover w-full"
              style={{ marginBottom: '64px' }}
            />

            <h3 className="uppercase tracking-widest mb-4" style={{ fontSize: '16px' }}>Tasting Menu</h3>

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

          {/* Right Column - A La Carte */}
          <div style={{ flex: '0 0 calc(60% - 18px)' }} className="flex flex-col">
            <h3 className="uppercase tracking-widest mb-4" style={{ fontSize: '16px' }}>A La Carte</h3>

            <p className="leading-relaxed mb-3" style={{ fontSize: '16px' }}>
              At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
            </p>

            <p className="leading-relaxed mb-5" style={{ fontSize: '16px' }}>
              The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
            </p>

            <button
              onClick={() => setIsMenuOverlayOpen(true)}
              className="hover:opacity-70 transition inline-block text-left"
              style={{ marginBottom: '64px', fontSize: '16px', color: 'white' }}
            >
              <span className="mr-2">&bull;</span>View Menu
            </button>

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
          </div>
        </div>
      </section>
      {/* Corima Story Section */}
      <section style={{ backgroundColor: '#d1d1d1', padding: '100px 0' }}>
        <div style={{ position: 'relative', height: '650px' }}>

          {/* Left — large quote with absolute positioning */}
          <div style={{ position: 'absolute', top: '0', left: '240px', width: '45%', paddingRight: '48px' }}>
            <h2
              className="font-light leading-tight text-pretty"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', fontWeight: '300', color: '#000' }}
            >
              The name Corima comes from the Tarahumara word for &ldquo;circle of sharing.&rdquo;
            </h2>
          </div>

          {/* Center — two body paragraphs, directly under the editorial quote */}
          <div style={{ position: 'absolute', top: '320px', left: 'calc(240px + 45% - 413px)', width: '365px', paddingRight: '48px' }}>
            <p className="leading-relaxed mb-10" style={{ fontSize: '1.2vw', letterSpacing: '-0.01em', color: '#000' }}>
              The restaurant is built around gathering people at the table and sharing the culinary traditions of Northern Mexico&mdash;particularly Sonora and Chihuahua, regions rarely represented in New York City.
            </p>
            <p className="leading-relaxed" style={{ fontSize: '1.2vw', letterSpacing: '-0.01em', color: '#000' }}>
              Chef Fidel Caballero was raised between Ciudad Ju&aacute;rez and El Paso, where the food of the border region continues to shape his cooking. His perspective was further developed in the Basque Country at Mart&iacute;n Berasategui and in New York as sous chef at Contra, experiences that refined his approach while keeping it grounded in tradition.
            </p>
          </div>

          {/* Right — tall portrait photo */}
          <div style={{ position: 'absolute', top: '40px', right: '60px', width: '274px', height: '365px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2781%204-AhmiUqGR3K9yrP5KneeCueYQcdD5aE.png"
              alt="Chef Fidel Caballero at Corima"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '3/4' }}
            />
          </div>

        </div>
      </section>
      {/* Cooking Philosophy Section */}
      <section style={{ backgroundColor: '#d1d1d1', padding: '80px 120px', position: 'relative', minHeight: '650px' }}>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '240px 1fr 420px', gap: '60px', alignItems: 'start' }}>

          {/* Left — small plated dish image */}
          <div style={{ width: '240px', height: '240px', marginTop: '80px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CorimaNov24_JovaniDemetrie_22_Original%201-oG0EDkxE2vNa7KNJ0WDNsyohkWo3nQ.png"
              alt="Plated dish at Corima"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center — SVG text graphics */}
          <div style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20cooking%20is%20guided%20by%20a%20broad%20Mexican%20pantry%2C-hz1gSefWftkAEyTg0g3y7iQCFtZLtf.svg"
              alt="The cooking is guided by a broad Mexican pantry,"
              style={{ width: '100%', maxWidth: '440px', height: 'auto' }}
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shaped%20in%20practice%20by%20the%20seasons%20and%20conditions%20of%20the%20Northeast.-uVDOBJpgOEi1oNID5uBSA7NqL02VSR.svg"
              alt="shaped in practice by the seasons and conditions of the Northeast."
              style={{ width: '100%', maxWidth: '520px', height: 'auto' }}
            />
          </div>

          {/* Right — larger chef cooking image */}
          <div style={{ width: '420px', height: '320px' }}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/622368293_18070748996628283_84941654303889225_n%20%281%29%205-jj4VRg7UvADc1NfSYvY494CRI8A1g8.png"
              alt="Chef cooking at Corima"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* A La Carte Section */}
      <section style={{ backgroundColor: '#d1d1d1', padding: '120px 280px' }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 className="font-medium mb-8" style={{ fontSize: '1.8vw', letterSpacing: '-0.02em', color: '#000' }}>
            À La Carte
          </h2>
          <p className="leading-relaxed mb-6" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
            Offered alongside our tasting menu, the &agrave; la carte selection provides a more open, self-directed way to experience Corima. Rather than a structured progression, this menu invites guests to explore individual dishes at their own pace.
          </p>
          <p className="leading-relaxed" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
            While the selection evolves over time, the focus here is on immediacy and choice, allowing each dish to stand on its own while reflecting the same perspective as our tasting menu. Our beverage program follows a similar sensibility, with a focused selection of Mexican spirits, particularly sotol, alongside wines chosen to complement a range of dishes.
          </p>
        </div>
      </section>
    </div>
  )
}
