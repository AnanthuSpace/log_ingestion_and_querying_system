require("dotenv").config();
const express = require('express');
const cors = require('cors');
const logsRoute = require('./routes/logs.route');

const app = express();
const PORT = process.env.PORT || 5000;
console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.use('/logs', logsRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});