import { Shield, Layers, Calculator, Clock, Award, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const services = [
  {
    icon: Shield,
    title: 'ISO Licensed & Insured',
    description: 'ISO 9001:2002 certified manufacturing with full insurance coverage for every project.',
    dark: false,
  },
  {
    icon: Layers,
    title: 'High-Quality Materials',
    description: 'Premium SS316, SS304, MS, and FRP materials sourced from certified suppliers.',
    dark: true,
  },
  {
    icon: Calculator,
    title: 'Free Technical Estimates',
    description: 'Detailed technical quotations with engineering specifications at no cost.',
    dark: false,
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Optimized production schedules to meet your plant shutdown windows and deadlines.',
    dark: false,
  },
  {
    icon: Award,
    title: 'Industry Warranty',
    description: 'Comprehensive warranty on all fabricated equipment with post-delivery support.',
    dark: false,
  },
  {
    icon: Star,
    title: 'Leading Reputation',
    description: 'Trusted by 500+ projects across cement, steel, pharma, and water treatment sectors.',
    dark: false,
  },
]

export default function ComprehensiveServices() {
  return (
    <section className="rounded-t-[3rem] bg-off-white py-20 px-4">
      <SectionHeading
        eyebrow="Why GVT"
        title="Comprehensive Industrial Manufacturing Services"
        subtitle="Our commitment to quality, safety, and client satisfaction makes us the trusted choice across India."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className={`rounded-2xl p-8 text-left transition-shadow hover:shadow-md ${
              service.dark
                ? 'bg-ind-black text-white'
                : 'border border-border-light bg-white'
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ind-orange/10">
              <service.icon size={22} className="text-ind-orange" />
            </div>
            <h3 className="font-display text-lg font-bold">{service.title}</h3>
            <p className={`mt-2 text-sm ${service.dark ? 'text-grey-light' : 'text-grey-dark'}`}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
