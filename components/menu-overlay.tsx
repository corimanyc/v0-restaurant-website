'use client'

import { useEffect, useRef, useState } from 'react'

const sectionImages: Record<string, string> = {
  'a-la-carte': '/a-la-carte-v3.jpg',
  cocktail: '/beverage.jpg',
  wine: '/wine-list-v4.jpg',
  }

const alaCarteItems = [
  { name: 'Sourdough Flour Tortilla, Recado Negro Butter', price: '29' },
  { name: 'Beef Cecina Tlayuda, Salsa Veracruzana, Edamame Guacamole, Chapulines', price: '33' },
  { name: 'Kampachi, Toreados, Kohlrabi, Hoja Santa', price: '24' },
  { name: 'Sourdough Flour Tortilla, Recado Negro Butter', price: '23' },
  { name: 'Beef Cecina Tlayuda, Salsa Veracruzana, Edamame Guacamole, Chapulines', price: '23' },
  { name: 'Kampachi, Toreados, Kohlrabi, Hoja Santa', price: '13' },
  { name: 'Sourdough Flour Tortilla, Recado Negro Butter', price: '32' },
  { name: 'Beef Cecina Tlayuda, Salsa Veracruzana, Edamame Guacamole, Chapulines', price: '40' },
  { name: 'Kampachi, Toreados, Kohlrabi, Hoja Santa', price: '' },
]

const wineByGlass = [
  { category: 'Sparkling', items: [
    { name: 'Andre Huecq, Heritage Brut Nature', desc: 'Pinot Meunier · Champagne, FR', price: '24' },
    { name: 'El Bajio Brut', desc: 'Xarel-lo, Macabeo · Valle de Bernal, MX', price: '18' },
  ]},
  { category: 'White', items: [
    { name: 'Fosse-Sèche, Arcane \'22', desc: 'Chenin Blanc · Loire Valley, FR', price: '22' },
    { name: 'Vollenweider, Felsenfest \'24', desc: 'Riesling · Mosel, DE', price: '20' },
    { name: 'Vino Figura, "Fig 3"', desc: 'Chardonnay · Valle de Guadalupe, MX', price: '18' },
  ]},
  { category: 'Skin Contact', items: [
    { name: 'La Casa Vieja \'24', desc: 'Palomino · Valle de Guadalupe, MX — Orange', price: '19' },
    { name: 'Romain Le Bars Tavel \'24', desc: 'Grenache · Rhone, FR — Rosé', price: '21' },
  ]},
  { category: 'Red', items: [
    { name: 'Douhairet-Porcheret, Les Prevaux \'21', desc: 'Pinot Noir · Burgundy, FR', price: '26' },
    { name: 'Thomas Farge, Grande Angle St Joseph \'21', desc: 'Syrah · Rhone, FR', price: '23' },
  ]},
  { category: 'Sherry', items: [
    { name: 'Buelan, Las Canciones No 2 Oloroso', desc: 'Palomino · Andalucia, ES — 2oz', price: '14' },
  ]},
  { category: 'Sake', items: [
    { name: 'Uehara Shuzo, Furosen Usunigori', desc: 'Ginjo Yamahai Nama · Shiga, JP', price: '18' },
  ]},
  { category: 'Non Alcoholic', items: [
    { name: 'Unified Ferments', desc: 'Rhododendron · Brooklyn, NY', price: '12' },
    { name: 'Copenhagen Sparkling Tea Co', desc: 'Lysegron · Copenhagen, DK — Sparkling', price: '12' },
  ]},
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
  scrollToSection?: 'a-la-carte' | 'cocktail' | 'wine'
}

export default function MenuOverlay({ isOpen, onClose, scrollToSection }: MenuOverlayProps) {
  const [activeSection, setActiveSection] = useState<'a-la-carte' | 'cocktail' | 'wine'>('a-la-carte')
  // Strictly mobile = below the md (768px) breakpoint, where the nav becomes a
  // hamburger. On mobile every listed text gets +2px.
  const [isMobile, setIsMobile] = useState(false)
  const wineRef = useRef<HTMLDivElement>(null)
  const alaCarteRef = useRef<HTMLDivElement>(null)
  const cocktailRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && scrollToSection) {
      const refMap = { 'a-la-carte': alaCarteRef, cocktail: cocktailRef, wine: wineRef }
      const target = refMap[scrollToSection]?.current
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
      }
    }
  }, [isOpen, scrollToSection])

  useEffect(() => {
    // The <html> element has overflow-y: scroll, so the scrollbar (and its
    // gutter) is permanently reserved. Toggling body overflow doesn't change
    // the layout width, and the standalone/nav logos share padding so the
    // logo position stays constant when the panel opens.
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
            if (id === 'a-la-carte' || id === 'cocktail' || id === 'wine') {
              setActiveSection(id as 'a-la-carte' | 'cocktail' | 'wine')
            }
          }
        })
      },
      { root: scrollEl, threshold: 0.15 },
    )
    if (alaCarteRef.current) observer.observe(alaCarteRef.current)
    if (cocktailRef.current) observer.observe(cocktailRef.current)
    if (wineRef.current) observer.observe(wineRef.current)
    return () => observer.disconnect()
  }, [isOpen])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const bump = isMobile ? 2 : 0
  const base: React.CSSProperties = { fontSize: `${16 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 60,
        backgroundColor: '#3a3a3a',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      <style>{`*::-webkit-scrollbar{display:none}`}</style>

      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0 p-6">
        <h1 className="text-black uppercase" style={{ fontSize: '24px', letterSpacing: '-0.02em', fontWeight: 400 }}>
          Menu
        </h1>
        <button
          onClick={onClose}
          className="menu-close nav-link text-black uppercase flex items-center justify-end lg:justify-center cursor-pointer"
          style={{ height: '40px', fontSize: '28px', lineHeight: '1', fontWeight: 400, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
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
          className="overflow-y-auto w-full lg:w-1/2 pr-9 lg:pr-5"
          style={{
            padding: '16px 24px 48px 24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          {/* A La Carte */}
          <div ref={alaCarteRef} data-section="a-la-carte">
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${18 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              A La Carte
            </h2>
            <div className="flex flex-col">
              {alaCarteItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <p className="text-black flex-1 min-w-0 max-w-[400px] md:max-w-[550px]" style={base}>
                    {item.name}
                  </p>
                  <p className="text-black flex-shrink-0 text-right" style={{ ...base, marginLeft: '40px' }}>
                    {item.price || '—'}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Cocktail */}
          <div ref={cocktailRef} data-section="cocktail" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${18 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Cocktail
            </h2>
            <div className="flex flex-col">
              {cocktailItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <div className="flex-1 min-w-0" style={{ maxWidth: '420px' }}>
                    <p className="text-black uppercase" style={base}>{item.name}</p>
                    <p className="text-black uppercase" style={{ ...base, fontSize: `${14 + bump}px`, marginTop: '2px' }}>{item.desc}</p>
                  </div>
                  <p className="text-black flex-shrink-0 text-right" style={{ ...base, marginLeft: '40px' }}>
                    {item.price || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Wine */}
          <div ref={wineRef} data-section="wine" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${18 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Wine by the Glass
            </h2>
            <p className="text-black mb-10" style={{ ...base, fontSize: `${14 + bump}px`, maxWidth: '540px' }}>
              We offer a rotating selection of wines by the glass, which change frequently. We additionally have an extensive list of wines by the bottle, along with our offering of agaves.
            </p>
            {wineByGlass.map((group, gi) => (
              <div key={gi} style={{ marginBottom: '32px' }}>
                <p className="text-black uppercase mb-1" style={{ ...base, fontSize: `${12 + bump}px`, letterSpacing: '0.08em' }}>
                  {group.category}
                </p>
                <div className="flex flex-col">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start justify-between py-3">
                      <div className="flex-1 min-w-0" style={{ maxWidth: '420px' }}>
                        <p className="text-black" style={base}>{item.name}</p>
                        <p className="text-black" style={{ ...base, fontSize: `${14 + bump}px`, marginTop: '2px' }}>{item.desc}</p>
                      </div>
                      <p className="text-black flex-shrink-0 text-right" style={{ ...base, marginLeft: '40px' }}>
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right — scroll-aware image, top aligned with the "A La Carte" heading */}
        <div
          ref={imageRef}
          className="hidden lg:block flex-shrink-0 relative overflow-hidden"
          style={{ marginRight: '24px', marginTop: '16px', width: '550px', alignSelf: 'flex-start', height: 'calc(100% - 16px)' }}
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
