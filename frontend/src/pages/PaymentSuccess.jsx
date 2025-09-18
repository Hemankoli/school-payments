import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");

  const collect_request_id = searchParams.get("EdvironCollectRequestId");
  const school_id = import.meta.env.VITE_SCHOOL_ID;
  const urlStatus = searchParams.get("status");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/check-payment/${collect_request_id}?school_id=${school_id}`);
        console.log("Payment response:", res.data);
        setPaymentData(res.data);
        if (urlStatus === "SUCCESS" || res.data.status === "SUCCESS") {
          setStatusMessage("✅ Payment Successful! Thank you for your payment.");
        } else {
          setStatusMessage("⚠️ Payment Pending or Failed. Please try again.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatusMessage("❌ Could not verify payment. Please contact support.");
      }
    };

    if (collect_request_id && school_id) {
      verifyPayment();
    } else if (urlStatus) {
      setStatusMessage(
        urlStatus === "SUCCESS"
          ? "✅ Payment Successful! Thank you for your payment."
          : "⚠️ Payment Failed. Please try again."
      );
    }
  }, [collect_request_id, school_id, urlStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        <p className="text-lg mb-4">{statusMessage}</p>

        {paymentData && (
          <div className="text-left space-y-2 border-t pt-4">
            <p><strong>Amount Paid:</strong> ₹{paymentData.transaction_amount}</p>
            <p><strong>Order Amount:</strong> ₹{paymentData.order_amount}</p>
            <p><strong>Payment Mode:</strong> {paymentData.payment_mode || "N/A"}</p>
            <p><strong>Bank Reference:</strong> {paymentData.bank_reference || "N/A"}</p>
            <p><strong>Message:</strong> {paymentData.payment_message || "N/A"}</p>
            <p>
              <strong>Time:</strong>{" "}
              {paymentData.payment_time
                ? new Date(paymentData.payment_time).toLocaleString()
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}