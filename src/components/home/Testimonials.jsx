import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/industries'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section className="bg-off-white py-20 px-4">
      <SectionHeading
        eyebrow="Client Stories"
        title="Trusted by India's Industrial Leaders"
        subtitle="Hear from the plant heads and project managers who rely on GVT Engineering."
      />

      <div className="mx-auto mt-10 flex max-w-2xl justify-center gap-3">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={`overflow-hidden rounded-full transition-all duration-300 ${
              active === i ? 'ring-2 ring-ind-orange ring-offset-2' : 'opacity-60 hover:opacity-100'
            }`}
            aria-label={`View testimonial from ${t.name}`}
          >
            <img src={t.avatar} alt={t.name} className="h-12 w-12 object-cover" />
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border-light bg-white p-8 text-center md:p-10"
          >
            <Quote size={32} className="mx-auto text-ind-orange/30" />
            <p className="mt-4 text-base leading-relaxed text-grey-dark">&ldquo;{current.quote}&rdquo;</p>
            <div className="mt-6">
              <p className="font-display font-bold text-ind-black">{current.name}</p>
              <p className="text-sm text-grey-dark">{current.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
