"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res.error) {
      router.push("/"); // redirect to home
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl w-full p-8 rounded-2xl max-w-md">

        <h2 className="text-3xl font-bold text-center mb-8">LOGIN</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
            <FaUser className="text-indigo-400 mr-3" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent text-gray-700"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
            <FaLock className="text-indigo-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none bg-transparent"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-gray-300 text-black py-2 mt-2 rounded-lg"
          >
            < FcGoogle /> Login with Google
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-indigo-600 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
