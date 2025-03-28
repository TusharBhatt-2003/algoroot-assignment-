"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/auth-context";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = () => {
    if (signup(name, email, password)) {
      router.push("/details");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br bg-gradient-to-br from-zinc-900 via-zinc-900 to-black-900">
      <div className="bg-black p-8 rounded-3xl shadow-xl text-center border border-white/20 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Create an Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl focus:ring focus:ring-zinc-500 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl focus:ring focus:ring-zinc-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-xl focus:ring focus:ring-zinc-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full mt-5 px-6 py-2 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-900 transition"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
