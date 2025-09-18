import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import TransactionsOverview from './TransactionsOverview';
import { useMainContext } from '../context';

export default function Home({ theme, setTheme }) {

    const { fetchAllData, fetchData} = useMainContext();

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