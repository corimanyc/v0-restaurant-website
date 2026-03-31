'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { MenuOverlay } from '@/components/menu-overlay'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    let lastScrollY = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 100)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-white flex-1" style={{ backgroundColor: '#1f1c18' }}>
        <Navigation isHidden={isScrollingDown} />
        <Hero onMenuClick={() => setIsMenuOpen(true)} />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* About Section */}
        <section style={{ backgroundColor: '#1f1c18', padding: '80px 24px' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '120px' }}>
            {/* Left column */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '300', color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                About
              </h2>
              <p className="leading-relaxed mb-8" style={{ fontSize: '16px', color: '#999' }}>
                Corima is a restaurant in New York City focused on the food and wine of Northern Mexico. The restaurant takes its name from the Tarahumara word for &ldquo;circle of sharing,&rdquo; reflecting an approach to dining that emphasizes gathering, generosity, and the pleasure of shared experience.
              </p>
              <p className="leading-relaxed" style={{ fontSize: '16px', color: '#999' }}>
                Led by Chef Fidel Caballero, the kitchen works with a philosophy grounded in tradition while remaining forward-looking. The wine program is led by Garrett Prunty.
              </p>
            </div>

            {/* Right column */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '300', color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                À La Carte
              </h2>
              <p className="leading-relaxed mb-3" style={{ fontSize: '16px' }}>
                Offered alongside our tasting menu, the &agrave; la carte selection provides a more open, self-directed way to experience Corima. Rather than a structured progression, this menu invites guests to explore individual dishes at their own pace.
              </p>

              <p className="leading-relaxed mb-5" style={{ fontSize: '16px' }}>
                While the selection evolves over time, the focus here is on immediacy and choice, allowing each dish to stand on its own while reflecting the same perspective as our tasting menu. Our beverage program follows a similar sensibility, with a focused selection of Mexican spirits, particularly sotol, alongside wines chosen to complement a range of dishes.
              </p>
            </div>
          </div>
        </section>

        {/* Corima Story & Cooking Philosophy Section — One Continuous Page */}
        <section style={{ backgroundColor: '#d1d1d1', padding: '100px 120px', position: 'relative', minHeight: '1400px' }}>
          
          {/* Part 1: Corima Story — Using Absolute Positioning */}
          <div style={{ position: 'relative', height: '600px', marginBottom: '200px' }}>
            {/* Left — large quote */}
            <div style={{ position: 'absolute', top: '0', left: '0', width: '45%', paddingRight: '48px' }}>
              <h2
                className="font-light leading-tight text-pretty"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)', letterSpacing: '-0.02em', fontWeight: '300', color: '#000' }}
              >
                The name Corima comes from the Tarahumara word for &ldquo;circle of sharing.&rdquo;
              </h2>
            </div>

            {/* Center — body paragraphs */}
            <div style={{ position: 'absolute', top: '320px', left: 'calc(45% + 0px)', width: '365px', paddingRight: '48px' }}>
              <p className="leading-relaxed mb-8" style={{ fontSize: '1.2vw', letterSpacing: '-0.01em', color: '#000' }}>
                The restaurant is built around gathering people at the table and sharing the culinary traditions of Northern Mexico&mdash;particularly Sonora and Chihuahua, regions rarely represented in New York City.
              </p>
              <p className="leading-relaxed" style={{ fontSize: '1.2vw', letterSpacing: '-0.01em', color: '#000' }}>
                Chef Fidel Caballero was raised between Ciudad Ju&aacute;rez and El Paso, where the food of the border region continues to shape his cooking. His perspective was further developed in the Basque Country at Mart&iacute;n Berasategui and in New York as sous chef at Contra, experiences that refined his approach while keeping it grounded in tradition.
              </p>
            </div>

            {/* Right — tall portrait photo */}
            <div style={{ position: 'absolute', top: '40px', right: '0', width: '274px', height: '365px' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2781%204-AhmiUqGR3K9yrP5KneeCueYQcdD5aE.png"
                alt="Chef Fidel Caballero at Corima"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Part 2: Cooking Philosophy */}
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 420px', gap: '80px', alignItems: 'start', marginBottom: '120px' }}>
            
            {/* Left — small plated dish image */}
            <div style={{ width: '240px', height: '240px' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CorimaNov24_JovaniDemetrie_22_Original%201-oG0EDkxE2vNa7KNJ0WDNsyohkWo3nQ.png"
                alt="Plated dish at Corima"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center — SVG text graphics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '20px' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20cooking%20is%20guided%20by%20a%20broad%20Mexican%20pantry%2C-hz1gSefWftkAEyTg0g3y7iQCFtZLtf.svg"
                alt="The cooking is guided by a broad Mexican pantry,"
                style={{ width: '100%', maxWidth: '440px', height: 'auto' }}
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shaped%20in%20practice%20by%20the%20seasons%20and%20conditions%20of%20the%20Northeast.-uVDOBJpgOEi1oNID5uBSA7NqL02VSR.svg"
                alt="shaped in practice by the seasons and conditions of the Northeast."
                style={{ width: '100%', maxWidth: '520px', height: 'auto' }}
              />
            </div>

            {/* Right — larger chef cooking image */}
            <div style={{ width: '420px', height: '320px' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/622368293_18070748996628283_84941654303889225_n%20%281%29%205-jj4VRg7UvADc1NfSYvY494CRI8A1g8.png"
                alt="Chef cooking at Corima"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Part 3: Philosophy & Sharing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '100px', marginBottom: '120px' }}>
            
            {/* Left — body paragraphs */}
            <div style={{ maxWidth: '450px' }}>
              <p className="leading-relaxed mb-8" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
                The menu follows a steady rhythm of change, adapting traditional foundations to reflect what is available at a given moment. This approach reflects what Fidel Caballero describes as Progressive Mexican cooking, rooted in tradition while remaining forward-looking. It draws from a broad Mexican pantry alongside ingredients from the Northeast. Familiar preparations shift over time, adjusting to seasonality while maintaining a clear sense of origin.
              </p>
              <p className="leading-relaxed" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
                The beverage program follows a similar direction, with a focus on Northern Mexico&apos;s distilling traditions and a particular emphasis on sotol from the Chihuahuan Desert. Selections are made with attention to origin and production, supporting a program that aligns closely with the structure of the menu.
              </p>
            </div>

            {/* Right — two stacked portrait images */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ width: '100%', aspectRatio: '3/4' }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CorimaDec24_JovaniDemetrie_67_Original%203-IRGsT5HtQAQEdo07xOECpKYlsPUWqx.png"
                  alt="Tattooed hand with knife"
                  className="w-full h-full object-cover"
                />
              </div>
              <div style={{ width: '100%', aspectRatio: '3/4' }}>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/469953188_596077342798134_5158409090500818209_n%201-CAZps8ywcGcqpSbnKINrH34fgR90IK.png"
                  alt="Kitchen interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Part 4: Sharing Philosophy */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '100px' }}>
            
            {/* Left — large editorial quote */}
            <div>
              <h3
                className="font-light leading-tight text-pretty"
                style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.02em', fontWeight: '300', color: '#000', lineHeight: '1.3' }}
              >
                The idea of sharing extends beyond the dining room, shaping the relationships that support the kitchen&apos;s work,
              </h3>
            </div>

            {/* Right — continuation text, indented */}
            <div style={{ paddingTop: '60px', textAlign: 'center' }}>
              <p
                style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.02em', color: '#000', lineHeight: '1.4', fontWeight: '300' }}
              >
                from farmers and foragers to artisans and guests.
              </p>
            </div>
          </div>

          {/* Part 5: Producer Partnership & Recognition */}
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '100px', marginTop: '120px', alignItems: 'start' }}>
            
            {/* Left — kitchen photo */}
            <div style={{ width: '320px', height: '320px' }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2818%202-61XN6Jf0t53SCva3TBf63oJO510MRq.jpg"
                alt="Two chefs in the kitchen"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right — two body paragraphs */}
            <div style={{ maxWidth: '450px' }}>
              <p className="leading-relaxed mb-8" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
                Corima works closely with producers who follow seasonal growing and thoughtful stewardship, allowing ingredients to be used with care. This approach is grounded in seasonal sourcing, whole-product utilization, and long-term partnerships with producers whose work continues to shape what is served.
              </p>
              <p className="leading-relaxed" style={{ fontSize: '1vw', letterSpacing: '-0.01em', color: '#000' }}>
                Within its first year, Corima earned a Michelin star, was named one of Bon Appétit&apos;s Best New Restaurants of 2024, and received a James Beard Award nomination. The restaurant has since been recognized as #36 on North America&apos;s 50 Best Restaurants list, a reflection of the community, craft, and shared table that continue to define Corima.
              </p>
            </div>
          </div>

        </section>
      </div>

      {/* Footer — spans full width at bottom edge */}
      <footer style={{ backgroundColor: '#d1d1d1', width: '100%', padding: '40px 24px 12px 24px' }}>
        <div className="flex w-full items-center gap-8 justify-between">
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Contact</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>3 Allen St. NY 10002</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Tuesday - Saturday &nbsp; 5:30PM - 10PM</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Instagram</p>
          <p style={{ fontSize: '16px', color: '#000', margin: '0', fontWeight: '500' }}>Spotify</p>
          <img src="/footer-logo.png" alt="Corima" style={{ width: '24px', height: '24px', objectFit: 'contain', filter: 'invert(1)' }} />
        </div>
      </footer>
    </div>
  )
}
