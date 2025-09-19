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

    const order = await Orders.create({
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
      order_id: order?._id.toString()
    });
  } catch (error) {
    console.error("Payment error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
};

module.exports.checkPayment = async (req, res) => {
  try {
    const { collect_request_id } = req.params;
    const { school_id, order_id } = req.query;
    if (!collect_request_id || !school_id) {
      return res.status(400).json({ error: "Missing collect_request_id or school_id" });
    }
    const payload = { school_id, collect_request_id };
    const sign = jwt.sign(payload, process.env.PG_SECRET_KEY, { algorithm: "HS256" });
    const response = await axios.get(`${process.env.PAYMENT_GET_API_URL}/${collect_request_id}?school_id=${school_id}&sign=${sign}`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PAYMENT_API_KEY}`,
        },
      }
    );
    const data = response.data;
    const existingData = await OrdersStatus.findOne({ collect_id: collect_request_id});
    if(!existingData){
      await OrdersStatus.create({
        order_id: order_id,
        collect_id: collect_request_id,
        order_amount: data.amount || 0,
        transaction_amount: data.amount || 0,
        payment_mode: data?.details?.payment_mode || null, 
        payment_details: data?.details || {},
        bank_reference: data?.details?.bank_ref || null,
        payment_message: data.status === "SUCCESS"
            ? "Payment Successful"
            : data.status === "FAILED"
            ? "Payment Failed"
            : "Payment Pending",
        status: data?.status ? data.status.toUpperCase() : "PENDING",
        error_message: data?.error_message || null,
        payment_time: new Date(),
      });
    }
    return res.json(data);
  } catch (error) {
    console.error("Check payment error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to check payment" });
  }
};
