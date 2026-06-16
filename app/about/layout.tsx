import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About CORIMA — a contemporary Mexican restaurant in New York rooted in the Tarahumara principle of corima, the circle of sharing. Learn about Chef Fidel Caballero and our progressive Mexican philosophy.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | CORIMA',
    description:
      'A contemporary Mexican restaurant in New York rooted in the Tarahumara principle of corima — the circle of sharing.',
    url: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
