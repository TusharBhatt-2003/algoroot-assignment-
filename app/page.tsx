"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black-900">
      <div className="bg-black p-10 rounded-3xl text-center border border-white/20 max-w-sm">
        {/* <Image src="/logo.png" alt="Logo" width={60} height={60} className="mx-auto mb-4" /> */}
        <h1 className="mx-auto mb-4 text-white text-4xl font-bold">LOGO</h1>
        <h1 className="text-3xl font-semibold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-300 mb-6 text-sm">
          Sign in or create an account to continue.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full px-6 py-2 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="w-full px-6 py-2 bg-zinc-800 text-white rounded-xl font-medium hover:bg-zinc-900 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
