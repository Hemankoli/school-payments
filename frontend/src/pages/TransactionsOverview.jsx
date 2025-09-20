import { useEffect, useState } from "react";
import Table from "../components/Table";
import Selects from "../components/Selects";
import Pagination from "../components/Pagination";
import { useMainContext } from "../context";

export default function TransactionsOverview({ theme }) {
  const { transactions, transactionsByStatus} = useMainContext();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const [data, setData] = useState([]);

  useEffect(() => {
    const mergedData = transactions?.map((order) => {
      const statusEntry = transactionsByStatus?.find(
        (s) => s?.order_id === order?._id
      )
      return statusEntry ? { ...order, ...statusEntry } : { ...order, status: "FAILED" };
    });
    setData(mergedData);
  }, [transactions, transactionsByStatus]);

  const filtered = data?.filter((t) => {
    const matchesStatus = statusFilter ? t.status === statusFilter : ["SUCCESS", "FAILED"].includes(t.status);
    return matchesStatus;
  });

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const paginated = filtered?.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);


  return (
    <div className={`${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"} rounded-sm shadow-md p-6 transition-colors duration-300`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Transactions Overview</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Selects
            theme={theme}
            label="Status"
            options={["SUCCESS", "FAILED"].map((status) => ({
              value: status,
              label: status,
            }))}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by Status"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-sm border border-gray-200 dark:border-gray-700">
        <Table theme={theme} filtered={paginated} />
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
