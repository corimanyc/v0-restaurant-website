import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CORIMA',
  description: 'Experience exceptional cuisine at CORIMA',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg?v=4',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
