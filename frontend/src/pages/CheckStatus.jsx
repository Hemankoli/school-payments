import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useMainContext } from "../context";
import DataCard from "../components/DataCard";

export default function CheckStatus({theme}) {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);
  const { transactions, transactionsByStatus } = useMainContext();

  function checkStatus() {
    if (!orderId) return;
    const order = transactions?.find((t) => t?._id === orderId);
    const statusEntry = transactionsByStatus.find(
      (s) => s.collect_id === orderId
    );
    if (order && statusEntry) {
      setResult({ ...order, ...statusEntry })
    } else {
      setResult({ error: "Order not found" });
    }
  }

  return (
    <div className={`p-10 ${theme==="light" ? "bg-white text-black" : "bg-gray-900 text-white"} flex items-center flex-col pt-20 min-h-screen`}>
      <h2 className="text-2xl font-semibold mb-4">Check Transaction Status</h2>
      <div className="flex space-x-2 mb-4">
        <InputField
          type={"text"}
          placeholder={"Enter Collect Order Id"}
          value={orderId}
          method={e => setOrderId(e.target.value)}
        />
        <Button label={"check"} onClick={checkStatus} />
      </div>
      {result && 
        <div className={`mt-6 w-full max-w-3xl ${theme==="light" ? "bg-white text-black" : "bg-gray-900 text-white"} shadow-lg rounded-lg p-6`}>
          {result?.error ? (
            <p className="text-red-500 font-medium">{result?.error}</p>
          ) : (
            <DataCard result={result} key={result?._id} />
          )}
        </div>
      }
    </div>
  );
}