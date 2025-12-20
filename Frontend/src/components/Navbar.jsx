import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/Appcontext';

const Navbar = () => {
  const {
    user,
    setShowUserLogin,
    setUser,
    searchTerm,
    setSearchTerm,
    loading, 
  } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname.startsWith('/admin') || (!loading && !user)) {
    return null;
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('https://e-commerce-xfwq.onrender.com/api/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Brand Logo remains visible */}
          <div className="text-white font-extrabold text-2xl">Restauranto</div>

          <div className="hidden md:flex space-x-6 items-center">
            {/* Home link removed from here */}
            
            <NavLink to="/menu" className="text-white font-medium hover:text-yellow-300">Menu</NavLink>
            
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-1 rounded-md focus:outline-none text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            
            <NavLink to="/orders" className="text-white font-medium hover:text-yellow-300">Orders</NavLink>
            <NavLink to="/prevorders" className="text-white font-medium hover:text-yellow-300">Previous Orders</NavLink>
            
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm hover:bg-yellow-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;