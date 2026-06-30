import { useState, useEffect } from 'react'

export function useCarousel(slideCount, intervalMs = 6000) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [isPaused, slideCount, intervalMs, prefersReducedMotion])

  const next = () => setActiveSlide((p) => (p + 1) % slideCount)
  const prev = () => setActiveSlide((p) => (p - 1 + slideCount) % slideCount)
  const goTo = (index) => setActiveSlide(index)

  return { activeSlide, isPaused, setIsPaused, next, prev, goTo, prefersReducedMotion }
}
