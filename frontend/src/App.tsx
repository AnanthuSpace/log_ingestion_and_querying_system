import { useEffect, useState } from "react";
import { fetchLogs } from "./services/api";
import type { LogEntry, LogFilters } from "./types";
import LogMonitoringDashboard from "./pages/LogMonitoringDashboard";

function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filters, setFilters] = useState<LogFilters>({});

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchLogs(filters);
        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    load();
  }, [filters]);

  return (
    <div className="max-w-full mx-auto">
      <LogMonitoringDashboard />
    </div>
  );
}

export default App;
