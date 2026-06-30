import { Truck, Globe } from 'lucide-react'
import PillButton from '../ui/PillButton'

const highlights = [
  {
    icon: Truck,
    title: 'Road & Rail Transport',
    description: 'Oversized equipment transported safely with escort vehicles across all states.',
  },
  {
    icon: Globe,
    title: 'Pan-India Network',
    description: 'Delivery to every major industrial hub — from Gujarat to Odisha, Punjab to Tamil Nadu.',
  },
]

export default function GlobalReach() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="label-text text-xs text-ind-orange">Nationwide Reach</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ind-black md:text-4xl">
            From Our Factory Floor to Your Plant Gate
          </h2>
          <p className="mt-4 text-grey-dark">
            With 500+ successful deliveries across India, GVT Engineering ensures your equipment
            arrives safely — by road, cargo, or sea — with complete installation support.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-light p-5 transition-shadow hover:shadow-md"
              >
                <item.icon size={22} className="text-ind-orange" />
                <h3 className="mt-3 font-display text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-xs text-grey-dark">{item.description}</p>
              </div>
            ))}
          </div>

          <PillButton to="/contact" className="mt-8">
            Plan Your Delivery
          </PillButton>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80"
            alt="Equipment delivery nationwide"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
