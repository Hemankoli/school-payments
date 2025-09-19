import React from "react";

export default function Button({ label, onClick, className, disabled='' }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative overflow-hidden rounded-sm px-6 py-2 font-semibold 
      text-white bg-gradient-to-r from-orange-400 to-orange-600 
      shadow-md transition-all duration-300 
      hover:from-orange-500 hover:to-orange-700 
      hover:shadow-lg hover:scale-105 active:scale-95 
      focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-300"></span>
    </button>
  );
}
