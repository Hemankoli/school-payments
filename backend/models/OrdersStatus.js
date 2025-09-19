const mongoose = require("mongoose");

const orderStatusSchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    collect_id: { type: String, required: true },
    order_amount: { type: Number, required: true },
    transaction_amount: { type: Number, required: true },
    payment_mode: { type: String },
    payment_details: { type: Object },
    bank_reference: { type: String },
    payment_message: { type: String },
    status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], required: true },
    error_message: { type: String },
    payment_time: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrdersStatus", orderStatusSchema);
