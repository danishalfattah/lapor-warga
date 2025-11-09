'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Call login API
    console.log('Login:', { email, password });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark-brown">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-dark-brown">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-dark-brown/20 px-4 py-2 text-dark-brown"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-yellow py-3 font-semibold text-dark-brown transition hover:bg-primary-yellow/90 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Login'}
      </button>

      <p className="text-center text-sm text-dark-brown/70">
        Belum punya akun?{' '}
        <Link href="/register" className="font-medium text-primary-yellow hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}
