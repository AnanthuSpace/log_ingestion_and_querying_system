const express = require('express');
const cors = require('cors');
const logsRoute = require('./routes/logs.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/logs', logsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});