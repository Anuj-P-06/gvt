import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PageHero({ title, subtitle, breadcrumb, image }) {
  return (
    <section
      className="relative mx-4 mt-4 flex h-72 items-end overflow-hidden rounded-2xl sm:mx-6 sm:mt-6"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-ind-black/90 via-ind-black/50 to-ind-black/20" />
      <div className="relative z-10 p-8 md:p-10">
        <nav className="mb-4 flex items-center gap-1 text-xs text-white/60" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white">{breadcrumb}</span>
        </nav>
        <h1 className="font-display text-4xl font-bold text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-lg text-sm text-white/70">{subtitle}</p>}
      </div>
    </section>
  )
}
