'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TurnosList from './components/TurnosList';

export default function AdminPage() {
  const router = useRouter();

  const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    const found = cookies.find((row) => row.startsWith(name + '='));
    return found ? decodeURIComponent(found.split('=')[1]) : null;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="p-8 space-y-4 bg-neutral-900 min-h-screen text-neutral-50">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center mt-8">Panel Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-neutral-50 px-4 py-2 rounded-md cursor-pointer hover:bg-red-500"
        >
          Cerrar sesión
        </button>
      </div>
      <TurnosList />
    </div>
  );
}