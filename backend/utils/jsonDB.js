const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/logs.json');

const readLogs = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeLogs = (logs) => {
  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
};

module.exports = { readLogs, writeLogs };
