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
  { name: 'SAN PEDRO', desc: 'SOTOL, LIME, BITTER ORANGE AGAVE, NOPALES', price: '18' },
  { name: 'PUNTILLA', desc: 'TEQUILA REPOSADO, RED WINE, CINNAMON, GRAPEFRUIT', price: '18' },
  { name: 'ORITO', desc: 'TEQUILA BLANCO, BERGAMOT, SQUIRT, YELLOW CHARTREUSE, FENNEL SEED', price: '19' },
  { name: 'DUST DEVIL', desc: 'BOURBON, BEET, PASILLA, APEROL', price: '18' },
  { name: 'HIERBA MORA', desc: 'VODKA, POBLANO BRINE, EMPIRICAL CILANTRO, DRY VERMOUTH', price: '18' },
  { name: 'SIX FEET', desc: 'SOTOL DESIERTO, MARIGOLD, BLANC VERMOUTH, BONAL QUINQUINA', price: '18' },
  { name: 'CARAJILLO DE LA CASA', desc: 'AGED RUM, LICOR 43, FORTHAVE BROWN, CAFÉ INTEGRAL COFFEE', price: '18' },
  { name: 'PELIRROJA', desc: 'CARTA BLANCA, PERSIMMON, HABANERO, PEPPERCORN', price: '14' },
  { name: 'JAMAICA COOLER (NON-ALCOHOLIC)', desc: 'HIBISCUS, LICORICE', price: '10' },
  { name: 'TEPACHE SPRITZ (NON-ALCOHOLIC)', desc: 'TEPACHE, PENTIRE SEAWARD, SODA', price: '10' },
  { name: 'MUGICHA ICED TEA', desc: 'MUGICHA, VER JUS, COCONUT', price: '10' },
  { name: 'CHUCHUPASTE', desc: 'ALOE VERA, CHUCHUPASTE ROOT, GENTIAN, AVOCADO LEAF', price: '10' },
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
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const imageEl = imageRef.current
    const scrollEl = scrollRef.current
    if (!imageEl || !scrollEl) return
    const forwardWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollEl.scrollBy({ top: e.deltaY, behavior: 'auto' })
    }
    imageEl.addEventListener('wheel', forwardWheel, { passive: false })
    return () => imageEl.removeEventListener('wheel', forwardWheel)
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
        <h1 className="text-black uppercase font-medium" style={{ fontSize: '28px', letterSpacing: '-0.02em' }}>
          Menu
        </h1>
        <button
          onClick={onClose}
          className="text-black hover:opacity-60 transition uppercase"
          style={{ fontSize: '32px', lineHeight: '1', fontWeight: '300' }}
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
            <div className="flex flex-col">
              {alaCarteItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <p className="text-black uppercase font-medium" style={{ ...base, maxWidth: '420px' }}>
                    {item.name}
                  </p>
                  <p className="text-black flex-shrink-0 text-right font-medium" style={{ ...base, marginLeft: '16px' }}>
                    {item.price || '—'}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Wine */}
          <div ref={wineRef} data-section="wine" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase font-medium mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
              Wine
            </h2>
            <p className="text-black mb-6" style={{ ...base, maxWidth: '420px', lineHeight: '1.6' }}>
              The wine program focuses on producer-driven bottles from Mexico and Europe, selected for their alignment with the menu&apos;s seasonal and regional sensibility.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <a
                  href="#"
                  className="text-black underline underline-offset-2"
                  style={{ ...base }}
                >
                  Our wine list
                </a>
              </li>
            </ul>
          </div>

          {/* Cocktail */}
          <div ref={cocktailRef} data-section="cocktail" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase font-medium mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
              Cocktail
            </h2>
            <div className="flex flex-col">
              {cocktailItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <div style={{ maxWidth: '380px' }}>
                    <p className="text-black uppercase font-medium" style={base}>{item.name}</p>
                    <p className="text-black uppercase font-medium" style={{ ...base, fontSize: '12px', marginTop: '2px' }}>{item.desc}</p>
                  </div>
                  <p className="text-black flex-shrink-0 text-right" style={{ ...base, marginLeft: '16px' }}>
                    {item.price || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — scroll-aware image */}
        <div
          ref={imageRef}
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
