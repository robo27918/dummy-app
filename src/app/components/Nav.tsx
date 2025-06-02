// components/Nav.jsx
"use client"
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left Side - Navigation Links */}
      <div className="flex gap-4">
        <a href="/">Home</a>
        <a href="/gallery">Gallery</a>
        <a href="/about">About</a>
      </div>

      {/* Right Side - Avatar */}
      <div className="relative">
        <img
          src="/avatar.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
            <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
}
