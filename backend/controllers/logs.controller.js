const { readLogs, writeLogs } = require('../utils/jsonDB');

const postLog = (req, res) => {
  try {
    const log = req.body;
    const requiredFields = [
      'level', 'message', 'resourceId', 'timestamp',
      'traceId', 'spanId', 'commit', 'metadata'
    ];

    for (const field of requiredFields) {
      if (!log.hasOwnProperty(field)) {
        return res.status(400).json({ error: `Missing field: ${field}` });
      }
    }

    const logs = readLogs();
    logs.push(log);
    writeLogs(logs);

    res.status(201).json(log);
  } catch {
    res.status(500).json({ error: 'Failed to ingest log' });
  }
};

const getLogs = (req, res) => {
  try {
    const {
      level, message, resourceId,
      timestamp_start, timestamp_end,
      traceId, spanId, commit
    } = req.query;

    let logs = readLogs();

    logs = logs.filter((log) => {
      if (level && log.level !== level) return false;
      if (message && !log.message.toLowerCase().includes(message.toLowerCase())) return false;
      if (resourceId && log.resourceId !== resourceId) return false;
      if (traceId && log.traceId !== traceId) return false;
      if (spanId && log.spanId !== spanId) return false;
      if (commit && log.commit !== commit) return false;

      if (timestamp_start && new Date(log.timestamp) < new Date(timestamp_start)) return false;
      if (timestamp_end && new Date(log.timestamp) > new Date(timestamp_end)) return false;

      return true;
    });

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).json(logs);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
};

const getStatus = async (req, res) => {
  try {
    const logs = readLogs(); 

    const stats = {
      total: logs.length,
      info: 0,
      debug: 0,
      warn: 0,
      error: 0,
    };

    logs.forEach((log) => {
      if (stats[log.level] !== undefined) {
        stats[log.level]++;
      }
    });
    res.status(200).json(stats);
  } catch (err) {
    console.error("Failed to retrieve log stats:", err);
    res.status(500).json({ error: "Failed to retrieve log stats" });
  }
};


module.exports = { postLog, getLogs, getStatus };