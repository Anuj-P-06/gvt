import { heroSlides } from '../../../data/heroSlides.js'
import { WHATSAPP_LINK } from '../../../data/constants.js'
import { createCarousel } from '../../hooks/carousel.js'
import { icon, prefersReducedMotion } from '../../utilities.js'

export function initHeroCarousel(root) {
  if (!root) return

  const carousel = createCarousel(heroSlides.length, 6000)
  const bgLayer = root.querySelector('[data-hero-bg]')
  const textLayer = root.querySelector('[data-hero-text]')
  const progressBar = root.querySelector('[data-hero-progress]')
  const slideNumber = root.querySelector('[data-hero-number]')
  const dotNav = root.querySelector('[data-hero-dots]')
  const prevBtn = root.querySelector('[data-hero-prev]')
  const nextBtn = root.querySelector('[data-hero-next]')
  const dragLayer = root.querySelector('[data-hero-drag]')

  function renderBackground(index) {
    const slide = heroSlides[index]
    const el = document.createElement('div')
    el.className = 'absolute inset-0 bg-cover bg-center'
    el.style.backgroundImage = `url(${slide.bgImage})`
    if (!prefersReducedMotion()) {
      el.classList.add('hero-bg-enter')
      requestAnimationFrame(() => {
        el.classList.remove('hero-bg-enter')
        el.classList.add('hero-bg-active')
      })
    }
    return el
  }

  function renderText(index) {
    const slide = heroSlides[index]
    const wrap = document.createElement('div')
    wrap.innerHTML = `
      <span class="hero-text-item mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur" data-delay="0">${slide.eyebrow}</span>
      <h1 class="hero-text-item font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl" data-delay="1">${slide.heading}</h1>
      <p class="hero-text-item mt-4 max-w-md text-base text-white/80" data-delay="2">${slide.subtext}</p>
      <button type="button" class="hero-text-item cta-btn mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-ind-black" data-delay="3" data-hero-cta>
        ${slide.ctaText}
        ${icon('ArrowUpRight', 18, 'cta-arrow-icon')}
      </button>
    `

    const btn = wrap.querySelector('[data-hero-cta]')
    btn.addEventListener('click', () => {
      if (slide.ctaExternal) window.open(slide.ctaLink, '_blank', 'noopener,noreferrer')
      else window.location.href = slide.ctaLink
    })

    if (!prefersReducedMotion()) {
      wrap.querySelectorAll('.hero-text-item').forEach((item) => {
        const delay = Number(item.dataset.delay) * 100
        setTimeout(() => item.classList.add('is-visible'), delay)
      })
    } else {
      wrap.querySelectorAll('.hero-text-item').forEach((item) => item.classList.add('is-visible'))
    }

    return wrap
  }

  function swapSlide(index) {
    const oldBg = bgLayer.firstElementChild
    const newBg = renderBackground(index)
    if (oldBg && !prefersReducedMotion()) {
      oldBg.classList.remove('hero-bg-active')
      oldBg.classList.add('hero-bg-exit')
      setTimeout(() => oldBg.remove(), 900)
    } else if (oldBg) {
      oldBg.remove()
    }
    bgLayer.appendChild(newBg)

    const oldText = textLayer.firstElementChild
    if (oldText && !prefersReducedMotion()) {
      oldText.querySelectorAll('.hero-text-item').forEach((item) => {
        item.classList.remove('is-visible')
        item.classList.add('is-exiting')
      })
      setTimeout(() => {
        textLayer.replaceChildren(renderText(index))
      }, 300)
    } else {
      textLayer.replaceChildren(renderText(index))
    }

    if (progressBar) {
      progressBar.style.transition = 'none'
      progressBar.style.width = '0%'
      requestAnimationFrame(() => {
        if (!prefersReducedMotion()) {
          progressBar.style.transition = 'width 6s linear'
          progressBar.style.width = '100%'
        } else {
          progressBar.style.width = '100%'
        }
      })
    }

    if (slideNumber) slideNumber.textContent = `0${index + 1}`

    dotNav?.querySelectorAll('[data-dot]').forEach((dot, i) => {
      dot.style.height = i === index ? '24px' : '6px'
      dot.style.backgroundColor = i === index ? '#295e8e' : 'rgba(255,255,255,0.3)'
    })
  }

  heroSlides.forEach((_, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.dataset.dot = String(index)
    dot.className = 'rounded-full transition-all duration-300'
    dot.style.width = '6px'
    dot.style.height = index === 0 ? '24px' : '6px'
    dot.style.backgroundColor = index === 0 ? '#295e8e' : 'rgba(255,255,255,0.3)'
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`)
    dot.addEventListener('click', () => carousel.goTo(index))
    dotNav?.appendChild(dot)
  })

  carousel.subscribe(swapSlide)
  swapSlide(0)

  prevBtn?.addEventListener('click', () => carousel.prev())
  nextBtn?.addEventListener('click', () => carousel.next())

  root.addEventListener('mouseenter', () => carousel.setIsPaused(true))
  root.addEventListener('mouseleave', () => carousel.setIsPaused(false))
  root.addEventListener('focusin', () => carousel.setIsPaused(true))
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) carousel.setIsPaused(false)
  })

  if (dragLayer && !prefersReducedMotion()) {
    let startX = 0
    let dragging = false

    dragLayer.addEventListener('pointerdown', (e) => {
      dragging = true
      startX = e.clientX
      dragLayer.setPointerCapture(e.pointerId)
    })

    dragLayer.addEventListener('pointermove', (e) => {
      if (!dragging) return
      const delta = e.clientX - startX
      dragLayer.style.transform = `translateX(${delta * 0.2}px)`
    })

    dragLayer.addEventListener('pointerup', (e) => {
      if (!dragging) return
      dragging = false
      dragLayer.style.transform = ''
      const delta = e.clientX - startX
      if (delta < -100) carousel.next()
      else if (delta > 100) carousel.prev()
    })

    dragLayer.addEventListener('pointercancel', () => {
      dragging = false
      dragLayer.style.transform = ''
    })
  }
}

// Expose WHATSAPP_LINK for hero badge in HTML
export { WHATSAPP_LINK }
