import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Press and recognition for CORIMA, including features from The New York Times, Bon Appétit, James Beard Foundation, and The Best Chef Awards.',
  alternates: {
    canonical: '/press',
  },
  openGraph: {
    title: 'Press | CORIMA',
    description:
      'Press and recognition for CORIMA, including features from The New York Times, Bon Appétit, James Beard Foundation, and The Best Chef Awards.',
    url: '/press',
  },
}

export default function PressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
