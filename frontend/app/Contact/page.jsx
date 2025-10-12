import React from 'react'
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import { TbHelpTriangle } from "react-icons/tb";

const page = () => {
  return (
   <>
    <div className='min-h-screen pt-28 md:pt-40 pb-20'>
         <div className='flex justify-center items-center px-4 md:px-10 lg:px-20 xl:px-60'>
            <div className='text-center w-full flex flex-col justify-center items-center mb-10 md:mb-20'>
                <h2 className='text-2xl font-mono mb-3 text-teal-800'><b>Contact us</b></h2>
                <p className='text-xl text-gray-600 font-mono'>Hello, how can we help you?</p>
                <input type="text" placeholder='text message' className='border border-gray-300 p-2 mt-3 w-full max-w-2xl rounded-lg outline-none' />
            </div>
         </div>

          <div className='px-4 md:px-10 lg:px-20 xl:px-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
             <div className='w-full h-full border border-gray-300 rounded-lg flex flex-col shadow-sm p-4'>
                <p className='font-mono text-sm mb-2'><b>Issues</b></p>
                <div>
                  <TbHelpTriangle className='w-10 h-10 text-teal-600 mb-2'/>
                  <p className='font-mono text-sm text-gray-600'>Find a bug ? Send us a message for fast fix support.</p>
                  <button className='mt-2 cursor-pointer text-sm border border-teal-900 bg-teal-700  p-1 w-20 rounded-sm text-white font-mono'>Lets Fix</button>
                 </div>
             </div>
             
             <div className='w-full h-full border border-gray-300 rounded-lg flex flex-col shadow-sm p-4'>
                <p className='font-mono text-sm mb-2'><b>Request feature</b></p>
              <div>
                  <MdOutlineAutoFixHigh className='w-10 h-10 text-teal-600 mb-2'/>
                  <p className='font-mono text-sm text-gray-600'>Do you wish to request a feature? Send us a message.</p>
                  <button className='mt-2 cursor-pointer text-sm border border-teal-900 bg-teal-700  p-1 w-20 rounded-sm text-white font-mono'>Request</button>
                 </div>

             </div>
             
             <div className='w-full h-full border border-gray-300 rounded-lg flex flex-col shadow-sm p-4'>
                <p className='font-mono text-sm mb-2'><b>Live Chat</b></p>
                 <div>
                  <MdSupportAgent className='w-10 h-10 text-teal-600 mb-2'/>
                  <p className='font-mono text-sm text-gray-600'>Got urgent attention? Chat with our support team <b className='animate-pulse text-green-600'>live.</b></p>
                  <button className='mt-2 cursor-pointer text-sm border border-teal-900 bg-teal-700  p-1 w-20 rounded-sm text-white font-mono'>Go Live</button>
                 </div>
             </div>
          </div>

          <div className='px-4 md:px-10 lg:px-20 xl:px-60'> 
            <div className='w-full h-80 mt-10 border border-gray-300 rounded-lg shadow-sm'>

            </div>
          </div>
    </div>
   </>
  )
}

export default page