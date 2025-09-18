import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTransactions = async () => {
    const response = await axios.get(`${API_BASE_URL}/get-orders`);
    return response.data;
}

export const fetchAllTransactions = async () => {
    const response = await axios.get(`${API_BASE_URL}/get-all-orders`);
    return response.data;
}
