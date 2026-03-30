export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-surface-elevated border-2 border-border-strong p-3 shadow-sharp-sm">
      <p className="text-xs font-mono text-text-muted mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span className="text-xs font-mono text-text-secondary capitalize">{entry.name}:</span>
          <span className="text-xs font-mono text-text-primary font-medium">
            {entry.value?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
