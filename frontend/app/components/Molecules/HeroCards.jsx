"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const HeroCards = () => {
  const router = useRouter()

  const handleLearnMore = () => {
    router.push('/LearnMore')
  }

  const handlegetStarted = () => {
    router.push('/Registration')
  }


  return (
    <>
      <div className='flex flex-col justify-center items-center md:items-start text-center md:text-start text-white'>
        <div className="w-full">
          <div className='font-mono text-3xl sm:text-5xl lg:text-4xl'>
            <h1 className='font-extrabold pb-4 md:pb-8'>
              <b className='text-teal-800 font-extrabold'>HYBRID</b>AGENT
            </h1>
            <div className=''>
              <div className="w-full text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-2">
                <p>A highly secure way to receive commissions
                  <b className='text-teal-500'> LOCALLY</b> & <b className='text-teal-500'>INTERNATIONALLY</b>
                </p>
                <p>on property/vehicle sales, <b>fast and easy.</b></p>
              </div>
            </div>
          </div>

          <div className='mt-8 flex flex-col justify-start sm:flex-row items-center sm:justify-start gap-4'>
            <button className='bg-teal-800 hover:bg-teal-700 transition text-white font-extrabold py-3 px-6 w-full sm:w-auto rounded-2xl'
              onClick={handlegetStarted}
            >Get Started</button>
            <button
              className='border border-gray-300 hover:bg-white/20 transition text-white font-extrabold py-3 px-6 w-full sm:w-auto rounded-2xl'
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroCards