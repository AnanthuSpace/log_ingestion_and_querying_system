"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, Download, RefreshCw } from "lucide-react"
import type { LogFilters } from "../types"

interface Props {
  filters: LogFilters
  setFilters: React.Dispatch<React.SetStateAction<LogFilters>>
  onExport: () => void
  onRefresh: () => void
  isLoading?: boolean
}

export default function FilterBar({ filters, setFilters, onExport, onRefresh, isLoading }: Props) {
  const handleInputChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }))
  }

  const clearFilters = () => {
    setFilters({})
  }

  const activeFiltersCount = Object.values(filters).filter(Boolean).length

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Search and Level Filter Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={filters.message || ""}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filters.level || "all"} onValueChange={(value) => handleInputChange("level", value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Filters Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Resource ID"
              value={filters.resourceId || ""}
              onChange={(e) => handleInputChange("resourceId", e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Source"
              value={filters.source || ""}
              onChange={(e) => handleInputChange("source", e.target.value)}
              className="flex-1"
            />
            <Input
              type="datetime-local"
              placeholder="Start Time"
              value={filters.timestamp_start || ""}
              onChange={(e) => handleInputChange("timestamp_start", e.target.value)}
              className="flex-1"
            />
            <Input
              type="datetime-local"
              placeholder="End Time"
              value={filters.timestamp_end || ""}
              onChange={(e) => handleInputChange("timestamp_end", e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Action Buttons and Active Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={onExport} className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
