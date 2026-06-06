import Home from '../page'

// /about is a real, crawlable URL (eligible for Google sitelinks). It renders
// the full homepage; the client component detects the /about pathname and
// scrolls to the About section automatically.
export default function AboutPage() {
  return <Home />
}
