export function renderSectionHeading({ eyebrow, title, subtitle, light = false, align = 'center', className = '' }) {
  const alignClass = align === 'left' ? 'text-left mx-0 max-w-none' : 'mx-auto max-w-2xl text-center'
  const titleColor = light ? 'text-white' : 'text-ind-black'
  const subtitleColor = light ? 'text-grey-light' : 'text-grey-dark'

  return `
    <div class="${alignClass} ${className}">
      ${eyebrow ? `<span class="label-text mb-4 inline-block text-xs text-ind-orange">${eyebrow}</span>` : ''}
      <h2 class="font-display text-3xl font-bold leading-tight md:text-4xl ${titleColor}">${title}</h2>
      ${subtitle ? `<p class="mt-4 text-base ${subtitleColor}">${subtitle}</p>` : ''}
    </div>
  `
}
