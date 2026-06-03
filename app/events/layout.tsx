import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Collaboration dinners and special events at CORIMA, featuring guest chefs and partner restaurants. Explore upcoming and past collaborations.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    title: 'Events | CORIMA',
    description:
      'Collaboration dinners and special events at CORIMA, featuring guest chefs and partner restaurants.',
    url: '/events',
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
