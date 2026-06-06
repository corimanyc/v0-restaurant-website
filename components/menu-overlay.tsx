'use client'

import { useEffect, useRef, useState } from 'react'
import ProgressiveImage from '@/components/progressive-image'

const sectionImages: Record<string, string> = {
  'a-la-carte': '/a-la-carte-v3.jpg',
  cocktail: '/beverage.jpg',
  wine: '/wine-list-v4.jpg',
  }

const alaCarteItems = [
  { name: 'Sourdough Flour Tortilla, Recado Negro Butter', price: '9' },
  { name: 'Apples, Kohlrabi, Persimmon, Granola, Tajin', price: '24' },
  { name: 'Beef Cecina Tlayuda, Salsa Veracruzana, Edamame Guacamole, Chapulines', price: '26' },
  { name: 'Squid, King Oyster, Knotweed Aguachile, Nam Jim Jaew, Heart of Palm', price: '26' },
  { name: 'Surf Clam a la Diabla Toast, Chinese Sausage, Green Tomato', price: '33' },
  { name: 'Esquites, Mushroom Carnitas, Porcini, Mimolette, Sourdough', price: '35' },
  { name: 'Hamachi Collar, Chintextle, Cascabel Aioli, Chives', price: '36' },
  { name: 'Duck Enmoladas, Black Garlic Mole, Chicharron, Cotija', price: '36' },
  { name: 'Turbot, Epazote Pil-Pil, Ramps, Sorrel', price: '56' },
  { name: 'Squab, Rompope, Rhubarb, Tokyo Turnip Cajeta, Amaranth', price: '62' },
]

const wineByGlass = [
  { category: 'Sparkling', items: [
    { name: 'Andre Heucq, Heritage Brut Nature', desc: 'Pinot Meunier · Champagne, FR', price: '29' },
    { name: 'El Bajio Brut', desc: 'Xarel-lo, Macabeo · Valle de Bernal, MX', price: '19' },
  ]},
  { category: 'White', items: [
    { name: 'Jousset, Premier Rendez-Vous \'23', desc: 'Chenin Blanc · Loire, FR', price: '23' },
    { name: 'Hermann Ludes, Thornicher \'24', desc: 'Riesling · Mosel, DE', price: '19' },
    { name: 'Vino Figura, "Fig 3"', desc: 'Chardonnay · Valle de Guadalupe, MX', price: '21' },
  ]},
  { category: 'Skin Contact', items: [
    { name: 'La Casa Vieja \'24', desc: 'Palomino · Valle de Guadalupe, MX — Orange', price: '21' },
    { name: 'Thibaud Boudignon Rose de Loire \'25', desc: 'Cabernet Franc · Loire, FR — Rosé', price: '18' },
  ]},
  { category: 'Red', items: [
    { name: 'Casa Jipi, Rancho Llano Colorado \'24', desc: 'Nebbiolo · Valle de San Vicente, MX', price: '21' },
    { name: 'Wills Wine, Blue Plateau \'23', desc: 'Syrah, Gamay · Ardeche, FR', price: '23' },
  ]},
  { category: 'Sweet', items: [
    { name: 'Lenkey, Szamorodni \'18', desc: 'Furmint, Hárslevelű · Tokaj, HU', price: '20' },
  ]},
  { category: 'Sake', items: [
    { name: 'Kato Sake Works, NY NY', desc: 'Jizake · Brooklyn, NY', price: '18' },
  ]},
]

const nonAlcoholicItems = [
  { name: 'Tepache Spritz', desc: 'Tepache, Pentire Seaward, Club Soda', price: '14' },
  { name: 'Mugicha Iced Tea', desc: 'Toasted Barley, Verjus, Coconut', price: '15' },
  { name: 'Jamaica', desc: 'Hibiscus, Licorice', price: '14' },
  { name: 'Chuchupaste', desc: 'Aloe Vera, Chuchupaste Root, Gentian, Avocado Leaf', price: '15' },
  { name: 'Unified Ferments', desc: 'Rhododendron · Brooklyn, NY', price: '14' },
  { name: 'Copenhagen Sparkling Tea Co', desc: 'Lysegrøn · Copenhagen, DK', price: '18' },
  { name: 'Asahi Super-Dry 0.0', desc: 'Lager · Tokyo, JP', price: '9' },
  { name: 'Mexican Coke', desc: '', price: '4' },
]

const cocktailItems = [
  { name: 'Bambú', desc: 'House Lime Leaf Vermouth, Fino Sherry', price: '20' },
  { name: 'San Pedro', desc: 'Mezcal, Lime, Bitter Orange, Agave, Nopales', price: '20' },
  { name: 'Puntilla', desc: 'Tequila Reposado, Red Wine, Cinnamon, Grapefruit', price: '19' },
  { name: 'Chupacabra', desc: 'Tequila Blanco, Orange, Tomato, Chiles, Pink Peppercorn', price: '20' },
  { name: 'Key Largo', desc: 'Charanda Añejo, Celery, Key Lime', price: '19' },
  { name: 'White Sands', desc: 'Gin, Magnolia, Blanc Vermouth, Sake', price: '22' },
  { name: 'Six Feet', desc: 'Sotol Desierto, Marigold, Blanc Vermouth, Bonal Quinquina', price: '23' },
  { name: 'Corajudo', desc: 'Licor 43, Pineapple Amaro, Cold Brew, Tonic', price: '20' },
  { name: 'Pelirroja', desc: 'Carta Blanca, Persimmon, Habanero, Peppercorn', price: '17' },
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
  // On strictly mobile, every section's item text shares one (narrower) max
  // width; on larger screens each section keeps its own wider value.
  const alaCarteNameMax = isMobile ? '380px' : '550px'
  const itemNameMax = isMobile ? '380px' : '420px'
  // Intro paragraphs (a la carte + wine) share a narrower width on mobile.
  const introMax = isMobile ? '440px' : '540px'

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
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${24 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              A La Carte
            </h2>
            <p className="text-black mb-6" style={{ ...base, fontSize: '14px', maxWidth: introMax }}>
              Our a la carte menu changes with the seasons and market availability. Below is a sample menu from 5/10/26. Dishes are subject to change.
            </p>
            <div className="flex flex-col">
              {alaCarteItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <p className="text-black flex-1 min-w-0" style={{ ...base, maxWidth: alaCarteNameMax, textTransform: 'uppercase' }}>
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
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${24 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Cocktail
            </h2>
            <div className="flex flex-col">
              {cocktailItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-4">
                  <div className="flex-1 min-w-0" style={{ maxWidth: itemNameMax }}>
                      <p className="text-black" style={{ ...base, textTransform: 'uppercase' }}>{item.name}</p>
                      <p className="text-black" style={{ ...base, fontSize: `${14 + bump}px`, marginTop: '2px' }}>{item.desc}</p>
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
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${24 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Wine by the Glass
            </h2>
            <p className="text-black mb-10" style={{ ...base, fontSize: '14px', maxWidth: introMax }}>
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
                      <div className="flex-1 min-w-0" style={{ maxWidth: itemNameMax }}>
                        <p className="text-black" style={{ ...base, textTransform: 'uppercase' }}>{item.name}</p>
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

          {/* Non-Alcoholic */}
          <div data-section="non-alcoholic" style={{ marginTop: '56px' }}>
            <h2 className="text-black uppercase mb-4" style={{ fontSize: `${24 + bump}px`, letterSpacing: '-0.02em', fontWeight: 400 }}>
              Non-Alcoholic
            </h2>
            <div className="flex flex-col">
              {nonAlcoholicItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between py-3">
                  <div className="flex-1 min-w-0" style={{ maxWidth: itemNameMax }}>
                    <p className="text-black" style={{ ...base, textTransform: 'uppercase' }}>{item.name}</p>
                    {item.desc && (
                      <p className="text-black" style={{ ...base, fontSize: `${14 + bump}px`, marginTop: '2px' }}>{item.desc}</p>
                    )}
                  </div>
                  <p className="text-black flex-shrink-0 text-right" style={{ ...base, marginLeft: '40px' }}>
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right — scroll-aware image, top aligned with the section heading */}
        <div
          ref={imageRef}
          className="hidden lg:block flex-shrink-0 relative overflow-hidden"
          style={{ marginRight: '24px', marginTop: '16px', width: '550px', alignSelf: 'flex-start', height: 'calc(100% - 16px)' }}
        >
          {Object.entries(sectionImages).map(([section, src]) => (
            <ProgressiveImage
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
