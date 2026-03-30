import { useAnalyticsStore } from '../../store/analyticsStore.js'
import { useUIStore } from '../../store/uiStore.js'
import { format, parseISO } from 'date-fns'

const WEEKS = 52
const DAYS = 7

export function ActivityHeatmap() {
  const activityGrid = useAnalyticsStore(s => s.activityGrid)
  const theme = useUIStore(s => s.theme)

  const baseColor = theme === 'dark' ? [250, 250, 250] : [9, 9, 11]
  const bgColor   = theme === 'dark' ? '#27272a' : '#f4f4f5'

  // Pad to 52×7 grid
  const cells = [...activityGrid].slice(-WEEKS * DAYS)
  while (cells.length < WEEKS * DAYS) cells.unshift({ date: '', count: 0, intensity: 0 })

  const weeks = []
  for (let w = 0; w < WEEKS; w++) {
    weeks.push(cells.slice(w * DAYS, (w + 1) * DAYS))
  }

  return (
    <div className="bg-surface-primary border-2 border-border-default p-5">
      <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-4">Activity — 52 Weeks</p>

      <div className="overflow-x-auto">
        <svg
          width={WEEKS * 14}
          height={DAYS * 14 + 20}
          className="block"
        >
          {/* Day labels */}
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <text
              key={i}
              x={0}
              y={20 + i * 14 + 9}
              fontSize={8}
              fontFamily="DM Mono"
              fill={theme === 'dark' ? '#71717a' : '#a1a1aa'}
              textAnchor="middle"
            >
              {d}
            </text>
          ))}

          {/* Grid cells */}
          {weeks.map((week, wi) =>
            week.map((cell, di) => {
              const x = wi * 14 + 14
              const y = di * 14 + 20
              const opacity = cell.intensity
              const fill = cell.count === 0
                ? bgColor
                : `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${Math.max(0.1, opacity)})`

              return (
                <rect
                  key={`${wi}-${di}`}
                  x={x}
                  y={y}
                  width={11}
                  height={11}
                  fill={fill}
                  rx={0}
                  className="transition-opacity duration-300"
                >
                  {cell.date && (
                    <title>{cell.date}: {cell.count} post{cell.count !== 1 ? 's' : ''}</title>
                  )}
                </rect>
              )
            })
          )}
        </svg>
      </div>

      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-xs font-mono text-text-muted">Less</span>
        {[0, 0.2, 0.4, 0.7, 1].map((op, i) => (
          <rect
            key={i}
            style={{
              display: 'inline-block',
              width: 11,
              height: 11,
              backgroundColor: op === 0 ? bgColor : `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${op})`,
            }}
          />
        ))}
        <span className="text-xs font-mono text-text-muted">More</span>
      </div>
    </div>
  )
}
