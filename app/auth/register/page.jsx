"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth/login");
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="p-10">
      <h1>Create Account</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} required />
        <input placeholder="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})} required />
        <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} required />
        <input placeholder="Confirm Password" type="password" onChange={(e)=>setForm({...form,confirmPassword:e.target.value})} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
