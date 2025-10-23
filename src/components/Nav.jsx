import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.jpg'; // ✅ Import your JPG logo

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-black shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        
        {/* Logo + Project Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <div className="font-serif text-2xl sm:text-3xl text-white">Lost & Found</div>
        </div>

        {/* Hamburger Button */}
        <button 
          className="text-white text-2xl sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6 text-lg font-sans text-gray-300">
          {token ? (
            <>
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/about" className="hover:text-white transition">About</Link>
              <Link to="/upload" className="hover:text-white transition">Upload</Link>
              <Link to="/profile" className="hover:text-white transition">Profile</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
              <button onClick={logout} className="ml-2 hover:text-red-400 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white transition">Login</Link>
              <Link to="/register" className="hover:text-white transition">Register</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
              
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-gray-900 text-gray-300 flex flex-col p-4 space-y-2">
          {token ? (
            <>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">About</Link>
              <Link to="/upload" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Upload</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Profile</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Contact</Link>
              <button 
                onClick={() => { logout(); setIsOpen(false); }} 
                className="hover:bg-red-600 hover:text-white px-3 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
             
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Register</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 px-3 py-2 rounded">Contact</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
