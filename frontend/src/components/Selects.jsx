import React from 'react'

export default function Selects({ label, options, value, onChange, placeholder, theme }) {
    return (
        <div className="w-full">
            {label && (
                <label className={`block mb-1 text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>{label}</label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm outline-none ${theme === "light" ? "text-gray-900 bg-white/80" : "text-white bg-gray-900/50"}`}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options?.map((option, index) => (
                    <option key={index} value={option?.value}>
                        {option?.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
