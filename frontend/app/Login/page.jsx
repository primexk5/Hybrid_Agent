'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to their profile
    if (localStorage.getItem('currentUser')) {
      toast.success('You are already logged in!');
      router.push('/Profile');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loginPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // First, try the single `currentUser` entry (used by Registration)
        const storedCurrent = localStorage.getItem('currentUser');
        if (storedCurrent) {
          try {
            const userData = JSON.parse(storedCurrent);
            if (userData.email === formData.email && userData.password === formData.password) {
              return resolve('Login successful!');
            }
          } catch (e) {
            // fall through to check `users` array
          }
        }

        // Next, support older/alternate format where multiple users are stored under `users`
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          try {
            const usersArr = JSON.parse(storedUsers);
            if (Array.isArray(usersArr)) {
              const matched = usersArr.find((u) => u.email === formData.email && u.password === formData.password);
              if (matched) {
                // promote matched user to `currentUser` so app behaves consistently
                localStorage.setItem('currentUser', JSON.stringify(matched));
                return resolve('Login successful!');
              }
            }
            return reject(new Error('Invalid email or password.'));
          } catch (err) {
            return reject(new Error('Stored users data is corrupted. Please register again.'));
          }
        }

        // No user data found
        return reject(new Error('No user registered. Please sign up first.'));
      }, 1500);
    });

    toast.promise(loginPromise, {
      loading: 'Logging in...',
      success: (message) => {
        setIsSubmitting(false);
        // show a success toast explicitly with custom duration
        toast.success(message, { duration: 1500 });
        // notify other components (Navbar) that auth changed
        try { window.dispatchEvent(new Event('authChanged')); } catch (e) {}
        // wait for the toast to be visible, then navigate
        setTimeout(() => router.push('/Profile'), 700);
        return <b>{message}</b>;
      },
      error: (err) => {
        setIsSubmitting(false);
        return <b>{err.toString()}</b>;
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url('/bgttt.avif')` }}
    >
      
      <div className="w-full max-w-md bg-black rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-800">
        <h3 className="text-2xl md:text-3xl text-center font-bold text-teal-700 mb-6">Welcome Back</h3>
        <p className="text-center text-sm text-gray-400 mb-6">Sign in to continue to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600"><FiMail /></span>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className='w-full pl-10 border border-gray-600 text-gray-200 outline-none p-3 rounded-lg bg-black' />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600"><FiLock /></span>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required className='w-full pl-10 border border-gray-600 text-gray-200 outline-none p-3 rounded-lg bg-black' />
            </div>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className='w-full inline-flex items-center justify-center bg-teal-800 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-800 text-lg text-white font-semibold p-3 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors'>
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-400">Don't have an account? <a className='text-teal-700 underline' href="/Registration">Register here</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;