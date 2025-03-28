"use client";
import mockData from "../data/mockData";
import DashboardLayout from "../dashboard/dashboard-layout";
import { useState } from "react";

type User = {
  name: string;
  email: string;
  role: string;
  status: string;
  joinedDate: string;
  lastLogin: string;
};

export default function Details() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = mockData.filter((user) =>
    Object.entries(user).some(([key, value]) => {
      if (typeof value === "string") return value.toLowerCase().includes(searchQuery.toLowerCase());
      if (typeof value === "number" || value instanceof Date) return value.toString().includes(searchQuery);
      return false;
    })
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    const aValue = key.includes("Date") ? new Date(a[key]).getTime() : a[key].toString();
    const bValue = key.includes("Date") ? new Date(b[key]).getTime() : b[key].toString();

    return direction === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handleSort = (key: keyof User) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-6 text-white shadow-lg w-full max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">User Details</h2>

        <input
          type="text"
          placeholder="Search by any field..."
          className="w-full p-2 rounded-xl bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="bg-zinc-900 text-zinc-300 text-left">
                {["name", "email", "role", "status"].map((key) => (
                  <th
                    key={key}
                    className="p-2 sm:p-3 cursor-pointer hover:bg-black transition whitespace-nowrap"
                    onClick={() => handleSort(key as keyof User)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                    {sortConfig?.key === key && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                ))}
                <th
                  className="p-2 sm:p-3 cursor-pointer hover:bg-black transition whitespace-nowrap hidden md:table-cell"
                  onClick={() => handleSort("joinedDate")}
                >
                  Joined Date {sortConfig?.key === "joinedDate" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-2 sm:p-3 cursor-pointer hover:bg-black transition whitespace-nowrap hidden md:table-cell"
                  onClick={() => handleSort("lastLogin")}
                >
                  Last Login {sortConfig?.key === "lastLogin" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {currentData.length > 0 ? (
                currentData.map((user, index) => (
                  <tr key={index} className="border-t hover:bg-zinc-900 transition">
                    <td className="p-2 sm:p-3 whitespace-nowrap">{user.name}</td>
                    <td className="p-2 sm:p-3 whitespace-nowrap">{user.email}</td>
                    <td className="p-2 sm:p-3">{user.role}</td>
                    <td
                      className={`p-2 sm:p-3 ${
                        user.status === "Active"
                          ? "text-green-400"
                          : user.status === "Inactive"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.status}
                    </td>
                    <td className="p-2 sm:p-3 whitespace-nowrap hidden md:table-cell">{user.joinedDate}</td>
                    <td className="p-2 sm:p-3 whitespace-nowrap hidden md:table-cell">{user.lastLogin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 bg-zinc-700 rounded text-gray-300 hover:bg-zinc-900 transition disabled:opacity-50 w-1/3 sm:w-auto"
          >
            Prev
          </button>
          <span className="text-zinc-400 text-sm sm:text-base">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => (indexOfLastRow < sortedData.length ? prev + 1 : prev))}
            disabled={indexOfLastRow >= sortedData.length}
            className="px-3 sm:px-4 py-2 bg-zinc-700 rounded text-gray-300 hover:bg-zinc-900 transition disabled:opacity-50 w-1/3 sm:w-auto"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
