// components/Footer.tsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Make sure you have react-icons installed

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
        {/* Section 1: Copyright and Company Info */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-bold text-white mb-2">Cat Gallery</h3>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm mt-1">Built with Next.js and Tailwind CSS.</p>
        </div>

        {/* Section 2: Navigation Links */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Gallery</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Social Media & Contact */}
        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
              <FaTwitter />
            </a>
            <a href="mailto:info@example.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl">
              <FaEnvelope />
            </a>
          </div>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      {/* Optional: Bottom bar for policies/more copyright info */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
        <p>
          <a href="#" className="hover:underline">Privacy Policy</a> | <a href="#" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;