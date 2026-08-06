import { prefersReducedMotion } from '../utilities.js'

export function createCarousel(slideCount, intervalMs = 6000, options = {}) {
  let activeSlide = 0
  let isPaused = false
  let timer = null
  let isScreenWide = options.screenWide ?? true
  const reducedMotion = prefersReducedMotion()

  function next() {
    activeSlide = (activeSlide + 1) % slideCount
    notify()
  }

  function prev() {
    activeSlide = (activeSlide - 1 + slideCount) % slideCount
    notify()
  }

  function goTo(index) {
    activeSlide = index
    notify()
  }

  function setIsPaused(paused) {
    isPaused = paused
    resetTimer()
  }

  function setScreenWide(wide) {
    isScreenWide = Boolean(wide)
    listeners.forEach((fn) => fn(activeSlide, { isScreenWide }))
  }

  const listeners = new Set()
  function notify() {
    listeners.forEach((fn) => fn(activeSlide, { isScreenWide }))
    resetTimer()
  }

  function resetTimer() {
    if (timer) clearInterval(timer)
    if (isPaused) return
    timer = setInterval(next, intervalMs)
  }

  function subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  }

  resetTimer()

  return {
    get activeSlide() {
      return activeSlide
    },
    get isScreenWide() {
      return isScreenWide
    },
    setScreenWide,
    setIsPaused,
    next,
    prev,
    goTo,
    subscribe,
    prefersReducedMotion: reducedMotion,
  }
}
