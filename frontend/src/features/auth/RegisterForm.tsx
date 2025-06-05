
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export function RegisterForm() {
    const [email, setEmail] = useState("");
    // Removed unused state for setNAme
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulamos el registro
        //LocalStorage
        login(email);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto bg-white p-6 rounded shadow">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Regter</button>
        </form>
    );
}
