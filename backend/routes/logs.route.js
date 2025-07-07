const express = require('express');
const { postLog, getLogs, getStatus } = require('../controllers/logs.controller');

const router = express.Router();

router.post('/', postLog);
router.get('/', getLogs);
router.get('/stats', getStatus);

module.exports = router;
