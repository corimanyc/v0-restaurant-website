import Home from '../page'

// /menu is a real, crawlable URL (eligible for Google sitelinks). It renders
// the full homepage; the client component detects the /menu pathname and opens
// the menu overlay automatically.
export default function MenuPage() {
  return <Home />
}
