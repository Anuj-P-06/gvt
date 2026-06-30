import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

const cards = [
  {
    tag: 'Phase 01',
    title: 'Consultation & Planning',
    description: 'Site assessment, process analysis, and detailed project scoping with our engineering team.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    tag: 'Phase 02',
    title: 'Design & Prototyping',
    description: 'CAD modeling, stress analysis, and client-approved drawings before fabrication begins.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  },
  {
    tag: 'Phase 03',
    title: 'Manufacturing & Testing',
    description: 'ISO-certified fabrication, hydro testing, and quality inspection before dispatch.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
]

export default function WhatWeBuild() {
  return (
    <section className="bg-white py-20 px-4">
      <SectionHeading
        eyebrow="Our Process"
        title="What We Manufacture, We Build with Precision"
        subtitle="Full-service industrial fabrication team handles every phase with precision."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl"
            whileHover="hover"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
              variants={{ hover: { scale: 1.03 } }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ind-black/90 via-ind-black/30 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ind-black">
              {card.tag}
            </span>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-lg font-bold text-white">{card.title}</h3>
              <p className="mt-1 text-xs text-white/70">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
