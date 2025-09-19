import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");
  const [loading, setLoading] = useState(true);

  const collect_request_id = searchParams.get("EdvironCollectRequestId");
  const school_id = import.meta.env.VITE_SCHOOL_ID;
  const urlStatus = searchParams.get("status");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/check-payment/${collect_request_id}?school_id=${school_id}`
        );

        console.log("Payment response:", res.data);
        setPaymentData(res.data);

        if (urlStatus === "SUCCESS" || res.data.status === "SUCCESS") {
          setStatusMessage("✅ Payment Successful! Thank you for your payment.");
        } else if (res.data.status === "PENDING") {
          setStatusMessage("⏳ Payment Pending. Please wait a few minutes.");
        } else {
          setStatusMessage("⚠️ Payment Failed. Please try again.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatusMessage("❌ Could not verify payment. Please contact support.");
      } finally {
        setLoading(false);
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
      setLoading(false);
    }
  }, [collect_request_id, school_id, urlStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

        {loading ? (
          <p className="text-lg mb-4 animate-pulse">Checking payment status...</p>
        ) : (
          <p className="text-lg mb-4">{statusMessage}</p>
        )}

        {paymentData && !loading && (
          <div className="text-left space-y-2 border-t pt-4">
            <p><strong>Amount:</strong> ₹{paymentData.amount || "N/A"}</p>
            <p><strong>Status:</strong> {paymentData.status || "N/A"}</p>
            <p>
              <strong>Payment Details:</strong>{" "}
              {paymentData.details?.payment_methods || "N/A"}
            </p>
            <p><strong>Token:</strong> {paymentData.jwt ? "✅ Received" : "❌ Not Provided"}</p>
          </div>
        )}
      </div>
    </div>
  );
}