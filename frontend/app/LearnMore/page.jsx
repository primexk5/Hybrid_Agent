import React from 'react'

const page = () => {
  return (
    <>
      <main className='min-h-screen bg-black text-white text-centergray-600 flex items-center py-20 pt-32 md:pt-40 px-6 sm:px-12 md:px-24 lg:px-20'>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className='w-full lg:w-3/5 order-2 lg:order-1 text-center lg:text-left'>
            <h1 className="text-3xl md:text-4xl pb-4 font-extrabold text-gray-300">
              <span className="text-teal-800">Why HYBRID</span>Agent?
            </h1>
            <p className="text-base md:text-lg font-mono leading-relaxed">
              In the traditional property and vehicle markets, selling
              agents are highly vulnerable to commission fraud due to the lack of a secure,
              standardized payment system. To solve this, we propose a hybrid Web2 and Web3 platform that
              creates a professional, automated solution for fair commission payments. Our user-friendly Web2
              interface allows agents and owners to create deals, while a core Web3 smart contract serves as
              a tamper-proof digital escrow. Once a sale is confirmed, the smart contract
              automatically releases the pre-funded commission, eliminating the risk of non-payment.
              Initially targeting independent agents in local markets, our platform will scale by leveraging
              its borderless blockchain technology to expand into other geographic regions and high-value sales sectors,
              establishing a new standard for trust and accountability in the real-estate industry.
            </p>
          </div>

          {/* Image */}
          <div className='w-full lg:w-2/5 order-1 lg:order-2 flex justify-center'>
            <img src="/yuuuuuuu.avif" className='w-3/4 sm:w-2/3 lg:w-[60%] max-w-sm md:max-w-md animate-pulse rounded-2xl shadow-2xl' alt="Abstract visual representing hybrid technology" />
          </div>
        </div>
      </main>
    </>
  )
}

export default page