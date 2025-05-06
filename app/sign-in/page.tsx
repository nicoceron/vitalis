'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        router.push('/');
      } else {
        setError(
          result.error || 'Invalid email or password. Please try again.'
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <SiteHeader />
      <main className='flex-1 bg-gray-50 flex items-center justify-center py-12'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-sm'>
          <div className='text-center mb-6'>
            <h1 className='text-2xl font-bold'>Sign in to Vitalis</h1>
            <p className='text-gray-600 mt-1'>Enter your details below</p>
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='you@example.com'
                required
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                placeholder='••••••••'
                required
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember_me'
                  type='checkbox'
                  className='h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500'
                />
                <label
                  htmlFor='remember_me'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Remember me
                </label>
              </div>
              <div className='text-sm'>
                <Link href='#' className='text-emerald-700 hover:underline'>
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don&apos;t have an account?{' '}
              <Link
                href='/register'
                className='text-emerald-700 hover:underline font-medium'
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
