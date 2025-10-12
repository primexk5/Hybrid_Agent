import React from 'react'

const page = () => {
  return (
    <div className='mb-10 mt-26 px-4'>
       <div className='flex justify-center'>
            
           <form action="" method="POST" className='w-full font-mono max-w-3xl flex border flex-col border-gray-200 shadow-2xl rounded-2xl p-4 md:p-8'>
              <h3 className='text-xl md:text-xl text-start font-mono text-teal-800 mb-8'><b>Welcome, please Register</b></h3>
              <div className='flex flex-col mb-8'>
                {/* <label htmlFor="fullName">Full name</label> */}
                 <input id="fullName" name="fullName" type="text" placeholder='Fullname'  className='w-full border mt-2 border-gray-300 bg-gray-50 outline-none p-4 rounded-2xl'/>
              </div>


              <div className='flex flex-col mb-8'>
                {/* <label htmlFor="userName">Username</label> */}
                 <input id="userName" name="userName" type="text" placeholder='Username'  className='w-full border mt-2 border-gray-300  bg-gray-50 outline-none p-4 rounded-2xl'/>
              </div>


              <div className='flex flex-col mb-8'>
                {/* <label htmlFor="phoneNumber">Phone Number</label> */}
                 <input id="phoneNumber" name="phoneNumber" type="tel" placeholder='Phone Number '  className='w-full border mt-2 border-gray-300  bg-gray-50 outline-none p-4 rounded-2xl'/>
              </div>

              <div className='flex flex-col mb-8'>
                {/* <label htmlFor="email">Email</label> */}
                 <input id="email" name="email" type="email" placeholder='Email'  className='w-full border mt-2 border-gray-300  bg-gray-50 outline-none p-4 rounded-2xl'/>
              </div>

               <div className='flex flex-col mb-8'>
                {/* <label htmlFor="bio">Bio</label> */}
                 <textarea id="bio" name="bio" placeholder='Tell us a bit about yourself'  className='w-full h-40 border mt-2 border-gray-300 bg-gray-50 outline-none p-4 rounded-2xl resize-none'/>
              </div>

              <div>
                <button className='w-full cursor-pointer border-2 mt-2 border-teal-50 bg-teal-800 text-xl text-white font-bold outline-none p-4 rounded-2xl'>Register</button>
              </div>
           </form>
       </div>
    </div>
  )
}

export default page