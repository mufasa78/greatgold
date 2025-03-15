import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#F7F7F7]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-[#FFB22C]">Great Gold</h3>
          <p className="text-[#F7F7F7] opacity-80 mb-4">
            Your trusted source for premium gold investments.
          </p>
          <p className="text-[#F7F7F7] opacity-60">
            &copy; {new Date().getFullYear()} Great Gold. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 