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

export default function HeroNav() {
  const location = useLocation()

  return (
    <>
      <nav
        className="absolute left-0 right-0 top-0 z-30 mx-4 mt-4 flex items-center justify-between rounded-full bg-ind-black/80 px-4 py-3 backdrop-blur md:mx-6 md:mt-6 md:px-6"
        aria-label="Main navigation"
      >
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
                  isActive
                    ? 'bg-ind-orange text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <PillButton variant="white" to="/contact" className="hidden px-4 py-2 text-xs sm:inline-flex">
            Track Enquiry
          </PillButton>
          <PillButton to="/contact" className="px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm">
            Get In Touch
            <ArrowUpRight size={16} />
          </PillButton>
        </div>
      </nav>

      <div className="absolute left-4 top-24 z-30 md:left-12 md:top-28">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          ISO 9001:2002 Certified
          <span className="text-white/70">Learn more →</span>
        </Link>
      </div>
    </>
  )
}
