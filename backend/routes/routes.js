const express = require('express');
const router = express.Router();
const payments = require("../controllers/payments");
const controlller = require("../controllers/controller");
const webhook = require("../controllers/webhook");

// Users Route
router.post('/login-and-pay', payments.loginUser);
router.get("/check-payment/:collect_request_id", payments.checkPayment);

router.get('/get-orders', controlller.getAllTrans);
router.get('/get-all-orders', controlller.getAllTransData);
router.get('/transactions/school/:schoolId', controlller.getAllData);
router.get('/transaction-status/:customOrderId', controlller.checkTransStatus);

// Payments
router.post('/webhook', webhook.webhook);

module.exports = router;