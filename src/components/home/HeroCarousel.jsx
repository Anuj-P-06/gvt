import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, Play, ChevronDown } from 'lucide-react'
import { heroSlides } from '../../data/heroSlides'
import { WHATSAPP_LINK } from '../../data/constants'
import { useCarousel } from '../../hooks/useCarousel'
import HeroNav from '../layout/HeroNav'

export default function HeroCarousel() {
  const navigate = useNavigate()
  const { activeSlide, setIsPaused, next, prev, goTo, prefersReducedMotion } = useCarousel(
    heroSlides.length,
    6000
  )

  const slide = heroSlides[activeSlide]

  const handleCta = (s) => {
    if (s.ctaExternal) {
      window.open(s.ctaLink, '_blank', 'noopener,noreferrer')
    } else {
      navigate(s.ctaLink)
    }
  }

  const bgInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }
  const bgAnimate = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
  const bgExit = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.0 }

  return (
    <section
      className="relative mx-auto mt-4 h-[520px] max-w-[1400px] cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing sm:mt-6 sm:h-[580px] md:h-[640px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsPaused(false)
      }}
    >
      <HeroNav />

      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -100) next()
          else if (info.offset.x > 100) prev()
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
            initial={bgInitial}
            animate={bgAnimate}
            exit={bgExit}
            transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          />
        </AnimatePresence>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <div
        className="absolute bottom-8 left-6 z-20 max-w-xl md:bottom-12 md:left-12"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div key={activeSlide}>
            <motion.span
              className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              {slide.eyebrow}
            </motion.span>

            <motion.h1
              className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {slide.heading}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-base text-white/80"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {slide.subtext}
            </motion.p>

            <motion.button
              type="button"
              onClick={() => handleCta(slide)}
              className="cta-btn mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-ind-black"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {slide.ctaText}
              <ArrowUpRight size={18} className="cta-arrow-icon" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-32 right-6 z-20 hidden md:block md:right-12">
        <div className="relative h-28 w-44 overflow-hidden rounded-lg bg-charcoal-card/90 backdrop-blur">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80"
            alt="Manufacturing process preview"
            className="h-full w-full object-cover opacity-60"
          />
          <span className="absolute left-2 top-2 text-xs text-white/60">/01</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Play size={16} className="ml-0.5 text-white" fill="white" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-white">See Our Manufacturing Process</p>
      </div>

      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-28 right-6 z-20 hidden h-20 w-20 items-center justify-center md:flex md:bottom-32 md:right-12 lg:bottom-36"
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        aria-label="Get a quote on WhatsApp"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path id="quoteCircle" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
          </defs>
          <circle cx="50" cy="50" r="38" fill="#FF5A1F" />
          <text fill="white" fontSize="8" fontWeight="600" letterSpacing="2">
            <textPath href="#quoteCircle" startOffset="0">
              GET A QUOTE • GET A QUOTE •
            </textPath>
          </text>
        </svg>
        <ChevronDown size={20} className="absolute text-white" />
      </motion.a>

      <div className="absolute right-6 top-28 z-30 hidden flex-col gap-2 md:flex md:right-12">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="rounded-full"
            animate={{
              width: 6,
              height: activeSlide === index ? 24 : 6,
              backgroundColor: activeSlide === index ? '#FF5A1F' : 'rgba(255,255,255,0.3)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-4">
        <motion.button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-card/80 text-white backdrop-blur transition-colors duration-200 hover:bg-ind-orange"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <motion.button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal-card/80 text-white backdrop-blur transition-colors duration-200 hover:bg-ind-orange"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
          <ChevronRight size={20} />
        </motion.button>

        <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-white/20">
          <motion.div
            key={activeSlide}
            className="h-full bg-ind-orange"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>

        <div className="font-display text-lg font-bold text-white">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              0{activeSlide + 1}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm font-normal text-white/40">/04</span>
        </div>
      </div>
    </section>
  )
}
