'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MenuOverlay from '@/components/menu-overlay'

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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black text-white">
      <MenuOverlay isOpen={isMenuOverlayOpen} onClose={() => setIsMenuOverlayOpen(false)} />
      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden">
        {/* Hero Background — full bleed carousel */}
        <div className="absolute inset-0 w-full h-full">
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

        {/* Header/Navigation */}
        <header className="relative z-40">
          <nav className="flex items-center justify-between" style={{ padding: '24px' }}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 w-24 h-auto">
            <img 
              src="/logo.svg" 
              alt="CORIMA" 
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm uppercase tracking-wider hover:opacity-70 transition">About</Link>
            <Link href="#reservations" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Reservations</Link>
            <Link href="#dining" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Dining</Link>
            <Link href="#events" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Events</Link>
            <Link href="#press" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Press</Link>
            <Link href="#shop" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Shop</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
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
              <Link href="#dining" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Dining</Link>
              <Link href="#events" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Events</Link>
              <Link href="#press" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Press</Link>
              <Link href="#shop" className="text-sm uppercase tracking-wider hover:opacity-70 transition">Shop</Link>
            </div>
          </div>
        )}
      </header>

        {/* Footer — positioned absolutely at bottom */}
        <footer className="absolute bottom-0 left-0 right-0 z-40">
          <div style={{ padding: '24px' }} className="flex items-center justify-between">
            {/* Location and Hours */}
            <p className="text-xs md:text-sm tracking-widest uppercase text-white">
              {'3 ALLEN ST NY 10002   TUESDAY -  SATURDAY  5:30PM - 10PM'}
            </p>

            {/* Footer Logo */}
            <img 
              src="/footer-logo.png" 
              alt="CORIMA" 
              className="w-6 h-6 object-contain"
            />
          </div>
        </footer>
      </section>

      {/* About Section */}
      <section id="about" className="bg-[#3d3a36] text-white" style={{ padding: '56px 24px 48px 24px' }}>
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

            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B6767198-A11A-4F32-8C93-F2AA3ACA83CA%202-crfmYdcYcAwg7v0h4lBf6ZfINvBH7E.png"
              alt="Chef preparing service with traditional pottery"
              width="905"
              height="742"
              className="object-cover w-full"
              style={{ maxWidth: '905px', height: 'auto', aspectRatio: '905/742' }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
