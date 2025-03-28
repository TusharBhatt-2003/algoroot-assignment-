import { useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/auth-context';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { user, logout, deleteAccount } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => logout();
  const handleDelete = () => deleteAccount();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/details">
                <a className="text-xl font-bold">Logo</a>
              </Link>
            </div>
            <div className="relative flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <span className="sr-only">User menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-32 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700">{user?.email}</div>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleDelete}
                      className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white shadow-sm p-4">
          <nav>
            <Link href="/details">
              <a className={`block p-2 rounded ${router.pathname === '/details' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
                Details
              </a>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}