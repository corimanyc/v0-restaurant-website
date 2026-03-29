'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      {/* Hero Background Image — full bleed */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5160%202-9rUNzC6kmRQxuPNwa5oZORQycZa9Nr.png"
          alt="CORIMA fine dining — a dry-aged cut of beef presented tableside"
          className="w-full h-full object-cover"
        />
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
            3 ALLEN ST NY 10002&nbsp;&nbsp;&nbsp;TUESDAY -&nbsp; SATURDAY&nbsp; 5:30PM - 10PM
          </p>

          {/* Footer Logo */}
          <img 
            src="/footer-logo.png" 
            alt="CORIMA" 
            className="w-6 h-6 object-contain"
          />
        </div>
      </footer>
    </div>
  )
}
