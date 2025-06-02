import React from 'react'
import logo from "../assets/logo.svg"

const Header = () => {
  return (

    <header className='bg-white shadow-sm border border-b-[#DBE0E5] sticky z-50'>
      <div className='px-4 sm:px-6 lg:px-8'>

      <div className='flex justify-between items-center h-16'>

      
      
        <div className='flex items-center gap-4 sm:gap-8 '>
            <div className='flex gap-2 sm:gap-3 items-center'>
              <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center'>
                <img src={logo} alt="" className='w-6 h-6'/>
              </div>
              <h3 className='text-xl sm:text-2xl font-bold text-[#121417] '>JobTrackr</h3>
            </div>



            <nav className='hidden md:flex gap-6 text-gray-600 '>
              <a href="#" className="text-md">Dashboard</a>
              <a href="#" className="text-md">Applications</a>
              <a href="#" className="text-md">Resources</a>
            </nav>
        </div>

        {/* search */}

        <div className='flex items-center sm:gap-8'>
          <div className='relative hidden md:flex'>
            <svg
            className="w-5 h-5 text-gray-400 absolute left-2 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
            <input type="text"
            placeholder='Search'
            className='md:rounded-lg bg-[#F0F2F5] md:pl-9 py-2 max-w-40 text-[#61758A] outline-none' />
          </div>
          <div>
            <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with a real user avatar image
            alt="User Avatar"
            className="w-9 h-9 rounded-full object-cover cursor-pointer"
              />
          </div>
          </div>
          </div>

        </div>

    </header>
  )
}

export default Header