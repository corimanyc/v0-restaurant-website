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
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 1070 302" style={{ enableBackground: 'new 0 0 1070 302' }} xml:space="pRESERVATIONS">
              <style type="text/css">
                {`.st0{fill:#FFFFFF;}`}
              </style>
              <g>
                <path className="st0" d="M294.5,286.1c-39.7,0-75.7-14-101.6-39.4c-25.3-24.9-39.3-58.9-39.3-95.6c0-37.3,13.1-71.2,36.7-95.4
                  c25.5-26,61.5-39.7,104.2-39.7c42.7,0,78.7,13.7,104.2,39.7c23.7,24.2,36.7,58,36.7,95.4c0,36.8-14,70.7-39.3,95.6
                  C370.2,272.1,334.1,286.1,294.5,286.1 M294.5,56.4c-31.6,0-57.6,9.5-75.3,27.6c-16.5,16.8-25.2,40-25.2,67
                  c0,54.8,42.2,94.6,100.4,94.6c58.2,0,100.4-39.8,100.4-94.6c0-27.1-8.7-50.2-25.2-67C352,65.9,326,56.4,294.5,56.4"/>
                <rect x="619.3" y="21.5" className="st0" width="40.5" height="259.2"/>
                <path className="st0" d="M73.7,286.1c-33.8,0-61.3-27.5-61.3-61.3V77.2c0-33.8,27.5-61.3,61.3-61.3c33.8,0,61.3,27.5,61.3,61.3v43.3
                  H94.5V77.2c0-11.5-9.3-20.8-20.8-20.8c-11.5,0-20.8,9.3-20.8,20.8v147.7c0,11.5,9.3,20.8,20.8,20.8c11.5,0,20.8-9.3,20.8-20.8
                  v-63.9H135v63.9C135,258.6,107.5,286.1,73.7,286.1"/>
                <path className="st0" d="M1016.5,280.7h41.1l-44.1-259.2H985h-12.6H944l-44.1,259.2h41.1L961.3,161h34.9L1016.5,280.7z M968.2,120.5
                  l10.6-62l10.6,62H968.2z"/>
                <polygon className="st0" points="835.3,21.5 835.3,21.5 831.3,21.5 788,200.7 744.7,21.5 740.7,21.5 740.7,21.5 700.2,21.5 
                  700.2,280.7 740.7,280.7 740.7,177.1 765.7,280.7 768.7,280.7 807.3,280.7 810.3,280.7 835.3,177.1 835.3,280.7 875.8,280.7 
                  875.8,21.5 	"/>
                <path className="st0" d="M545.9,280.7h43l-45.7-126.1c21.6-10.7,35.5-34.2,35.5-63.4c0-38.5-31.3-69.7-69.7-69.7h-44.8v0h-10.3v259.2
                  h40.5V160.9h8.1L545.9,280.7z M494.4,61.9H509c16.1,0,29.3,13.1,29.3,29.3c0,27.9-19.1,29.3-22.9,29.3h-21V61.9z"/>
              </g>
            </svg>
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

          {/* Decorative snowflake icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="14" y1="2" x2="14" y2="26" />
            <line x1="2" y1="14" x2="26" y2="14" />
            <line x1="5.5" y1="5.5" x2="22.5" y2="22.5" />
            <line x1="22.5" y1="5.5" x2="5.5" y2="22.5" />
            <line x1="14" y1="2" x2="10" y2="6" />
            <line x1="14" y1="2" x2="18" y2="6" />
            <line x1="14" y1="26" x2="10" y2="22" />
            <line x1="14" y1="26" x2="18" y2="22" />
            <line x1="2" y1="14" x2="6" y2="10" />
            <line x1="2" y1="14" x2="6" y2="18" />
            <line x1="26" y1="14" x2="22" y2="10" />
            <line x1="26" y1="14" x2="22" y2="18" />
          </svg>
        </div>
      </footer>
    </div>
  )
}
