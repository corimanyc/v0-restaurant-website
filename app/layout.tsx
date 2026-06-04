import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CORIMA | Contemporary Mexican Restaurant',
    template: '%s | CORIMA',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'v0.app',
  keywords: [
    'CORIMA',
    'Mexican restaurant',
    'contemporary Mexican',
    'fine dining',
    'à la carte',
    'cocktails',
    'wine list',
    'tasting menu',
    'restaurant reservations',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/icon.svg?v=6', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'CORIMA | Contemporary Mexican Restaurant',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'CORIMA — contemporary Mexican cuisine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CORIMA | Contemporary Mexican Restaurant',
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'restaurant',
}

export const viewport: Viewport = {
  themeColor: '#1f1c18',
  colorScheme: 'dark',
}

/* Restaurant structured data (JSON-LD). PLACEHOLDER values — replace address,
 * phone, hours, cuisine, price range, and social links with the real details. */
const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  servesCuisine: ['Mexican', 'Contemporary Mexican'],
  priceRange: '$$$', // TODO: confirm price range
  acceptsReservations: true,
  telephone: '+1-000-000-0000', // TODO: replace with real phone number
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3 Allen St',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10002',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      // From the on-site footer: Tuesday–Saturday, 5:30PM–10PM
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '17:30',
      closes: '22:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/', // TODO: replace with real Instagram URL
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Switzer-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Switzer-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" style={{ fontFamily: "'Switzer', system-ui, sans-serif", fontWeight: 400, backgroundColor: '#1f1c18' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
