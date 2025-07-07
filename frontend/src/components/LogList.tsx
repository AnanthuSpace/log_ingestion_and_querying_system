"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, AlertTriangle, Info, Bug, Clock, Server, Hash, ChevronDown, ChevronRight } from "lucide-react"
import type { LogEntry } from "../types"

interface Props {
  logs: LogEntry[]
  isLoading?: boolean
}

const LogLevelIcon = ({ level }: { level: LogEntry["level"] }) => {
  const iconProps = { className: "h-4 w-4" }

  switch (level) {
    case "error":
      return <AlertCircle {...iconProps} className="h-4 w-4 text-red-500" />
    case "warn":
      return <AlertTriangle {...iconProps} className="h-4 w-4 text-yellow-500" />
    case "info":
      return <Info {...iconProps} className="h-4 w-4 text-blue-500" />
    case "debug":
      return <Bug {...iconProps} className="h-4 w-4 text-purple-500" />
    default:
      return <Info {...iconProps} />
  }
}

const LogLevelBadge = ({ level }: { level: LogEntry["level"] }) => {
  const variants = {
    error: "destructive",
    warn: "secondary",
    info: "default",
    debug: "outline",
  } as const

  return (
    <Badge variant={variants[level]} className="text-xs font-medium">
      {level.toUpperCase()}
    </Badge>
  )
}

const LogItem = ({ log }: { log: LogEntry }) => {
  const [expanded, setExpanded] = React.useState(false)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    }
  }

  const { date, time } = formatTimestamp(log.timestamp)

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <LogLevelIcon level={log.level} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <LogLevelBadge level={log.level} />
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Server className="h-3 w-3" />
                    {log.source || "unknown"}
                  </span>
                </div>
              </div>

              <p className="text-gray-900 font-medium mb-2 break-words">{log.message}</p>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {log.resourceId}
                </span>
                {log.traceId && <span>Trace: {log.traceId}</span>}
              </div>

              {expanded && log.metadata && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Metadata</h4>
                  <pre className="text-xs text-gray-600 overflow-x-auto">{JSON.stringify(log.metadata, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>

          {log.metadata && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="ml-2 flex-shrink-0">
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function LogList({ logs, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <div className="w-16 h-5 bg-gray-200 rounded"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Server className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No logs found</h3>
              <p className="text-gray-500">Try adjusting your filters or check back later.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Logs ({logs.length.toLocaleString()})</h2>
      </div>
      <div className="space-y-0">
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </div>
    </div>
  )
}
