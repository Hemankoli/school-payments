import React, { useEffect } from 'react'
import Navbar from '../components/NavBar'
import TransactionsOverview from './TransactionsOverview';
import { useMainContext } from '../context';
import { useNavigate } from 'react-router-dom';

export default function Home({ theme, setTheme }) {
    const navigate = useNavigate();
    const { fetchAllData, fetchData } = useMainContext();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || user.role !== "admin") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        fetchData();
        fetchAllData();
    }, []);

    return (
        <section className={`p-4 md:p-10 ${theme === 'light' ? 'bg-primaryBackground text-primaryText' : 'bg-secondaryBackground text-secondaryText'} min-h-screen`}>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <TransactionsOverview theme={theme} />
        </section>
    )
}