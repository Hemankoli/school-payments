import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Verifying payment...");
  const [loading, setLoading] = useState(true);

  const collect_request_id = searchParams.get("EdvironCollectRequestId");
  const school_id = import.meta.env.VITE_SCHOOL_ID;
  const urlStatus = searchParams.get("status");
  const storedOrderId = sessionStorage.getItem('pending_order_id');

  useEffect(() => {
    const verifyPayment = async () => {
      console.log("url", `${import.meta.env.VITE_API_BASE_URL}/check-payment/${collect_request_id}?school_id=${school_id}&order_id=${storedOrderId}`)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/check-payment/${collect_request_id}?school_id=${school_id}&order_id=${storedOrderId}`
        );
        if (res.status === 404) {
          setStatusMessage("❌ Payment verification service not available. Please contact support.");
          return;
        }
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

    if (collect_request_id && school_id && storedOrderId) {
      verifyPayment();
    } else if (urlStatus) {
      setStatusMessage(
        urlStatus === "SUCCESS"
          ? "✅ Payment Successful! Thank you for your payment."
          : "⚠️ Payment Failed. Please try again."
      );
      setLoading(false);
    }
  }, [collect_request_id, school_id, storedOrderId, urlStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center transform transition-all hover:scale-105 duration-300">
        <h1 className="text-3xl font-extrabold mb-6 text-orange-600">Payment Status</h1>

        {loading ? (
          <p className="text-lg mb-6 text-gray-600 animate-pulse">Checking payment status...</p>
        ) : (
          <p className={`text-lg mb-6 font-semibold ${statusMessage.includes("Successful") ? "text-green-600" : statusMessage.includes("Failed") ? "text-red-600" : "text-yellow-600"}`}>
            {statusMessage}
          </p>
        )}

        {paymentData && !loading && (
          <div className="bg-orange-50 rounded-lg p-4 mb-6 shadow-inner text-left space-y-3">
            <p><strong>Amount:</strong> ₹{paymentData.amount || "N/A"}</p>
            <p><strong>Status:</strong> {paymentData.status || "N/A"}</p>
            <div className="border-t pt-3 space-y-2">
              <p className="font-semibold">Payment Details:</p>
              <p><strong>Method:</strong> {paymentData.details?.payment_mode || "N/A"}</p>
              <p><strong>UPI ID:</strong> {paymentData.details?.payment_methods?.upi?.upi_id || "N/A"}</p>
              <p><strong>Bank Reference:</strong> {paymentData.details?.bank_ref || "N/A"}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition-colors duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}