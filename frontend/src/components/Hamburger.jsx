import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { IoClose } from 'react-icons/io5';
import { useMainContext } from '../context';

export default function Hamburger({theme}) {
    const { setModal } = useMainContext();

    return (
        <div className="fixed inset-0 bg-black/60 z-30 flex justify-end">
            <div className={`w-64 ${theme==="light" ? "bg-white text-black" : "bg-gray-900 text-white"} h-full shadow-lg p-6 relative animate-slide-in`}>
                <button
                    onClick={() => setModal(null)}
                    className="absolute top-4 right-4 hover:text-black"
                >
                    <IoClose size={24} />
                </button>

                <div className="mt-12 flex flex-col space-y-6 font-medium">
                    <Link
                        to="/transactions-by-school"
                        className="hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setModal(null)}
                    >
                        By School
                    </Link>
                    <Link
                        to="/check-status"
                        className="hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setModal(null)}
                    >
                        Check Status
                    </Link>
                </div>

                <div className="mt-8 flex flex-col space-y-4">
                    <Button
                        label="Add School"
                        onClick={() => setModal("school-modal")}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                    />
                    <Button
                        label="Add Student"
                        onClick={() => setModal("student-modal")}
                        className="bg-green-500 hover:bg-green-600 text-white w-full"
                    />
                </div>
            </div>
        </div>
    );
}