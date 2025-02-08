"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import lucide-react Loader2
import { toast } from "sonner";

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/authStatus", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch authentication status");
        }

        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
        if (error instanceof Error) {
          console.error("Authentication check error:", error.message);
        } else {
          console.error("Authentication check error:", error);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogOut = async () => {
    setLoading(true); // Show the loader when starting logout
    try {
      const response = await fetch("/api/auth/logout", { credentials: "include" });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      await response.json();
      toast("Logout successful");
      setIsAuthenticated(false);
    } catch (error) {
      toast("Logout failed");
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("Logout error:", error);
      }
    }
    setLoading(false); // Hide the loader after logout completes
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 md:py-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Furniro"
              width={120}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-blue-600 transition focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-[#B88E2F] transition">Home</Link>
          <Link href="/shop" className="text-gray-700 hover:text-[#B88E2F] transition">Shop</Link>
          <Link href="/about" className="text-gray-700 hover:text-[#B88E2F] transition">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#B88E2F] transition">Contact</Link>
        </nav>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <Link href="/searchProducts" className="text-gray-600 hover:text-[#B88E2F] transition">
            <IoMdSearch className="w-6 h-6" />
          </Link>

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="text-gray-600 hover:text-[#B88E2F] transition">
            <FaRegHeart className="w-6 h-6" />
          </Link>

          {/* Cart Icon */}
          <Link href="/productcart" className="text-gray-600 hover:text-[#B88E2F] transition">
            <FiShoppingCart className="w-6 h-6" />
          </Link>

          {/* Profile / Login Section (Moved after Icons) */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-600 block hover:text-[#B88E2F] transition">
                  <VscAccount className="w-6 h-6" />
                </Link>
                <Button onClick={handleLogOut} variant="ghost" className="flex gap-2 items-center">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> {/* Add Loader2 spinner */}
                      <span>Logging out...</span>
                    </>
                  ) : (
                    "Log Out"
                  )}
                </Button>
              </>
            ) : (
              <Link href="/login" className="text-[#b88e2f] hover:text-gray-500 font-black text-xl ">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
