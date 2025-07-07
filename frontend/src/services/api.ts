import axios from "axios";
import type { LogEntry, LogFilters, LogStats } from "../types";

const API_BASE = "http://localhost:5000/logs";

export const fetchLogs = async (filters: LogFilters = {}): Promise<LogEntry[]> => {
    const params = { ...filters };
    const response = await axios.get<LogEntry[]>(API_BASE, {
        params,
        withCredentials: true,
    });
    return response.data;
};


export const postLog = async (log: Partial<LogEntry>): Promise<LogEntry> => {
    const response = await axios.post<LogEntry>(API_BASE, log, {
        withCredentials: true,
    });
    return response.data;
};

export const getLogStats = async (): Promise<LogStats> => {
    const response = await axios.get<LogStats>(`${API_BASE}/stats`, {
        withCredentials: true,
    });
    return response.data;
};