const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User");
const Orders = require("../models/Orders");
const OrdersStatus = require("../models/OrdersStatus");

module.exports.loginUser = async (req, res) => {
  try {
    const { name, email, phone, school_id, amount, trustee_id, student_id } = req.body;

    const payload = {
      school_id,
      amount,
      callback_url: `${process.env.FRONTEND_URL}/payment-success`,
    };

    const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });

    const response = await axios.post(
      process.env.PAYMENT_API_URL,
      {
        school_id,
        amount,
        callback_url: payload.callback_url,
        sign,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
      }
    );

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, phone });
    } else {
      user.name = name;
      user.phone = phone;
      await user.save();
    }

    await Orders.create({
      school_id,
      trustee_id,
      student_info: {
        name,
        id: student_id || user._id.toString(),
        email,
        phone,
      },
      gateway_name: "Edviron",
    });

    return res.json({
      user,
      edvironResponse: response.data,
      paymentUrl: response?.data?.collect_request_url,
      collectRequestId: response.data.collect_request_id,
    });
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

module.exports.checkPayment = async (req, res) => {
  try {
    const { collect_request_id } = req.params;
    const { school_id } = req.query;
    if (!collect_request_id || !school_id) {
      return res.status(400).json({ error: "Missing collect_request_id or school_id" });
    }
    const payload = { school_id, collect_request_id };
    const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });

    const response = await axios.get(`${process.env.PAYMENT_API_URL}/${collect_request_id}?school_id=${school_id}&sign=${sign}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
      }
    );
    const data = response.data;
    await OrdersStatus.create({
      collect_id: collect_request_id,
      order_amount: data.order_amount,
      transaction_amount: data.transaction_amount,
      payment_mode: data.payment_mode,
      payment_details: data.payment_details,
      bank_reference: data.bank_reference,
      payment_message: data.payment_message,
      status: data.status,
      error_message: data.error_message,
      payment_time: data.payment_time,
    });
    return res.json(data);
  } catch (error) {
    console.error("Check payment error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to check payment" });
  }
};
