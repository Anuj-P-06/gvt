import { icon } from '../../utilities.js'

const VARIANTS = {
  orange: 'bg-ind-orange text-white hover:bg-ind-orange-hover',
  white: 'bg-white text-ind-black hover:bg-off-white',
  dark: 'bg-charcoal-card text-white hover:bg-ind-black',
  outline: 'border border-border-light bg-transparent text-ind-black hover:bg-off-white',
}

export function renderPillButton({ children, href, variant = 'orange', className = '' }) {
  const base =
    'cta-btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200'
  const classes = `${base} ${VARIANTS[variant] || VARIANTS.orange} ${className}`
  return `<a href="${href}" class="${classes}">${children}</a>`
}

export function renderPillButtonEl({ children, href, variant = 'orange', className = '', target, rel }) {
  const a = document.createElement('a')
  a.href = href
  a.className = `cta-btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${VARIANTS[variant] || VARIANTS.orange} ${className}`
  if (target) a.target = target
  if (rel) a.rel = rel
  a.innerHTML = children
  return a
}

export function arrowIcon(size = 16) {
  return icon('ArrowUpRight', size, 'cta-arrow-icon')
}
