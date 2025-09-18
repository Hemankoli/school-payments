import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckStatus from "./pages/CheckStatus";
import Home from "./pages/Home";
import TransactionBySchool from "./pages/TransactionBySchool";
import { useMainContext } from "./context";
import Hamburger from "./components/Hamburger";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import Login from "./components/Login";
import PaymentSuccess from "./pages/PaymentSuccess";

export default function App() {
  const {modal} = useMainContext();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/admin-dashboard" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/admin-dashboard/check-status" element={<CheckStatus theme={theme}  />} />
        <Route path="/admin-dashboard/transactions-by-school" element={<TransactionBySchool theme={theme}  />} />
        <Route path="/login-and-pay" element={<Login  />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      {modal === "menu-modal" && <Hamburger theme={theme}  key={'menu-modal'} />}
    </BrowserRouter>
  );
}
