const OrdersStatus = require("../models/OrdersStatus");

module.exports.webhook = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || !payload.order_info) {
      return res.status(400).json({ error: "Invalid webhook payload" });
    }

    const {
      order_id,
      order_amount,
      transaction_amount,
      gateway,
      bank_reference,
      status,
      payment_mode,
      payemnt_details,
      Payment_message,
      payment_time,
      error_message,
    } = payload.order_info;
    let existingOrder = await OrdersStatus.findOne({ collect_id: order_id });

    if (existingOrder) {
      existingOrder.order_amount = order_amount;
      existingOrder.transaction_amount = transaction_amount;
      existingOrder.payment_mode = payment_mode;
      existingOrder.payment_details = payemnt_details;
      existingOrder.bank_reference = bank_reference;
      existingOrder.payment_message = Payment_message;
      existingOrder.status = status;
      existingOrder.error_message = error_message;
      existingOrder.payment_time = payment_time;
      await existingOrder.save();
    } else {
      await OrdersStatus.create({
        collect_id: order_id,
        order_amount,
        transaction_amount,
        payment_mode,
        payment_details: payemnt_details,
        bank_reference,
        payment_message: Payment_message,
        status,
        error_message,
        payment_time,
      });
    }

    console.log("✅ Webhook received and processed:", payload.order_info);

    return res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ error: "Failed to process webhook" });
  }
};