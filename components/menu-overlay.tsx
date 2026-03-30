
'use client'

import { useEffect, useRef, useState } from 'react'

const sectionImages: Record<string, string> = {
  'a-la-carte': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2895%201-Tmb6eaZVQ9G8kNFzemEMMwG5Y8llGL.png',
  cocktail: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5644C25E-6307-4E8C-BD3A-2B954A8A2C73_1_201_a-ZGlZqzedBBSS7ErdSvQPfaVA2HjFZI.jpeg',
}

const alaCarteItems = [
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: '29' },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: '33' },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: '24' },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: '23' },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: '23' },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: '13' },
  { name: 'SOURDOUGH FLOUR TORTILLA, RECADO NEGRO BUTTER', price: '32' },
  { name: 'BEEF CECINA TLAYUDA, SALSA VERACRUZANA, EDAMAME GUACAMOLE, CHAPULINES', price: '40' },
  { name: 'KAMPACHI, TOREADOS, KOHLRABI, HOJA SANTA', price: '' },
]

const cocktailItems = [
  { name: 'SAN PEDRO', desc: 'Sotol, Lime, Bitter Orange Agave, Nopales' },
  { name: 'PUNTILLA', desc: 'Tequila Reposado, Red Wine, Cinnamon, Grapefruit' },
  { name: 'ORITO', desc: 'Tequila Blanco, Bergamot, Squirt, Yellow Chartreuse, Fennel Seed' },
  { name: 'DUST DEVIL', desc: 'Bourbon, Beet, Pasilla, Aperol' },
  { name: 'HIERBA MORA', desc: 'Vodka, Poblano Brine, Empirical Cilantro, Dry Vermouth' },
  { name: 'SIX FEET', desc: 'Sotol Desierto, Marigold, Blanc Vermouth, Bonal Quinquina' },
  { name: 'CARAJILLO DE LA CASA', desc: 'Aged Rum, Licor 43, Forthave Brown, Café Integral Coffee' },
  { name: 'PELIRROJA', desc: 'Carta Blanca, Persimmon, Habanero, Peppercorn' },
  { name: 'JAMAICA COOLER (Non-Alcoholic)', desc: 'Hibiscus, Licorice' },
  { name: 'TEPACHE SPRITZ (Non-Alcoholic)', desc: 'Tepache, Pentire Seaward, Soda' },
  { name: 'MUGICHA ICED TEA', desc: 'Mugicha, Ver Jus, Coconut' },
  { name: 'CHUCHUPASTE', desc: 'Aloe Vera, Chuchupaste Root, Gentian, Avocado Leaf' },
]

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [activeSection, setActiveSection] = useState<'a-la-carte' | 'cocktail'>('a-la-carte')
  const alaCarteRef = useRef<HTMLDivElement>(null)
  const cocktailRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.section
            if (id === 'a-la-carte' || id === 'cocktail') {
              setActiveSection(id)
            }
          }
        })
      },
      { root: scrollEl, threshold: 0.15 },
    )
    if (alaCarteRef.current) observer.observe(alaCarteRef.current)
    if (cocktailRef.current) observer.observe(cocktailRef.current)
    return () => observer.disconnect()
  }, [isOpen])

  const base: React.CSSProperties = { fontSize: '14px', letterSpacing: '-0.02em' }

  return (
    <div
      className="fixed inset-0 bg-[#8d8a86] flex flex-col"
      style={{
        zIndex: 60,
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      <style>{`*::-webkit-scrollbar{display:none}`}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '24px' }}>
        <h1 className="text-black uppercase font-medium" style={{ fontSize: '20px', letterSpacing: '-0.02em' }}>
          Menu
        </h1>
        <button
          onClick={onClose}
          className="text-black hover:opacity-60 transition uppercase"
          style={{ fontSize: '16px' }}
          aria-label="Close menu"
        >
          X
        </button>
      </div>

      {/* Body */}
      <div className="flex overflow-hidden justify-between" style={{ flex: '1 1 0', minHeight: 0 }}>

        {/* Left — scrollable list */}
        <div
          ref={scrollRef}
          className="overflow-y-auto"
          style={{
            width: '50%',
            padding: '16px 24px 48px 24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          {/* A La Carte */}
          <div ref={alaCarteRef} data-section="a-la-carte">
            <h2 className="text-black uppercase font-medium mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
              A La Carte
            </h2>
            <p className="text-black mb-1" style={base}>
              Our a la carte menu changes with the seasons and market availability.
            </p>
            <p className="text-black mb-8" style={{ ...base, opacity: 0.85 }}>
              Below is a sample menu from 2/9/26. Dishes are subject to change.
            </p>
            <div className="flex flex-col">
              {alaCarteItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <p className="text-black uppercase" style={{ ...base, maxWidth: '420px' }}>
                    {item.name}
                  </p>
                  {item.price ? (
                    <p className="text-black flex-shrink-0" style={{ ...base, marginLeft: '16px' }}>
                      {item.price}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Cocktail */}
          <div ref={cocktailRef} data-section="cocktail" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase font-medium mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
              Cocktail
            </h2>
            <div className="flex flex-col">
              {cocktailItems.map((item, i) => (
                <div key={i} className="py-4" style={{ maxWidth: '420px' }}>
                  <p className="text-black uppercase" style={base}>{item.name}</p>
                  <p className="text-black" style={{ ...base, opacity: 0.65, marginTop: '2px' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — scroll-aware image */}
        <div
          className="hidden lg:block flex-shrink-0 relative overflow-hidden"
          style={{ marginRight: '24px', width: '550px' }}
        >
          {Object.entries(sectionImages).map(([section, src]) => (
            <img
              key={section}
              src={src}
              alt={section}
              className="absolute inset-0 h-full object-cover transition-opacity duration-700"
              style={{ width: '550px', opacity: activeSection === section ? 1 : 0 }}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
