import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function Theme({toggleTheme, theme}) {
    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "light" ? "bg-gray-200 bg-gray-80" : "bg-gray-200 bg-gray-900"} hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors duration-300`}
        >
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

    )
}
