import PillButton from '../ui/PillButton'

const services = [
  {
    num: '01',
    title: 'Custom Fabrication',
    description: 'Tailored reactors, kettles, and vessels built to your exact process specifications and site constraints.',
  },
  {
    num: '02',
    title: 'Industrial Automation',
    description: 'Integration-ready equipment with instrumentation ports, agitator mounts, and jacketed systems.',
  },
]

export default function ManufacturingShowcase() {
  return (
    <section className="mx-4 my-10 rounded-2xl bg-ind-black p-8 text-white md:mx-6 md:p-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="label-text text-xs text-ind-orange">Manufacturing</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            Manufacturing Services Tailored for Your Industry
          </h2>
          <ul className="mt-8 space-y-6">
            {services.map((item) => (
              <li key={item.num} className="flex gap-4">
                <span className="font-display text-2xl font-bold text-ind-orange">{item.num}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-grey-light">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <PillButton to="/products" className="mt-8">
            View All Products
          </PillButton>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80"
              alt="Manufacturing facility"
              className="h-80 w-full object-cover md:h-96"
            />
          </div>
          <div className="absolute -bottom-4 left-4 max-w-xs rounded-2xl bg-white p-5 text-ind-black shadow-xl md:-bottom-6 md:left-6">
            <p className="font-display text-2xl font-bold text-ind-orange">45+</p>
            <p className="mt-1 text-sm font-semibold">Years of Fabrication Excellence</p>
            <p className="mt-1 text-xs text-grey-dark">
              Delivering precision-engineered equipment to India&apos;s leading industrial plants.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
