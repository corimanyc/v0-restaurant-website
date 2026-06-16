import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the menu at CORIMA: a seasonal tasting menu of progressive Northern Mexican cuisine by Chef Fidel Caballero, plus à la carte dishes, signature cocktails, and a curated wine list.',
  alternates: {
    canonical: '/menu',
  },
  openGraph: {
    title: 'Menu | CORIMA',
    description:
      'A seasonal tasting menu of progressive Northern Mexican cuisine, à la carte dishes, cocktails, and a curated wine list.',
    url: '/menu',
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
