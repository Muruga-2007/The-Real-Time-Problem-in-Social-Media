import { formatDistanceToNow, format, parseISO } from 'date-fns'

export function timeAgo(dateStr) {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true })
  } catch {
    return ''
  }
}

export function formatDate(dateStr, pattern = 'MMM d, yyyy') {
  try {
    return format(parseISO(dateStr), pattern)
  } catch {
    return ''
  }
}

export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function truncate(str, max = 280) {
  if (!str) return ''
  if (str.length <= max) return str
  return str.slice(0, max - 1) + '…'
}

export function extractHashtags(text) {
  return (text.match(/#[\w]+/g) || []).map(t => t.slice(1).toLowerCase())
}
