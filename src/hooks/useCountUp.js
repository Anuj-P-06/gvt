import { useState, useEffect, useRef } from 'react'

export function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10)
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericEnd))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(numericEnd)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  const suffix = String(end).replace(/[\d]/g, '')
  return { count, suffix, ref }
}
