import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SiteHeader from '../components/layout/SiteHeader'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { industries } from '../data/industries'

export default function IndustriesPage() {
  return (
    <>
      <SiteHeader />
      <PageHero
        title="Industries We Serve"
        subtitle="Precision-engineered equipment for every major industrial sector across India."
        breadcrumb="Industries"
        image="https://images.unsplash.com/photo-1513828583688-c52645db79bc?w=1920&q=80"
      />

      <section className="py-20 px-4">
        <SectionHeading
          eyebrow="Sectors"
          title="Built for the Heaviest Industries"
          subtitle="From cement kilns to pharmaceutical clean rooms, GVT delivers equipment engineered for your sector."
        />

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="group overflow-hidden rounded-2xl border border-border-light bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ind-black/70 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-xl font-bold text-white">
                  {industry.name}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-grey-dark">{industry.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industry.products.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-off-white px-3 py-1 text-xs font-medium text-grey-dark"
                    >
                      {p}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ind-orange hover:text-ind-orange-hover"
                >
                  Discuss Your Project
                  <ArrowUpRight size={14} className="cta-arrow-icon" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
