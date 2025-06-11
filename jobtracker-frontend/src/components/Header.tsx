
import logo from "../assets/logo.svg"
import { useState } from 'react'
import { LogOut } from 'lucide-react'

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<any>(() => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null;
  })

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null)
    window.location.href = "/"

  }


  return (

    <header className='bg-white shadow-sm border border-b-[#DBE0E5] sticky z-50'>
      <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-40 max-w-7xl mx-auto'>

      <div className='flex justify-between items-center h-16'>


        <div className='flex items-center gap-4 sm:gap-8 '>
            <div className='flex gap-2 sm:gap-3 items-center'>
              <div className='w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center'>
                <img src={logo} alt="" className='w-6 h-6'/>
              </div>
              <h1 className='text-xl sm:text-2xl font-bold text-[#121417] truncate '>JobTrackr</h1>
            </div>

            
        </div>

        {/* right side*/}

        
           {/* Right side: User Profile and Menu */}
          {currentUser ? ( 
            <div className='relative'>
              <button 
                className='flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors 
                focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2' 
                onClick={toggleUserMenu}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                
                {/* User Name */}
                <span className="text-sm font-medium text-gray-700 max-w-24 lg:max-w-32 truncate">
                  {currentUser.name} 
                </span>
                {/* Dropdown Arrow */}
                <svg
                  className={`hidden md:block w-4 h-4 text-gray-400 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div
                  className='absolute  right-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                  border border-gray-200 py-1 z-50 animate-in slide-in-from-top-2 duration-200'
                >
                  
                  {/* Sign out link */}
                  <a
                    href="#"
                    onClick={handleLogout} 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          ) : (
            
            <a href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Log In
            </a>
          )}

        </div>
      </div>

        {/* overlay */}
        {isUserMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} aria-hidden="true" />
      )}

    </header>
  )
}

export default Header