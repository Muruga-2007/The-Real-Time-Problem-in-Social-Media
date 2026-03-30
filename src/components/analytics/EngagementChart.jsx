import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAnalyticsStore } from '../../store/analyticsStore.js'
import { ChartTooltip } from './ChartTooltip.jsx'
import { useUIStore } from '../../store/uiStore.js'
import { format, parseISO } from 'date-fns'

const DATE_RANGES = ['7d', '30d', '90d']

export function EngagementChart() {
  const { dateRange, setDateRange, getFilteredData } = useAnalyticsStore()
  const theme = useUIStore(s => s.theme)
  const data = getFilteredData()

  const tickColor = theme === 'dark' ? '#71717a' : '#a1a1aa'
  const strokeColor = theme === 'dark' ? '#fafafa' : '#09090b'

  const chartData = data.map(d => ({
    ...d,
    label: format(parseISO(d.date), 'MMM d'),
  }))

  return (
    <div className="bg-surface-primary border-2 border-border-default p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-mono tracking-widest uppercase text-text-muted">Engagement</p>
        <div className="flex gap-1">
          {DATE_RANGES.map(r => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`
                px-2 py-1 text-xs font-mono tracking-wider border
                transition-colors duration-150
                ${dateRange === r
                  ? 'bg-accent text-text-inverse border-border-strong'
                  : 'bg-transparent text-text-muted border-border-default hover:border-border-strong hover:text-text-primary'
                }
              `}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200} key={theme}>
        <AreaChart data={chartData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="commentsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={strokeColor} stopOpacity={0.15} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="repostsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={strokeColor} stopOpacity={0.08} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: tickColor }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: tickColor }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area type="monotone" dataKey="likes"    stroke={strokeColor} strokeWidth={1.5} fill="url(#likesGrad)"    dot={false} />
          <Area type="monotone" dataKey="comments" stroke={strokeColor} strokeWidth={1}   fill="url(#commentsGrad)" dot={false} strokeDasharray="4 2" />
          <Area type="monotone" dataKey="reposts"  stroke={strokeColor} strokeWidth={1}   fill="url(#repostsGrad)"  dot={false} strokeDasharray="2 3" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-3">
        {[['Likes', ''], ['Comments', '4 2'], ['Reposts', '2 3']].map(([name, dash]) => (
          <div key={name} className="flex items-center gap-1.5">
            <svg width="16" height="2"><line x1="0" y1="1" x2="16" y2="1" stroke={strokeColor} strokeWidth="1.5" strokeDasharray={dash} /></svg>
            <span className="text-xs font-mono text-text-muted">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
