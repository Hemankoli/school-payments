import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useMainContext } from "../context";
import DataCard from "../components/DataCard";

export default function TransactionBySchool({ theme }) {
  const [schoolId, setSchoolId] = useState("");
  const [result, setResult] = useState([]);
  const { transactions, transactionsByStatus } = useMainContext();

  function schoolsTotalSales(e) {
    e.preventDefault();
    if (!schoolId) return;
    const orders = transactions?.filter((t) => t?.school_id === schoolId) || [];
    const merged = orders.map((order) => {
      const statusEntry = transactionsByStatus?.find(
        (s) => s.collect_id === order?._id
      );
      return { ...order, ...statusEntry };
    });
    setResult(merged);
  }

  const totalSales = result.reduce((sum, r) => sum + (r.transaction_amount || r.order_amount || 0),0);

  return (
    <div
      className={`p-4 md:p-10 ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
        } flex items-center flex-col pt-20 min-h-screen`}
    >
      <h2 className="text-2xl font-semibold mb-4">Transactions By School</h2>
      <div className="flex space-x-2 mb-4">
        <InputField
          type="text"
          placeholder="Enter School ID"
          value={schoolId}
          method={(e) => setSchoolId(e.target.value)}
        />
        <Button label="Fetch" onClick={schoolsTotalSales} />
      </div>

      {result?.length > 0 ? (
        <div className={`mt-6 w-full grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[800px] overflow-y-auto ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} shadow-lg rounded-lg p-2`}>
          <div className="col-span-full mb-4 p-4 bg-indigo-600 text-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Fee Paid:</h3>
            <p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p>
          </div>
          {result.map((txn) => (
            <div className="border border-indigo-500 gap-2">
              <DataCard result={txn} key={txn?._id} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No transactions found for this school</p>
      )}
    </div>
  );
}