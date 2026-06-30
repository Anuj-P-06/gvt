import SiteHeader from '../components/layout/SiteHeader'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import PillButton from '../components/ui/PillButton'
import { useCountUp } from '../hooks/useCountUp'

const milestones = [
  { year: '1979', event: 'GVT Engineering founded in Pune, Maharashtra' },
  { year: '1995', event: 'Expanded into galvanizing kettle manufacturing' },
  { year: '2005', event: 'Achieved ISO 9001:2002 certification' },
  { year: '2015', event: 'Crossed 300 nationwide project deliveries' },
  { year: '2024', event: '500+ projects delivered across 10+ core industries' },
]

function AboutStat({ value, label }) {
  const { count, suffix, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-4xl font-bold text-ind-orange">
        {count}
        {suffix}
      </span>
      <p className="mt-1 text-sm text-grey-dark">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <>
      <SiteHeader />
      <PageHero
        title="About GVT Engineering"
        subtitle="45+ years of industrial fabrication excellence, serving India's manufacturing backbone."
        breadcrumb="About Us"
        image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
      />

      <section className="py-20 px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Engineering India's Industrial Future Since 1979"
              subtitle="From a small fabrication workshop to one of India's most trusted industrial equipment manufacturers."
              align="left"
            />
            <p className="mt-6 text-grey-dark">
              GVT Engineering India Private Limited specializes in the design, fabrication, and delivery
              of custom industrial equipment — including reactors, pressure vessels, zinc kettles, and
              storage tanks — for cement, steel, chemical, pharma, and water treatment sectors.
            </p>
            <p className="mt-4 text-grey-dark">
              Our ISO 9001:2002 certified facility in Pune houses advanced welding, machining, and
              testing capabilities, enabling us to handle projects from 500L laboratory vessels to
              50,000L industrial tanks.
            </p>
            <PillButton to="/contact" className="mt-8">
              Work With Us
            </PillButton>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80"
              alt="GVT Engineering facility"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-off-white py-16 px-4">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          <AboutStat value="45+" label="Years Experience" />
          <AboutStat value="500+" label="Projects Delivered" />
          <AboutStat value="10+" label="Industries Served" />
          <AboutStat value="100%" label="ISO Certified" />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Timeline" title="Our Journey" className="text-center" />
          <div className="mt-12 space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="flex gap-6 border-l-2 border-ind-orange pl-6">
                <span className="font-display text-lg font-bold text-ind-orange">{m.year}</span>
                <p className="text-grey-dark">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
