'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if (res.ok) {
      document.cookie = `token=${data.jwt}; path=/`;
      router.push('/admin');
    } else {
      setError(data.error?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <form onSubmit={handleLogin} className="bg-neutral-800 p-8 rounded-xl shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center text-neutral-50">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-700 rounded-md focus:outline-none focus:ring focus:ring-neutral-600 bg-neutral-700 text-neutral-50"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-neutral-700 rounded-md focus:outline-none focus:ring focus:ring-neutral-600 bg-neutral-700 text-neutral-50"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-neutral-600 text-neutral-50 py-2 rounded-md hover:bg-neutral-500">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
