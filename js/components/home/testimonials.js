import { testimonials } from '../../../data/industries.js'
import { renderSectionHeading } from '../ui/section-heading.js'
import { crossfadeSwap, icon } from '../../utilities.js'

export function initTestimonials(root) {
  if (!root) return

  let active = 0
  const headingHost = root.querySelector('[data-testimonials-heading]')
  const avatarsHost = root.querySelector('[data-testimonials-avatars]')
  const panelHost = root.querySelector('[data-testimonials-panel]')

  if (headingHost) {
    headingHost.innerHTML = renderSectionHeading({
      eyebrow: 'Client Stories',
      title: "Trusted by India's Industrial Leaders",
      subtitle: 'Hear from the plant heads and project managers who rely on GVT Engineering.',
    })
  }

  function renderPanel(index) {
    const t = testimonials[index]
    const panel = document.createElement('div')
    panel.className = 'rounded-2xl border border-border-light bg-white p-8 text-center md:p-10 crossfade-active'
    panel.innerHTML = `
      ${icon('Quote', 32, 'mx-auto text-ind-orange/30')}
      <p class="mt-4 text-base leading-relaxed text-grey-dark">&ldquo;${t.quote}&rdquo;</p>
      <div class="mt-6">
        <p class="font-display font-bold text-ind-black">${t.name}</p>
        <p class="text-sm text-grey-dark">${t.role}</p>
      </div>
    `
    return panel
  }

  testimonials.forEach((t, i) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = `overflow-hidden rounded-full transition-all duration-300 ${
      i === 0 ? 'ring-2 ring-ind-orange ring-offset-2' : 'opacity-60 hover:opacity-100'
    }`
    btn.setAttribute('aria-label', `View testimonial from ${t.name}`)
    btn.innerHTML = `<img src="${t.avatar}" alt="${t.name}" class="h-12 w-12 object-cover" loading="lazy" />`
    btn.addEventListener('click', () => {
      active = i
      avatarsHost.querySelectorAll('button').forEach((b, idx) => {
        b.className = `overflow-hidden rounded-full transition-all duration-300 ${
          idx === active ? 'ring-2 ring-ind-orange ring-offset-2' : 'opacity-60 hover:opacity-100'
        }`
      })
      crossfadeSwap(panelHost, () => renderPanel(active))
    })
    avatarsHost.appendChild(btn)
  })

  panelHost.replaceChildren(renderPanel(0))
}
