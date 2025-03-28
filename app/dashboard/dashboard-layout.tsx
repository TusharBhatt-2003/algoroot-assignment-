"use client";
import { useAuth } from "../contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, deleteAccount } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    }

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`absolute md:relative md:translate-x-0 w-64 bg-black  lg:border-r p-6  flex flex-col transition-transform lg:rounded-none  rounded-3xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a
            href="#"
            className="block py-2 px-4 rounded-xl hover:bg-zinc-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded-xl hover:bg-zinc-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Profile
          </a>
          <a
            href="#"
            className="block py-2 px-4 rounded-xl hover:bg-zinc-800 transition"
            onClick={() => setSidebarOpen(false)}
          >
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center  p-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-2 rounded-xl bg-zinc-800 hover:bg-gray-600 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4 text-lg">
            <p className="hidden sm:block font-semibold">
              {user?.name} |{" "}
              <span className="font-thin text-base">{user?.email}</span>
            </p>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="bg-red-900 px-4 py-2 rounded-xl text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
            <button
              onClick={() => {
                deleteAccount();
                router.push("/");
              }}
              className="bg-zinc-800 px-4 py-2 rounded-xl text-red-200 hover:bg-red-600 hover:text-white transition"
            >
              Delete Account
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
