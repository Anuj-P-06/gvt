import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border-light bg-white transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ind-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-bold text-ind-black">{product.name}</h3>
        <p className="mt-2 text-sm text-grey-dark line-clamp-2">{product.description}</p>
        <ul className="mt-4 space-y-1">
          {product.specs.slice(0, 2).map((spec) => (
            <li key={spec} className="text-xs text-grey-dark">
              • {spec}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ind-orange transition-colors hover:text-ind-orange-hover"
        >
          Enquire Now
          <ArrowUpRight size={14} className="cta-arrow-icon" />
        </Link>
      </div>
    </div>
  )
}
