import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { useAnalyticsStore } from '../../store/analyticsStore.js'
import { ChartTooltip } from './ChartTooltip.jsx'
import { useUIStore } from '../../store/uiStore.js'
import { formatCount } from '../../utils/formatters.js'

export function TrendingTopicsChart() {
  const trendingTopics = useAnalyticsStore(s => s.trendingTopics)
  const theme = useUIStore(s => s.theme)

  const strokeColor = theme === 'dark' ? '#fafafa' : '#09090b'
  const mutedColor  = theme === 'dark' ? '#3f3f46' : '#d4d4d8'
  const tickColor   = theme === 'dark' ? '#71717a' : '#a1a1aa'

  const data = trendingTopics.slice(0, 8).map(t => ({
    name: t.displayTag,
    posts: t.postCount,
    growth: t.growth,
  }))

  return (
    <div className="bg-surface-primary border-2 border-border-default p-5">
      <p className="text-xs font-mono tracking-widest uppercase text-text-muted mb-5">Trending Topics</p>

      <ResponsiveContainer width="100%" height={220} key={theme}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
          <XAxis
            type="number"
            tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: tickColor }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => formatCount(v)}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: tickColor }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--surface-secondary)' }} />
          <Bar dataKey="posts" radius={0} maxBarSize={18}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === 0 ? strokeColor : mutedColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
