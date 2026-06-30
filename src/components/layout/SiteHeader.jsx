import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PillButton from '../ui/PillButton'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Industries', path: '/industries' },
  { label: 'Contact', path: '/contact' },
]

export default function SiteHeader() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 mx-4 mt-4 rounded-full bg-ind-black/95 px-4 py-3 backdrop-blur md:mx-6 md:px-6">
      <nav className="flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="rounded-full bg-charcoal-card px-4 py-2">
          <span className="font-display text-lg font-bold">
            <span className="text-ind-orange">GVT</span>
            <span className="text-white"> Engineering</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-charcoal-card/80 px-2 py-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ind-orange text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <PillButton to="/contact" className="px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm">
          Get In Touch
          <ArrowUpRight size={16} />
        </PillButton>
      </nav>
    </header>
  )
}
