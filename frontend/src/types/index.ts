export interface LogEntry {
  id: string
  timestamp: string
  level: "error" | "warn" | "info" | "debug"
  message: string
  resourceId: string
  source?: string
  metadata?: Record<string, any>
  traceId?: string
}

export interface LogFilters {
  message?: string
  level?: string
  resourceId?: string
  source?: string
  timestamp_start?: string
  timestamp_end?: string
  traceId?: string
}

export interface LogStats {
  total: number
  error: number
  warn: number
  info: number
  debug: number
}
