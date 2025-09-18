const mongoose = require("mongoose");

const webhookLogSchema = new mongoose.Schema({
  rawPayload: { type: Object },
  receivedAt: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false },
  error: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("WebhookLog", webhookLogSchema);
