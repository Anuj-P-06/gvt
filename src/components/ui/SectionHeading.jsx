export default function SectionHeading({ eyebrow, title, subtitle, light = false, align = 'center', className = '' }) {
  const alignClass = align === 'left' ? 'text-left mx-0 max-w-none' : 'mx-auto max-w-2xl text-center'

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`label-text mb-4 inline-block text-xs ${
            light ? 'text-ind-orange' : 'text-ind-orange'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight md:text-4xl ${
          light ? 'text-white' : 'text-ind-black'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base ${
            light ? 'text-grey-light' : 'text-grey-dark'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
