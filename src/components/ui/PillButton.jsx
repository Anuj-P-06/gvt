import { Link } from 'react-router-dom'

export default function PillButton({
  children,
  to,
  href,
  variant = 'orange',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200'

  const variants = {
    orange: 'bg-ind-orange text-white hover:bg-ind-orange-hover',
    white: 'bg-white text-ind-black hover:bg-off-white',
    dark: 'bg-charcoal-card text-white hover:bg-ind-black',
    outline: 'border border-border-light bg-transparent text-ind-black hover:bg-off-white',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
