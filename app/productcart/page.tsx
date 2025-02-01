"use client";

import React from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Link from "next/link";
import Image from "next/image";
import Quality from "@/app/components/quality";
import { useCart } from "@/app/context/CartContext"; // Import useCart context

const CartPage = () => {
  const { cart, updateCart, removeFromCart } = useCart(); // Access cart state and functions

  // Calculate subtotal and total
  const calculateSubtotal = (price: number, quantity: number) => price * quantity;
  const calculateTotal = () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty!</h2>
          <Link href="/">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Continue Shopping
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full flex items-center justify-between p-4 md:p-16">
        <h2 className="flex items-center justify-between text-slate-300 tracking-wide">
          Home / <span className=" text-black"> Cart</span>
        </h2>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-around p-0 md:p-16">
        {/* Cart Items Section */}
        <div className="w-full md:w-4/6">
          <div className="w-full p-4 flex flex-wrap md:flex-nowrap justify-around items-center bg-[#F9F1E7]">
            <h2 className="font-medium text-lg">Product</h2>
            <h2 className="font-medium text-lg">Price</h2>
            <h2 className="font-medium text-lg">Quantity</h2>
            <h2 className="font-medium text-lg">Subtotal</h2>
          </div>

          {cart.map((item) => (
            <div
              key={item._id}
              className="w-full flex justify-around items-center mt-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {/* Product Name and Image */}
              <h2 className="font-medium text-lg flex flex-col md:flex-row items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={60}
                  height={40}
                  className="w-10 md:w-20 rounded-md"
                />
                <span className="text-[#9F9F9F] ml-2">{item.title}</span>
              </h2>

              {/* Price */}
              <h2 className="font-medium text-sm md:text-lg text-[#9F9F9F]">
                Rs. {item.price.toLocaleString()}
              </h2>

              {/* Quantity */}
              <h2 className="font-medium text-lg">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCart(item._id, parseInt(e.target.value) || 1)}
                  className="border-2 border-black w-10 md:w-14 text-center"
                  min="1"
                />
              </h2>

              {/* Subtotal */}
              <h2 className="font-medium text-sm md:text-lg">
                Rs. {calculateSubtotal(item.price, item.quantity).toLocaleString()}
              </h2>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="w-full md:w-[25%] h-60 border flex flex-col mt-0 md:mt-[-40px] p-2 md:p-0 bg-[#F9F1E7] rounded-lg md:justify-end">
          <h2 className="font-semibold text-[32px] text-center leading-7">Cart Total</h2>
          <div className="flex justify-between mt-4">
            <p className="ml-4">Subtotal:</p>
            <p className="mb-4 mr-4">Rs. {calculateTotal().toLocaleString()}</p>
          </div>

          <div className="flex justify-between mt-4">
            <p className="ml-4">Total:</p>
            <p className="mb-4 mr-4">Rs. {calculateTotal().toLocaleString()}</p>
          </div>

          <div className="w-full flex justify-center">
            <button className="w-[150px] mt-6 md:w-[180px] rounded-lg h-14 text-black bg-transparent border border-black hover:border-0 hover:bg-[#B88E2F] hover:text-white">
              <Link href="/checkout" className="font-medium text-base leading-6">
                Check Out
              </Link>
            </button>
          </div>
        </div>
      </div>

      <Quality />
      <Footer />
    </>
  );
};

export default CartPage;
