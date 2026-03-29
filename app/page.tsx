'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">CORIMA</h1>
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

      {/* Hero Section with Image */}
      <main className="pt-24 pb-20">
        <div className="relative w-full h-screen max-h-[800px] md:max-h-screen overflow-hidden bg-black">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled.png-Nga1NabiDtCfjekLZkyFBPcMe6DX6R.jpeg"
            alt="CORIMA fine dining"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </main>

      {/* Footer Information */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Location and Hours */}
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base tracking-wide">3 ALLEN ST NY 10002</p>
              <p className="text-sm md:text-base tracking-wide mt-2">TUESDAY - SATURDAY 5:30PM - 10PM</p>
            </div>

            {/* Decorative Icon */}
            <div className="flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-white"
              >
                <circle cx="16" cy="16" r="15" />
                <path d="M16 10v12M10 16h12" />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
