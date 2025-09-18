import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { fetchAllTransactions, fetchTransactions } from "../services/apis";

const MainContext = createContext();
export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [transactionsByStatus, setTransactionsByStatus] = useState([]);

    const fetchData = async () => {
        const data = await fetchTransactions();
        setTransactions(data);
    };
    const fetchAllData = async () => {
        const statusData = await fetchAllTransactions();
        setTransactionsByStatus(statusData);
    };

    useEffect(() => {
        fetchData();
        fetchAllData();
    }, []);

    function onClose() {
        setModal(false);
    }

    const values = {
        modal, setModal,
        fetchData, fetchAllData,
        onClose, transactions, transactionsByStatus,
    }

    return (
        <MainContext.Provider value={values}>
            {children}
        </MainContext.Provider>
    )
}