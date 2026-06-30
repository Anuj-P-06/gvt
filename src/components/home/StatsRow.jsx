import { useCountUp } from '../../hooks/useCountUp'

const stats = [
  { value: '45+', label: 'Years of Industrial Expertise' },
  { value: '500+', label: 'Projects Delivered Nationwide' },
  { value: '10+', label: 'Core Industries Served' },
  { value: '100%', label: 'ISO Certified Manufacturing' },
]

function StatItem({ value, label }) {
  const { count, suffix, ref } = useCountUp(value)

  return (
    <div ref={ref} className="flex flex-col items-center px-6 text-center">
      <span className="font-display text-5xl font-bold text-ind-black">
        {count}
        {suffix}
      </span>
      <span className="mt-2 max-w-[140px] text-sm text-grey-dark">{label}</span>
    </div>
  )
}

export default function StatsRow() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex justify-center py-4 ${
              i % 2 === 0 ? 'border-r border-border-light' : ''
            } ${i < 2 ? 'md:border-r md:border-border-light' : ''} ${
              i === 1 ? 'border-r-0 md:border-r md:border-border-light' : ''
            } ${i === 3 ? 'md:border-r-0' : ''}`}
          >
            <StatItem value={stat.value} label={stat.label} />
          </div>
        ))}
      </div>
    </section>
  )
}
