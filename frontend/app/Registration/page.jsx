'use client';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiUser, FiAtSign, FiPhone, FiMail, FiEdit } from 'react-icons/fi';

const page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    phoneNumber: '',
    email: '',
    bio: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required.';
    if (!formData.userName) newErrors.userName = 'Username is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call for registration
    const registrationPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a random success or failure
        if (Math.random() > 0.3) {
          resolve('Registration successful!');
        } else {
          reject(new Error('Registration failed. Please try again.'));
        }
      }, 2000);
    });

    toast.promise(registrationPromise, {
      loading: 'Registering...',
      success: (message) => {
        setIsSubmitting(false);
        // Reset form or redirect user
        setFormData({ fullName: '', userName: '', phoneNumber: '', email: '', bio: '' });
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
      <Toaster position="top-center" reverseOrder={false} />

        {/* Form panel */}
        <div className="w-full flex items-center justify-center">
          <form onSubmit={handleSubmit} noValidate className="w-full max-w-xl bg-black rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-800">
            <h3 className="text-2xl md:text-3xl text-center font-bold text-teal-700 mb-6">Create your account</h3>

            <p className="text-center text-sm text-gray-4z00 mb-6">We only ask for a few details to get you started. Your information is safe.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-400">Full name</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 dark:text-teal-400"><FiUser /></span>
                  <input id="fullName" name="fullName" type="text" placeholder='Bash king' value={formData.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} required className='w-full pl-10 border border-gray-200 dark:border-gray-600 text-gray-200 outline-none p-3 rounded-lg ' />
                </div>
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-400">Username</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 dark:text-teal-400"><FiAtSign /></span>
                  <input id="userName" name="userName" type="text" placeholder='fait55' value={formData.userName} onChange={handleChange} aria-invalid={!!errors.userName} required className='w-full pl-10 border border-gray-200 dark:border-gray-600 text-gray-200 outline-none p-3 rounded-lg ' />
                </div>
                {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400">Phone</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 dark:text-teal-400"><FiPhone /></span>
                  <input id="phoneNumber" name="phoneNumber" type="tel" placeholder='+234814567890' value={formData.phoneNumber} onChange={handleChange} aria-invalid={!!errors.phoneNumber} required className='w-full pl-10 border border-gray-200 dark:border-gray-600 text-gray-200 outline-none p-3 rounded-lg '/>
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                <div className="mt-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 dark:text-teal-400"><FiMail /></span>
                  <input id="email" name="email" type="email" placeholder='you@domain.com' value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} required className='w-full pl-10 border border-gray-200 dark:border-gray-600 outline-none p-3 rounded-lg ' />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-400">About you</label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-3 text-teal-600 dark:text-teal-400"><FiEdit /></span>
                <textarea id="bio" name="bio" placeholder='A short bio' value={formData.bio} onChange={handleChange} className='w-full pl-10 border border-gray-200 dark:border-gray-600 text-gray-200 outline-none p-16 rounded-lg ' />
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" disabled={isSubmitting} className='w-full inline-flex items-center justify-center bg-teal-800 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-800 text-lg text-white font-semibold p-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'>
                {isSubmitting ? 'Registering...' : 'Create account'}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">By creating an account you agree to our Terms of Service.</p>
          </form>
        </div>
    </div>
  );
}

export default page;