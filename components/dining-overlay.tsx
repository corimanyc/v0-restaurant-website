// dining-overlay.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface DiningOverlayProps {
  isOpen: boolean
  onClose: () => void
  onViewMenu: () => void
}

export default function DiningOverlay({ isOpen, onClose, onViewMenu }: DiningOverlayProps) {
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
      className="fixed top-0 right-0 h-full overflow-y-auto"
      style={{
        backgroundColor: '#333333',
        color: '#d1d1d1',
        zIndex: 45,
        width: '50%',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isOpen ? 'all' : 'none',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '24px 24px 0 24px' }}>
        <h1 className="uppercase tracking-widest font-medium" style={{ fontSize: '20px', letterSpacing: '-0.02em' }}>
          Dining
        </h1>
        <button
          onClick={onClose}
          className="hover:opacity-60 transition uppercase tracking-widest"
          style={{ fontSize: '16px' }}
          aria-label="Close dining panel"
        >
          X
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '80px 24px 64px 24px' }}>

        {/* Tasting Menu */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="uppercase font-medium mb-6" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            Tasting Menu
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
          </p>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
          </p>
          <p className="leading-relaxed mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em', opacity: 0.7 }}>
            We are unable to accommodate most allergies or dietary restrictions but please e-mail info@corimanyc.com and we will do our best to accommodate if possible.
          </p>
          <Link
            href="mailto:info@corimanyc.com"
            className="hover:opacity-70 transition"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#d1d1d1' }}
          >
            <span className="mr-2">&bull;</span>Contact
          </Link>
        </section>

        {/* A La Carte */}
        <section style={{ marginBottom: '80px' }}>
          <h2 className="uppercase font-medium mb-6" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            A La Carte
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            Offered alongside our tasting menu, the à la carte selection provides a more open, self-directed way to experience Corima. Rather than a structured progression, this menu invites guests to explore individual dishes at their own pace.
          </p>
          <p className="leading-relaxed mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            While the selection evolves over time, the focus here is on immediacy and choice, allowing each dish to stand on its own while reflecting the same perspective as our tasting menu.
          </p>
          <button
            onClick={onViewMenu}
            className="hover:opacity-70 transition text-left"
            style={{ fontSize: '16px', letterSpacing: '-0.02em', color: '#d1d1d1' }}
          >
            <span className="mr-2">&bull;</span>View Menu
          </button>
        </section>

        {/* Wine */}
        <section>
          <h2 className="uppercase font-medium mb-6" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            Wine
          </h2>
          <p className="leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The wine program focuses on producer-driven bottles from Mexico and Europe. Selections are guided by origin and production, forming a list that moves easily across the menu.
          </p>
          <p className="leading-relaxed mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The list remains concise and continuously evolving, reflecting both availability and the direction of the kitchen.
          </p>
        </section>
      </div>
    </div>
  )
}
