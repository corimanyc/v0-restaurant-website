'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onMenuClick: () => void
}

export default function MobileNav({ isOpen, onClose, onMenuClick }: MobileNavProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        backgroundColor: '#1f1c18',
        transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      {/* Top bar — logo + close */}
      <div className="flex items-center justify-between" style={{ padding: '24px' }}>
        <Link href="/" onClick={onClose}>
          <img src="/logo.svg" alt="CORIMA" style={{ width: '120px', height: 'auto' }} />
        </Link>
        <button
          onClick={onClose}
          className="nav-link text-white"
          style={{ fontFamily: 'Switzer, sans-serif', fontSize: '24px', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1, background: 'transparent', border: 'none', padding: '0 0 4px 0', cursor: 'pointer' }}
          aria-label="Close menu"
        >
          X
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col" style={{ padding: '48px 24px', gap: '4px', flex: 1 }}>
        {[
          { label: 'About', href: '#about', onClick: onClose },
          { label: 'Reservations', href: 'https://resy.com/cities/new-york-ny/venues/corima?date=2026-05-08&seats=2', onClick: onClose },
          { label: 'Menu', href: '#', onClick: () => { onClose(); onMenuClick() } },
          { label: 'Events', href: '/events', onClick: onClose },
          { label: 'Press', href: '#press', onClick: onClose },
          { label: 'Shop', href: 'https://corimanyc.bigcartel.com', onClick: onClose },
        ].map(({ label, href, onClick }) => (
          <Link
            key={label}
            href={href}
            onClick={onClick}
            className="text-white hover:opacity-50 transition-opacity"
            style={{
              fontFamily: 'Switzer, sans-serif',
              fontSize: '24px',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: '1.8',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-start justify-between" style={{ marginBottom: '12px' }}>
          <a
            href="https://instagram.com/corimanyc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white uppercase hover:opacity-60 transition"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400 }}
          >
            Instagram
          </a>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white uppercase hover:opacity-60 transition"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400 }}
          >
            Spotify
          </a>
        </div>
        <div className="flex items-start justify-between">
          <p
            className="text-white uppercase"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400 }}
          >
            3 Allen St NY 10002
          </p>
          <p
            className="text-white uppercase text-right"
            style={{ fontFamily: 'Switzer, sans-serif', fontSize: '16px', fontWeight: 400 }}
          >
            Tue&nbsp;&ndash;&nbsp;Sat 5:30PM&nbsp;&ndash;&nbsp;10PM
          </p>
        </div>
      </div>
    </div>
  )
}
