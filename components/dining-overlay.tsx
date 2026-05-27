// dining-overlay.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface DiningOverlayProps {
  isOpen: boolean
  onClose: () => void
  onViewMenu: (section?: 'a-la-carte' | 'cocktail' | 'wine') => void
}

export default function DiningOverlay({ isOpen, onClose, onViewMenu }: DiningOverlayProps) {
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

  return (
    <>
      {/* Click-outside backdrop — invisible, fills the area to the LEFT of the panel.
          Clicking anywhere outside the side panel closes it. */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '50%',
          zIndex: 44,
          background: 'transparent',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      <div
        className="fixed top-0 right-0 h-full flex flex-col"
        style={{
          backgroundColor: '#7b7b7b',
          color: '#000000',
          zIndex: 45,
          width: '50%',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isOpen ? 'all' : 'none',
          // Force regular weight for all text inside the panel; individual
          // headings/buttons override only what they need (e.g. tracking).
          fontWeight: 400,
        }}
      >
      <style>{`
        .dining-scroll::-webkit-scrollbar { display: none; }
        .dining-close-btn {
          width: 40px;
          height: 40px;
          font-size: 32px;
          line-height: 1;
          font-weight: 400;
          background: transparent;
          border: none;
          color: inherit;
        }
      `}</style>

      {/* Header — fixed at top */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{ padding: '24px 24px 24px 24px' }}
      >
        <h1
          className="uppercase tracking-widest flex items-center"
          style={{ fontSize: '24px', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400, margin: 0, height: '40px' }}
        >
          Dining
        </h1>
        <button
          onClick={onClose}
          className="dining-close-btn nav-link flex items-center justify-center cursor-pointer uppercase"
          aria-label="Close dining panel"
        >
          X
        </button>
      </div>

      {/* Scrollable content */}
      <div
        className="dining-scroll flex-1 overflow-y-auto"
        style={{
          padding: '20px 24px 64px 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >

        {/* Tasting Menu */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="uppercase mb-4" style={{ fontSize: '18px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Tasting Menu
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
          </p>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
          </p>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em', opacity: 0.7 }}>
            We are unable to accommodate most allergies or dietary restrictions but please e-mail info@corimanyc.com and we will do our best to accommodate if possible.
          </p>
          <Link
            href="mailto:info@corimanyc.com"
            className="nav-link"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#000000', fontWeight: 500 }}
          >
            <span className="mr-2">&bull;</span>Contact
          </Link>
        </section>

        {/* A La Carte */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="uppercase mb-4" style={{ fontSize: '18px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            A La Carte
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            Offered alongside our tasting menu, the à la carte selection provides a more open, self-directed way to experience Corima. Rather than a structured progression, this menu invites guests to explore individual dishes at their own pace.
          </p>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            While the selection evolves over time, the focus here is on immediacy and choice, allowing each dish to stand on its own while reflecting the same perspective as our tasting menu.
          </p>
          <button
            onClick={() => onViewMenu('a-la-carte')}
            className="nav-link text-left"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#000000', fontWeight: 500, background: 'transparent', border: 'none', padding: '0 0 4px 0', cursor: 'pointer' }}
          >
            <span className="mr-2">&bull;</span>A La Carte Menu
          </button>
        </section>

        {/* Beverage */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="uppercase mb-4" style={{ fontSize: '18px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Beverage <span style={{ textTransform: 'none' }}>(Spirit Pairing $90)</span>
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The beverage program consists of a collection of cocktails that mirror the essence of Corima. Sotol is heavily featured as an ode to the Northern region of Mexico.
          </p>
          <button
            onClick={() => onViewMenu('cocktail')}
            className="nav-link text-left"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#000000', fontWeight: 500, background: 'transparent', border: 'none', padding: '0 0 4px 0', cursor: 'pointer' }}
          >
            <span className="mr-2">&bull;</span>Beverage Menu
          </button>
        </section>

        {/* Wine */}
        <section>
          <h2 className="uppercase mb-4" style={{ fontSize: '18px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Wine
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The wine program focuses on producer-driven bottles from Mexico and Europe. Selections are guided by origin and production, forming a list that moves easily across the menu.
          </p>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The list remains concise and continuously evolving, reflecting both availability and the direction of the kitchen.
          </p>
          <button
            onClick={() => onViewMenu('wine')}
            className="nav-link text-left"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#000000', fontWeight: 500, background: 'transparent', border: 'none', padding: '0 0 4px 0', cursor: 'pointer' }}
          >
            <span className="mr-2">&bull;</span>Wine List
          </button>
        </section>
      </div>
    </div>
    </>
  )
}
