import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'
import PillButton from '../ui/PillButton'
import { COMPANY } from '../../data/constants'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Industries', path: '/industries' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="mx-4 mb-4 rounded-2xl bg-ind-black pt-16 pb-8 text-white md:mx-6 md:mb-6">
      <div className="px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              Let&apos;s Build The Future Together
            </h2>
            <PillButton to="/contact" className="mt-6">
              Get Started
            </PillButton>
          </div>

          <div>
            <h3 className="label-text mb-4 text-xs text-grey-light">Contact</h3>
            <ul className="space-y-3 text-sm text-grey-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ind-orange" />
                {COMPANY.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-ind-orange" />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-ind-orange" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label-text mb-4 text-xs text-grey-light">Follow Us</h3>
            <div className="flex gap-3">
              {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-dark text-grey-light transition-colors hover:border-ind-orange hover:text-ind-orange"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none mt-16 overflow-hidden">
          <p className="font-display text-6xl font-bold text-white/10 md:text-8xl">
            GVT ⚙ Engineering
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-6 text-xs text-grey-light md:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
