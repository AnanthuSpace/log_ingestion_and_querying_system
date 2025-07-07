import { useEffect, useState, useCallback } from "react";
import { fetchLogs, getLogStats, postLog } from "../services/api";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
import { Activity, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner";
import type { LogEntry, LogFilters, LogStats } from "../types";
import FilterBar from "@/components/FilterBar";
import LogStatsCards from "@/components/LogStatsCards";
import LogList from "@/components/LogList";

export default function LogMonitoringDashboard() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filters, setFilters] = useState<LogFilters>({});
  const [stats, setStats] = useState<LogStats>({
    total: 0,
    errors: 0,
    warnings: 0,
    info: 0,
    debug: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  //   const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    level: "info",
    message: "",
    resourceId: "",
    commit: "",
  });

  const loadStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const statsData = await getLogStats();
      setStats(statsData);
    } catch (err) {
      toast.error("Failed to fetch log stats");
    } finally {
      setIsStatsLoading(false);
    }
  }, [filters]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const loadLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLogs(filters);
      setLogs(data);
    } catch (err) {
      toast.error("Failed to fetch logs");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadLogs();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [loadLogs]);

  const handleCreateLog = async () => {
    try {
      const newLog: Partial<LogEntry> = {
        level: form.level,
        message: form.message,
        resourceId: form.resourceId,
        commit: form.commit,
        timestamp: new Date().toISOString(),
        traceId: crypto.randomUUID(),
        spanId: crypto.randomUUID(),
        metadata: {
          parentResourceId: "auto-gen-parent",
        },
      };
      const createdLog = await postLog(newLog);
      setLogs((prev) => [createdLog, ...prev.slice(0, 99)]);
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        [createdLog.level]: (prev[createdLog.level as keyof LogStats] ?? 0) + 1,
      }));
      toast.success("Log created");
      setShowModal(false);
    } catch {
      toast.error("Failed to create log");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="text-blue-600" />
            Log Monitoring Dashboard
          </h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            + Create Log
          </button>
        </div>

        {/* <Card className="mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isRealTimeEnabled ? (
                <Wifi className="text-green-500" />
              ) : (
                <WifiOff className="text-gray-400" />
              )}
              <Label htmlFor="realtime-toggle">Real-time Updates</Label>
            </div>
            <Switch
              id="realtime-toggle"
              checked={isRealTimeEnabled}
              onCheckedChange={(val) => setIsRealTimeEnabled(val)}
            />
            {isRealTimeEnabled && (
              <Badge variant="secondary" className="animate-pulse">
                Live
              </Badge>
            )}
          </CardContent>
        </Card> */}

        <LogStatsCards stats={stats} isLoading={isStatsLoading} />
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onExport={() => {
            const json = JSON.stringify(logs, null, 2);
            const uri =
              "data:application/json;charset=utf-8," + encodeURIComponent(json);
            const filename = `logs-${Date.now()}.json`;
            const link = document.createElement("a");
            link.setAttribute("href", uri);
            link.setAttribute("download", filename);
            link.click();
          }}
          onRefresh={() => {
            loadLogs();
            toast.success("Logs refreshed");
          }}
          isLoading={isLoading}
        />
        <LogList logs={logs} isLoading={isLoading} />

        {showModal && (
          <div className="fixed inset-0 backdrop-blur-md bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Log</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Level</label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="info">info</option>
                    <option value="debug">debug</option>
                    <option value="warn">warn</option>
                    <option value="error">error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Message</label>
                  <input
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Resource ID
                  </label>
                  <input
                    type="text"
                    name="resourceId"
                    value={form.resourceId}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Commit Hash
                  </label>
                  <input
                    type="text"
                    name="commit"
                    value={form.commit}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={handleCreateLog}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
