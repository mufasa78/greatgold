import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#F7F7F7] shadow-sm border-b border-[#FFB22C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#FFB22C] hover:text-[#854836] transition-colors duration-300">
              Great Gold
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 