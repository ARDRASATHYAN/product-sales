import React, { useState } from "react";
import ProductForm from "./form/product/ProductFrom";
import Modal from "./ui/Model";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);  
  const [isModalOpen, setIsModalOpen] = useState(false); 

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
         
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-blue-600">Product & Sales</span>
          </div>

         
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
           <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"  onClick={() => setIsModalOpen(true)}>AddProduct</a>
            <a href="/sale" className="text-gray-700 hover:text-blue-600">sale</a>
          </div>

         
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
          <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100"  onClick={() => setIsModalOpen(true)}>AddProduct</a>
          <a href="/sale" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">sale</a>

        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        
      >
        <ProductForm/>
      </Modal>
    </nav>
  );
}
