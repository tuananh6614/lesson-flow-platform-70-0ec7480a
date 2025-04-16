
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">EPULearn</span>
        </Link>
        
        <button 
          data-collapse-toggle="navbar-default" 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-white hover:bg-blue-700 focus:ring-gray-200"
          aria-controls="navbar-default" 
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link to="/" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">Home</Link>
            </li>
            <li>
              <Link to="/courses" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">Courses</Link>
            </li>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <Link to="/admin" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">Admin Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link to="/profile" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">My Profile</Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-white hover:text-gray-200 rounded md:p-0">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
