import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {pages.map((pgx) => (
                <button
                    key={pgx}
                    onClick={() => setPage(pgx)}
                    className={`px-3 py-1 rounded-sm font-medium transition-all duration-200 
            ${page === pgx
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    {pgx}
                </button>
            ))}
        </div>
    );
}