const express = require('express');
const { postLog, getLogs } = require('../controllers/logs.controller');

const router = express.Router();

router.post('/', postLog);
router.get('/', getLogs);

module.exports = router;
