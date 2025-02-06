const express = require('express');
const { sendBulkSms } = require('../../controllers/sms/controller');
const router = express.Router();

router.post('/send-bulk-sms', sendBulkSms);

module.exports = router;