'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onMenuClick: () => void
  /** Anchors for the About/Press links. On the home page leave as "#about" /
   *  "#press"; on other pages (e.g. events) pass "/#about" / "/#press" so the
   *  link routes home first, where a hash handler scrolls to the section. */
  aboutHref?: string
  pressHref?: string
}

export default function MobileNav({ isOpen, onClose, onMenuClick, aboutHref = '#about', pressHref = '/press' }: MobileNavProps) {
  // Prevent body + html scroll when open
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (isOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      html.style.overflow = ''
      body.style.overflow = ''
    }
    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#3a3a3a',
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      {/* Top bar — logo + close */}
      <div className="flex items-center justify-between" style={{ padding: '24px' }}>
        <Link href="/" onClick={onClose}>
          <img src="/logo.svg" alt="CORIMA" style={{ width: '120px', height: 'auto', filter: 'brightness(0)' }} />
        </Link>
        <button
          onClick={onClose}
          className="nav-link text-black"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: '32px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1, background: 'transparent', border: 'none', padding: '0 0 4px 0', cursor: 'pointer' }}
          aria-label="Close menu"
        >
          X
        </button>
      </div>

      {/* Scrollable middle — nav links + Tasting Menu info */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {/* Nav links */}
        <nav className="flex flex-col" style={{ padding: '48px 24px 32px 24px', gap: '4px' }}>
          {[
            { label: 'About', href: aboutHref, onClick: onClose },
            { label: 'Reservations', href: 'https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2', onClick: onClose },
            { label: 'Menu', href: '#', onClick: () => { onClose(); onMenuClick() } },
            { label: 'Events', href: '/events', onClick: onClose },
            { label: 'Press', href: pressHref, onClick: onClose },
            { label: 'Shop', href: 'https://corimanyc.bigcartel.com', onClick: onClose },
          ].map(({ label, href, onClick }) => (
            <Link
              key={label}
              href={href}
              onClick={onClick}
              className="text-black hover:opacity-50 transition-opacity"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize: '30px',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: '1.8',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Tasting Menu — spans the full width of the menu, edge to edge */}
        <section style={{ padding: '32px 24px 8px 24px' }}>
          <h2
            className="text-black uppercase"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '20px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            Tasting Menu
          </h2>
          <p
            className="text-black leading-relaxed"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
          </p>
          <p
            className="text-black leading-relaxed"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '16px' }}
          >
            The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
          </p>
          <p
            className="text-black leading-relaxed"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            We are unable to accommodate most allergies or dietary restrictions but please e-mail{' '}
            <a href="mailto:info@corimanyc.com" className="underline hover:opacity-60 transition">
              info@corimanyc.com
            </a>{' '}
            and we will do our best to accommodate if possible.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div style={{ padding: '24px' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: '20px' }}>
          <p
            className="text-black uppercase"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '18px', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            3 Allen St NY 10002
          </p>
          <a
            href="mailto:info@corimanyc.com"
            className="text-black uppercase hover:opacity-60 transition"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '18px', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Contact
          </a>
        </div>
        <div className="flex items-start justify-between">
          <p
            className="text-black uppercase"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '18px', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Tue&nbsp;&ndash;&nbsp;Sat 5:30PM&nbsp;&ndash;&nbsp;10PM
          </p>
          <a
            href="https://instagram.com/corimanyc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black uppercase text-right hover:opacity-60 transition"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '18px', fontWeight: 400, letterSpacing: '-0.02em' }}
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
