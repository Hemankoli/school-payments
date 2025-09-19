import { MdContentCopy } from "react-icons/md";
import { copyText } from "../notifications";

export default function Table({ theme, filtered }) {

    const getStatusClass = (status) => {
        switch (status) {
            case "SUCCESS":
                return "bg-green-100 text-green-700 border-green-300";
            case "FAILED":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    function copyToClipboard(text) {
        if (!text) return;
        navigator.clipboard.writeText(text)
            .then(() => copyText())
            .catch((err) => console.error("Failed to copy: ", err));
    }

    return (
        <div className={`${theme === "light" ? "bg-white text-gray-900" : "text-white bg-gray-900"} overflow-x-auto rounded-sm shadow-md border border-gray-200 dark:border-gray-700`}>
            <table className="w-full border-collapse text-sm text-left">
                <thead className="sticky top-0 uppercase text-xs shadow-sm z-10">
                    <tr>
                        {[
                            "Sr No",
                            "Collect ID",
                            "School",
                            "Gateway",
                            "Payment Time & Date",
                            "Order Amount",
                            "Transaction Amount",
                            "Student Name",
                            "Student Email",
                            "Student Phone",
                            "Status",
                        ].map((header, i) => (
                            <th
                                key={i}
                                className="px-4 py-3 font-semibold border-b border-gray-200 dark:border-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {filtered?.length > 0 ? (
                        filtered.map((txn, index) => (
                            <tr
                                key={txn?._id || index}
                                className={`transition-colors duration-200 ${theme === "light" ? "bg-white text-gray-900 hover:bg-gray-50" : "text-white bg-gray-900 hover:bg-gray-800"}`}
                            >
                                <td className="px-4 py-3 border-b">{index + 1}</td>
                                <td className="px-4 py-3 border-b">
                                    <span>{txn?._id}</span>
                                    <button title="Copy Collect Id" onClick={() => copyToClipboard(txn?._id)}><MdContentCopy /> </button>
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <span>{txn?.school_id || "NA"}</span>
                                    <button title="Copy School Id" onClick={() => copyToClipboard(txn?.school_id)}><MdContentCopy /> </button>
                                </td>
                                <td className="px-4 py-3 border-b">{txn?.gateway_name || "NA"}</td>
                                <td className="px-4 py-3 border-b">
                                    {txn?.payment_time ? new Date(txn.payment_time).toLocaleString() : "NA"}
                                </td>
                                <td className="px-4 py-3 border-b font-medium">
                                    {txn?.order_amount ? "₹" + txn?.order_amount : "NA"}
                                </td>
                                <td className="px-4 py-3 border-b font-medium">
                                    {txn?.transaction_amount
                                        ? "₹" + txn?.transaction_amount
                                        : "NA"}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {txn?.student_info?.name || "NA"}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {txn?.student_info?.email || "NA"}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {txn?.student_info?.phone || "NA"}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <span
                                        className={`px-3 py-1 rounded-sm text-xs font-semibold border ${getStatusClass(
                                            txn?.status || "SUCCESS"
                                        )}`}
                                    >
                                        {txn?.status || "SUCCESS"}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={11}
                                className="px-4 py-6 text-center"
                            >
                                No transactions found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}