export function Skeleton({ className = '' }) {
  return (
    <div className={`bg-surface-secondary animate-pulse ${className}`} />
  )
}

export function PostSkeleton() {
  return (
    <div className="border-b-2 border-border-default p-5 space-y-3">
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
