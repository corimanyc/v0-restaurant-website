'use client'

import { useEffect, useState } from 'react'

const carouselImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2895%201-Tmb6eaZVQ9G8kNFzemEMMwG5Y8llGL.png',
    alt: 'CORIMA dish being plated',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1305D7C9-5A98-4D73-B74E-1A6F046A1C86_1_201_a-EFAUCGZA4GiiJzrPF2Ko0f5bV7IVns.jpeg',
    alt: 'CORIMA chef cooking on wood-fire grill',
  },
]

const menuItems = [
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 29 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: 33 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: 24 },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 23 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: 23 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: 13 },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: 32 },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: 40 },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA' },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER' },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES' },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA' },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [imgIndex, setImgIndex] = useState(0)

  const prev = () => setImgIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length)
  const next = () => setImgIndex((i) => (i + 1) % carouselImages.length)

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
      <style>{`.menu-scroll::-webkit-scrollbar { display: none; }`}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '24px' }}>
        <h1
          className="text-black uppercase font-medium"
          style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
        >
          Menu
        </h1>
        <button
          onClick={onClose}
          className="text-black hover:opacity-60 transition uppercase"
          style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
          aria-label="Close menu"
        >
          X
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden justify-between">

        {/* Left — scrollable menu list */}
        <div
          className="menu-scroll overflow-y-auto"
          style={{
            width: '50%',
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
          <p className="text-black mb-1" style={{ fontSize: '14px', opacity: 0.85, letterSpacing: '-0.02em' }}>
            Our a la carte menu changes with the seasons and market availability.
          </p>
          <p className="text-black mb-8" style={{ fontSize: '14px', opacity: 0.85, letterSpacing: '-0.02em' }}>
            Below is a sample menu from 2/9/26. Dishes are subject to change.
          </p>
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-start justify-between py-4">
                <p
                  className="text-black uppercase"
                  style={{ fontSize: '14px', maxWidth: '380px', letterSpacing: '-0.02em' }}
                >
                  {item.name}
                </p>
                {item.price && (
                  <p className="text-black flex-shrink-0" style={{ fontSize: '14px', letterSpacing: '-0.02em' }}>
                    {item.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — click carousel, aligned to right with 24px margin */}
        <div
          className="hidden lg:block flex-shrink-0 relative overflow-hidden"
          style={{ width: '550px', marginRight: '24px' }}
        >
          {carouselImages.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full object-cover transition-opacity duration-700"
              style={{ width: '550px', opacity: index === imgIndex ? 1 : 0 }}
            />
          ))}
          {/* Click left half to go prev */}
          <button
            onClick={prev}
            className="absolute left-0 top-0 h-full z-10"
            style={{ width: '50%', cursor: 'w-resize' }}
            aria-label="Previous image"
          />
          {/* Click right half to go next */}
          <button
            onClick={next}
            className="absolute right-0 top-0 h-full z-10"
            style={{ width: '50%', cursor: 'e-resize' }}
            aria-label="Next image"
          />
        </div>

      </div>
    </div>
  )
}
