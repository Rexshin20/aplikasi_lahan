/**
 * Grafik dibuat dengan SVG murni agar warna dan bentuknya mengikuti
 * chart c3 / Chartist dari template lama tanpa library jQuery.
 */

const donutData = [
  { label: 'Penjualan Langsung', value: 25, color: '#edf2f6' },
  { label: 'Penjualan Rujukan', value: 15, color: '#5f76e8' },
  { label: 'Penjualan Afiliasi', value: 10, color: '#ff4f70' },
  { label: 'Penjualan Tidak Langsung', value: 15, color: '#01caf1' },
]

export function DonutChart() {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const total = donutData.reduce((sum, item) => sum + item.value, 0)
  let offset = 0

  return (
    <svg viewBox="0 0 200 200" className="h-[205px] w-full" role="img" aria-label="Grafik total penjualan">
      <g transform="rotate(-90 100 100)">
        {donutData.map((item) => {
          const length = (item.value / total) * circumference
          const dashOffset = -offset
          offset += length
          return (
            <circle
              key={item.label}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="18"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={dashOffset}
            >
              <title>{`${item.label}: ${item.value}`}</title>
            </circle>
          )
        })}
      </g>
      <text x="100" y="106" textAnchor="middle" className="fill-body font-sans text-[18px]">
        Penjualan
      </text>
    </svg>
  )
}

const barData = [
  { label: 'Jan', value: 5 },
  { label: 'Feb', value: 4 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 7 },
  { label: 'Mei', value: 5 },
  { label: 'Jun', value: 10 },
]

export function BarChart() {
  const height = 180
  const max = 12
  const step = 48

  return (
    <svg viewBox="0 0 330 230" className="h-[255px] w-full" role="img" aria-label="Grafik penghasilan bersih">
      {[0, 4, 8, 12].map((tick) => {
        const y = height - (tick / max) * height
        return (
          <g key={tick}>
            <line x1="26" x2="325" y1={y} y2={y} stroke="#e8eaec" strokeWidth="1" />
            <text x="14" y={y + 4} className="fill-muted font-sans text-[11px]">
              {tick}
            </text>
          </g>
        )
      })}
      {barData.map((item, index) => {
        const barHeight = (item.value / max) * height
        const x = 38 + index * step
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={height - barHeight}
              width="22"
              height={barHeight}
              fill="#5f76e8"
              rx="1"
            >
              <title>{`${item.label}: ${item.value}`}</title>
            </rect>
            <text x={x + 11} y={height + 22} textAnchor="middle" className="fill-muted font-sans text-[12px]">
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

const areaData = [11, 10, 15, 21, 14, 23, 12]
const areaLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export function AreaChart() {
  const width = 660
  const height = 270
  const max = 28
  const points = areaData.map((value, index) => {
    const x = 30 + (index * (width - 60)) / (areaData.length - 1)
    const y = height - 20 - (value / max) * (height - 45)
    return [x, y]
  })
  const line = points.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `30,${height - 20} ${line} ${width - 30},${height - 20}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[300px] w-full" role="img" aria-label="Grafik statistik penghasilan">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="rgba(80,153,255,0.95)" />
        </linearGradient>
      </defs>
      {[0, 7, 14, 21, 28].map((tick) => {
        const y = height - 20 - (tick / max) * (height - 45)
        return (
          <g key={tick}>
            <line x1="30" x2={width - 30} y1={y} y2={y} stroke="#e8eaec" strokeWidth="1" />
            <text x="2" y={y + 4} className="fill-muted font-sans text-[12px]">
              {tick}k
            </text>
          </g>
        )
      })}
      <polygon points={area} fill="url(#areaGradient)" opacity="0.75" />
      <polyline points={line} fill="none" stroke="#5f76e8" strokeWidth="3" strokeLinejoin="round" />
      {points.map(([x, y], index) => (
        <g key={areaLabels[index]}>
          <circle cx={x} cy={y} r="4" fill="#fff" stroke="#5f76e8" strokeWidth="2">
            <title>{`${areaLabels[index]}: ${areaData[index]}k`}</title>
          </circle>
          <text x={x} y={height} textAnchor="middle" className="fill-muted font-sans text-[12px]">
            {areaLabels[index]}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function WorldMap() {
  const continents = [
    'M38 58 L52 40 L78 38 L95 50 L90 66 L74 74 L68 96 L52 82 L46 68 Z',
    'M82 105 L101 100 L112 124 L104 158 L90 146 L80 122 Z',
    'M145 48 L164 40 L181 48 L178 66 L158 70 L146 62 Z',
    'M152 76 L179 70 L190 98 L176 140 L160 116 Z',
    'M184 42 L232 34 L270 52 L260 82 L226 94 L198 74 Z',
    'M244 122 L270 116 L282 134 L262 146 L244 136 Z',
  ]

  return (
    <svg viewBox="0 0 310 180" className="h-[180px] w-full" role="img" aria-label="Peta dunia">
      {continents.map((path) => (
        <path
          key={path}
          d={path}
          fill="#d5dce5"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}
