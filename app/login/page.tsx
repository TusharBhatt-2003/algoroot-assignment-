"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (login(email, password)) {
      router.push("/details");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black-900">
      <div className="bg-black p-8 rounded-3xl shadow-xl text-center border border-white/20 max-w-sm w-full">
        <h2 className="tmx-auto mb-4 text-white text-4xl font-bold">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-zinc-900 text-white border rounded-xl focus:ring focus:ring-zinc-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl focus:ring focus:ring-zinc-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          className="w-full mt-5 px-6 py-2 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-900 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
