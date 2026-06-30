import { useSearchParams } from 'react-router-dom'
import SiteHeader from '../components/layout/SiteHeader'
import PageHero from '../components/layout/PageHero'
import ProductCard from '../components/ui/ProductCard'
import PillButton from '../components/ui/PillButton'
import { products, categories } from '../data/products'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCat = searchParams.get('cat') || 'all'

  const filtered =
    activeCat === 'all' ? products : products.filter((p) => p.category === activeCat)

  return (
    <>
      <SiteHeader />
      <PageHero
        title="Our Products"
        subtitle="Precision-engineered reactors, kettles, tanks, and custom fabrication for India's heaviest industries."
        breadcrumb="Products"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
      />

      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                activeCat === 'all'
                  ? 'bg-ind-orange text-white'
                  : 'border border-border-light bg-white text-grey-dark hover:border-ind-orange'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSearchParams({ cat: cat.slug })}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeCat === cat.slug
                    ? 'bg-ind-orange text-white'
                    : 'border border-border-light bg-white text-grey-dark hover:border-ind-orange'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-grey-dark">No products found in this category.</p>
          )}

          <div className="mt-16 rounded-2xl bg-ind-black p-10 text-center text-white">
            <h2 className="font-display text-2xl font-bold">Need a Custom Solution?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-grey-light">
              Our engineering team designs bespoke equipment tailored to your process requirements.
            </p>
            <PillButton to="/contact" className="mt-6">
              Request Custom Fabrication
            </PillButton>
          </div>
        </div>
      </section>
    </>
  )
}
