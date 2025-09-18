const WebhookLog = require("../models/WebhookLog.js");
const Order = require("../models/Orders.js");
const OrderStatus = require("../models/OrdersStatus.js");

module.exports.webhookHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const log = await WebhookLog.create({ rawPayload: payload });
    const orderInfo = payload.order_info || payload.data || null;
    if (!orderInfo) {
      await WebhookLog.findByIdAndUpdate(log._id, { processed: false, error: "Missing order_info" });
      return res.status(400).json({ message: "Missing order_info" });
    }

    const collectOrOrderId = orderInfo.order_id;
    let orderStatus = null;
    try {
      if (collectOrOrderId && collectOrOrderId.match && collectOrOrderId.match(/^[0-9a-fA-F]{24}$/)) {
        orderStatus = await OrderStatus.findById(collectOrOrderId);
      }
    } catch (e) {}
    if (!orderStatus && orderInfo.custom_order_id) {
      const order = await Order.findOne({ custom_order_id: orderInfo.custom_order_id });
      if (order) orderStatus = await OrderStatus.findOne({ collect_id: order._id });
    }
    if (!orderStatus && orderInfo.bank_reference) {
      orderStatus = await OrderStatus.findOne({ bank_reference: orderInfo.bank_reference });
    }

    if (!orderStatus) {
      await WebhookLog.findByIdAndUpdate(log._id, { processed: false, error: "OrderStatus not found" });
      return res.status(404).json({ message: "OrderStatus not found" });
    }
    orderStatus.order_amount = orderInfo.order_amount ?? orderStatus.order_amount;
    orderStatus.transaction_amount = orderInfo.transaction_amount ?? orderStatus.transaction_amount;
    orderStatus.payment_mode = orderInfo.payment_mode ?? orderStatus.payment_mode;
    orderStatus.payment_details = orderInfo.payemnt_details ?? orderStatus.payment_details;
    orderStatus.bank_reference = orderInfo.bank_reference ?? orderStatus.bank_reference;
    orderStatus.payment_message = orderInfo.Payment_message ?? orderStatus.payment_message;
    orderStatus.status = (orderInfo.status ?? orderStatus.status).toString();
    orderStatus.error_message = orderInfo.error_message ?? orderStatus.error_message;
    if (orderInfo.payment_time) orderStatus.payment_time = new Date(orderInfo.payment_time);
    orderStatus.gateway = orderInfo.gateway ?? orderStatus.gateway;
    await orderStatus.save();
    await WebhookLog.findByIdAndUpdate(log._id, { processed: true });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}