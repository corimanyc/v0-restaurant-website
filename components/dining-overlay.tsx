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
      className="fixed top-0 right-0 h-full overflow-y-auto bg-[#3a3531] text-white"
      style={{
        zIndex: 45,
        width: '58%',
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
        <h1 className="uppercase tracking-widest font-medium text-white" style={{ fontSize: '20px', letterSpacing: '-0.02em' }}>
          Dining
        </h1>
        <button
          onClick={onClose}
          className="text-white hover:opacity-60 transition uppercase tracking-widest"
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
          <h2 className="uppercase font-medium text-white mb-6" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            Tasting Menu
          </h2>
          <p className="text-white leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
          </p>
          <p className="text-white leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
          </p>
          <p className="text-white leading-relaxed mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em', opacity: 0.7 }}>
            We are unable to accommodate most allergies or dietary restrictions but please e-mail info@corimanyc.com and we will do our best to accommodate if possible.
          </p>
          <Link
            href="mailto:info@corimanyc.com"
            className="text-white hover:opacity-70 transition"
            style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
          >
            <span className="mr-2">&bull;</span>Contact
          </Link>
        </section>

        {/* A La Carte */}
        <section>
          <h2 className="uppercase font-medium text-white mb-6" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            A La Carte
          </h2>
          <p className="text-white leading-relaxed mb-4" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            At Corima, our Tasting Menu consists of approximately 10-13 courses and is priced at $140 per person.
          </p>
          <p className="text-white leading-relaxed mb-8" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
            The menu is a seasonal expression of what Northern Mexican cuisine means to Chef Fidel Caballero rooted in tradition, shaped by place, but constantly evolving. The menu changes throughout the year, guided by what is freshest and most vibrant at the farmers market, allowing each dish to tell a story through technique, memory, and ingredients. We often refer to this approach as Progressive Mexican: respectful of heritage but open to reinterpretation and discovery.
          </p>
          <button
            onClick={onViewMenu}
            className="text-white hover:opacity-70 transition text-left"
            style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
          >
            <span className="mr-2">&bull;</span>View Menu
          </button>
        </section>
      </div>
    </div>
  )
}
