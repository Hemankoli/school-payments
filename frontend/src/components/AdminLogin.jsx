import React, { useState } from "react";
import { adminAccess } from "../notifications";
import InputField from "./InputField";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useMainContext } from "../context";

export default function AdminLogin() {
    const email = import.meta.env.VITE_ADMIN_EMAIL_ID;
    const password = import.meta.env.VITE_ADMIN_PASSWORD
    const [form, setForm] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const { setLoading } = useMainContext();
    

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (form.email !== email || form.password !== password) {
            adminAccess();
            return;
        }
        try {
            setLoading(true);
            const adminUser = { email: form.email, role: "admin" };
            sessionStorage.setItem("user", JSON.stringify(adminUser));
            navigate("/admin-dashboard");
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-sm mx-auto bg-white shadow p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-bold mb-4">Admin Access</h2>
                <form className="space-y-4">
                    <InputField
                        labelName="Email"
                        name="email"
                        type="email"
                        value={form?.email}
                        method={handleChange}
                        placeholder="Enter Email"
                    />
                    <InputField
                        labelName="Password"
                        name="password"
                        type="password"
                        value={form?.password}
                        method={handleChange}
                        placeholder="Enter Password"
                    />
                    <Link className="text-[14px] flex justify-end underline italic text-orange-500" to={"/"}>Login</Link>
                </form>
                <Button className="w-fit mx-auto  flex items-center" label={"Admin Login"} onClick={handleLogin} />
            </div>
        </section>
    );
}
