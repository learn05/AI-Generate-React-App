import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-600">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AI Generator App. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Built with React, Tailwind CSS, and AI magic
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
