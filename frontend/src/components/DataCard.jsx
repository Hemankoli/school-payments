import React from 'react'

export default function DataCard({result}) {

    return (
        <div className='p-2'>
            <h3 className="text-xl font-bold mb-4">
                Transaction Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    <span className="text-blue-600 dark:text-blue-400">{result?._id}</span>
                </p>
                <p>
                    <span className="font-semibold">School:</span>{" "}
                    {result?.school_id || "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Student Name:</span>{" "}
                    {result?.student_info?.name}
                </p>
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {result?.student_info?.email}
                </p>
                <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {result?.student_info?.phone}
                </p>
                <p>
                    <span className="font-semibold">Order Amount:</span>{" "}
                    <span className="text-green-600 font-medium">
                        ₹{result?.order_amount}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Transaction Amount:</span>{" "}
                    <span className="text-green-600 font-medium">
                        ₹{result?.transaction_amount}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${result?.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : result?.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {result?.status || 'Failed'}
                    </span>
                </p>
                <p>
                    <span className="font-semibold">Payment Mode:</span>{" "}
                    {result?.payment_mode || "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Payment Time:</span>{" "}
                    {result?.payment_time
                        ? new Date(result?.payment_time).toLocaleString()
                        : "N/A"}
                </p>
            </div>
        </div>
    )
}
