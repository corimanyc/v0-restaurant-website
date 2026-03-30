'use client'

import { useEffect } from 'react'

interface MenuItem {
  name: string
  price?: number
}

const menuItems: MenuItem[] = [
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 29 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE,  CHAPULINES', price: 33 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: 24 },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 23 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE,  CHAPULINES', price: 23 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: 13 },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 32 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE,  CHAPULINES', price: 40 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA' },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER' },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE,  CHAPULINES' },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA' },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        backgroundColor: '#8d8a86',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '24px' }}>
        <h1 className="text-black uppercase tracking-widest font-medium" style={{ fontSize: '20px' }}>
          Menu
        </h1>
        <button
          onClick={onClose}
          className="text-black hover:opacity-60 transition uppercase tracking-widest"
          style={{ fontSize: '16px' }}
          aria-label="Close menu"
        >
          X
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — scrollable menu list */}
        <div
          className="overflow-y-auto"
          style={{
            width: '48%',
            padding: '16px 24px 48px 24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          <h2
            className="text-black uppercase font-medium mb-4"
            style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
          >
            A La Carte
          </h2>

          <p
            className="text-black mb-1"
            style={{ fontSize: '14px', opacity: 0.85, letterSpacing: '-0.02em' }}
          >
            Our a la carte menu changes with the seasons and market availability.
          </p>
          <p
            className="text-black mb-8"
            style={{ fontSize: '14px', opacity: 0.85, letterSpacing: '-0.02em' }}
          >
            Below is a sample menu from 2/9/26. Dishes are subject to change.
          </p>

          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between py-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                <p
                  className="text-black uppercase tracking-wide"
                  style={{
                    fontSize: '14px',
                    maxWidth: '420px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.name}
                </p>
                {item.price && (
                  <p
                    className="text-black flex-shrink-0"
                    style={{
                      fontSize: '14px',
                      marginLeft: '16px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — static image */}
        <div
          className="hidden lg:flex flex-shrink-0"
          style={{ width: '52%', paddingRight: '24px' }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2895%201-Tmb6eaZVQ9G8kNFzemEMMwG5Y8llGL.png"
            alt="CORIMA dish being plated"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
