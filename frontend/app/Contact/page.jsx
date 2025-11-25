'use client';
import React, { useState } from 'react';
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { TbHelpTriangle } from "react-icons/tb";
import { FiChevronDown, FiSearch } from 'react-icons/fi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left font-mono text-gray-100 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-100 dark:text-gray-100 font-mono text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const page = () => {
  return (
   <>
      <div className='min-h-screen bg-black pt-28 md:pt-40 pb-20'>
        <div className=' mx-auto px-4 xl:px-60 sm:px-6 lg:px-8'>
          <div className='text-center w-full flex flex-col justify-center items-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold font-mono mb-3 text-teal-600 '>Contact Us</h2>
            <p className='text-lg text-gray-100 font-mono max-w-2xl'>
              Have questions? We're here to help. Search our FAQs or get in touch with our support team.
            </p>
            <div className="mt-6 relative w-full max-w-2xl">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder='Search for help...'
                className='border border-gray-300 dark:border-gray-300   text-gray-900 dark:text-white p-3 pl-12 w-full rounded-full outline-none focus:ring-sm focus:ring-teal-500 transition-all'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            <div className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col p-6 transform hover:-translate-y-2 transition-transform duration-300'>
              <TbHelpTriangle className='w-10 h-10 text-teal-800 dark:text-teal-800 mb-4' />
              <h3 className='font-mono font-bold text-lg text-gray-900 dark:text-white mb-2'>Report an Issue</h3>
              <p className='font-mono text-sm text-gray-600 dark:text-gray-400 flex-grow'>Find a bug? Send us a message for fast fix support.</p>
              <button className='mt-4 cursor-pointer text-sm bg-teal-800 hover:bg-teal-800 p-2 w-36  rounded-lg text-white font-mono transition-colors'>Let's Fix It</button>
            </div>

            <div className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col p-6 transform hover:-translate-y-2 transition-transform duration-300'>
              <MdOutlineAutoFixHigh className='w-10 h-10 text-teal-800 dark:text-teal-800 mb-4' />
              <h3 className='font-mono font-bold text-lg text-gray-900 dark:text-white mb-2'>Request a Feature</h3>
              <p className='font-mono text-sm text-gray-600 dark:text-gray-400 flex-grow'>Have an idea for a new feature? We'd love to hear it.</p>
              <button className='mt-4 cursor-pointer text-sm bg-teal-800 hover:bg-teal-800 p-2 w-28 rounded-lg text-white font-mono transition-colors'>Request</button>
            </div>

            <div className='border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col p-6 transform hover:-translate-y-2 transition-transform duration-300'>
              <MdSupportAgent className='w-10 h-10 text-teal-800 dark:text-teal-800 mb-4' />
              <h3 className='font-mono font-bold text-lg text-gray-900 dark:text-white mb-2'>Live Chat</h3>
              <p className='font-mono text-sm text-gray-600 dark:text-gray-400 flex-grow'>Need urgent attention? Chat with our support team <b className='animate-pulse text-green-500'>live.</b></p>
              <button className='mt-4 cursor-pointer text-sm bg-teal-800 hover:bg-teal-800 p-2 w-28 rounded-lg text-white font-mono transition-colors'>Go Live</button>
            </div>
          </div>

          <div className='mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12'>
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold font-mono text-teal-800 dark:text-teal-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-2">
                <FAQItem
                  question="How do I register as an agent?"
                  answer="To register, simply click on the 'Get Started' button on the homepage or navigate to the registration page. Fill out the required details, and you'll be ready to go."
                />
                <FAQItem
                  question="Is my data secure?"
                  answer="Absolutely. We use state-of-the-art encryption and security protocols to ensure that all your personal and transactional data is kept safe and confidential."
                />
                <FAQItem
                  question="How do I receive my commission?"
                  answer="Commissions are paid out directly to your registered bank account or preferred payment method. You can track all your earnings and payouts from your agent dashboard."
                />
                <FAQItem
                  question="What are the fees for using Hybrid Agent?"
                  answer="We have a transparent fee structure. A small percentage is deducted from each commission payout. There are no hidden charges or monthly subscription fees."
                />
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold font-mono text-teal-800 dark:text-white mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">Full Name</label>
                  <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">Email Address</label>
                  <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2  border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono">Message</label>
                  <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-3 py-2  border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 resize-none"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page;