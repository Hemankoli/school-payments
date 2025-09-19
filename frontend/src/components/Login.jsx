import React, { useState } from "react";
import { failedPayment, phoneLengthIsGreater } from "../notifications";
import InputField from "./InputField";
import Button from "./Button";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useMainContext } from "../context";

export default function Login() {
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const school_id = import.meta.env.VITE_SCHOOL_ID;
    const amount = "100";
    const { setLoading, loading } = useMainContext();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        if(form.phone.length < 10 || form.phone.length > 10) {
            phoneLengthIsGreater();
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login-and-pay`, {
                ...form,
                school_id,
                trustee_id: school_id,
                student_id: `STD${Date?.now()?.toString()?.slice(0, 6)}`,
                amount,
            });
            if (res?.data?.paymentUrl) {
                window.location.href = res?.data?.paymentUrl;
            } else {
                failedPayment();
            }
        } catch (err) {
            console.error("Login/Payment error:", err);
            failedPayment();
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-sm mx-auto bg-white shadow p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <form className="space-y-4">
                    <InputField
                        labelName="Name"
                        name="name"
                        type="name"
                        value={form?.name}
                        method={handleChange}
                        placeholder="Enter Name"
                    />
                    <InputField
                        labelName="Email"
                        name="email"
                        type="email"
                        value={form?.email}
                        method={handleChange}
                        placeholder="Enter Email"
                    />
                    <InputField
                        labelName="Phone"
                        name="phone"
                        type="number"
                        value={form?.phone}
                        method={handleChange}
                        placeholder="Enter Phone"
                    />
                    <Link className="text-[14px] flex justify-end underline italic text-orange-500" to={"/admin-access"}>Admin Login</Link>
                </form>
                <Button disabled={loading} className="w-fit mx-auto  flex items-center" label={"Save and Pay"} onClick={handleLogin} />
            </div>
        </section>
    );
}
