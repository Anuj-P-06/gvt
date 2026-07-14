import { prefersReducedMotion } from '../utilities.js'

export function initCountUp(element, end, duration = 1500) {
  const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10)
  const suffix = String(end).replace(/[\d]/g, '')
  const valueEl = element.querySelector('[data-count-value]') || element
  let hasStarted = false

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || hasStarted) return
      hasStarted = true
      observer.disconnect()

      if (prefersReducedMotion()) {
        valueEl.textContent = `${numericEnd}${suffix}`
        return
      }

      const startTime = performance.now()
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        valueEl.textContent = `${Math.floor(eased * numericEnd)}${suffix}`
        if (progress < 1) requestAnimationFrame(animate)
        else valueEl.textContent = `${numericEnd}${suffix}`
      }
      requestAnimationFrame(animate)
    },
    { threshold: 0.3 }
  )

  observer.observe(element)
}

export function initAllCountUps(root = document) {
  root.querySelectorAll('[data-count-up]').forEach((el) => {
    initCountUp(el, el.dataset.countUp)
  })
}
