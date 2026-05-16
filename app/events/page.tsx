import Link from 'next/link'

const posters = [
  { src: '/events/contra.jpg', alt: 'Corima x Contra — January 20', aspect: '9 / 16' },
  { src: '/events/sanchez.jpg', alt: 'Sanchez x Corima — Circle of Sharing, December 16, presented by Resy', aspect: '4 / 5' },
  { src: '/events/eliane.png', alt: 'Corima x Eliane — presented by Resy', aspect: '4 / 5' },
  { src: '/events/oriole.jpg', alt: 'Oriole x Corima — April 15', aspect: '1 / 1' },
  { src: '/events/osito.jpg', alt: 'Corima x Osito — 1 Year Anniversary Collab, January 15, 2025', aspect: '1 / 1' },
  { src: '/events/reverie.jpg', alt: 'Corima x Reverie', aspect: '1 / 1' },
  { src: '/events/lysee.jpg', alt: 'Lysée x Corima', aspect: '1 / 1' },
]

export const metadata = {
  title: 'Events — Corima',
  description: 'Past collaborations and one-night-only events at Corima.',
}

export default function EventsPage() {
  return (
    <main
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'url(/main-bg.jpeg)',
        backgroundRepeat: 'repeat',
        backgroundSize: '512px 512px',
        minHeight: '100vh',
        color: '#CBCBCB',
      }}
    >
      {/* Header — minimal, with back link to home */}
      <header className="flex items-center justify-between px-5 md:px-12 pt-6">
        <Link href="/" className="nav-link tracking-wider" style={{ color: 'inherit', fontSize: '16px' }}>
          ← Corima
        </Link>
      </header>

      {/* Page title */}
      <div className="px-5 md:px-12 pt-16 lg:pt-24 pb-8">
        <h1 style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '0.05em' }}>EVENTS</h1>
        <p className="mt-4 max-w-2xl leading-relaxed" style={{ fontSize: '18px', color: '#CBCBCB' }}>
          A circle of sharing — past collaborations, one-night-only dinners,
          and projects with friends of the house.
        </p>
      </div>

      {/* Carousel — horizontal scroll, aligned to left gutter */}
      <div
        className="flex gap-6 overflow-x-auto pb-12 pl-5 md:pl-12 pr-5 md:pr-12"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {posters.map((poster) => (
          <div
            key={poster.src}
            className="flex-shrink-0"
            style={{
              width: 'min(420px, 80vw)',
              aspectRatio: poster.aspect,
              scrollSnapAlign: 'start',
            }}
          >
            <img
              src={poster.src}
              alt={poster.alt}
              className="w-full h-full object-cover block"
              style={{ borderRadius: '2px' }}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
