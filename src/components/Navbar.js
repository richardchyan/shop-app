import React from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../images/john-logo.svg';

const Navbar = ({ toggleCartOpen }) => {
   return (
      <div id='#' className="sticky-nav md:static md:pb-4 mb-2 md:mb-8 bg-blue-800 rounded-sm">
         <div className="flex justify-between md:justify-evenly px-2 py-1 items-center">
            <div className="flex justify-start md:justify-evenly items-center">
               <img src={logo} className="w-1/6" alt="John's Pawn shop" />
               <h1 className="p-2 text-2xl md:text-4xl text-white uppercase track-wider">John's Pawn Shop</h1>
            </div>
            <h2 className="block md:hidden text-xs text-white">* Free shipping over $199!</h2>
            <button onClick={toggleCartOpen} className="text-2xl text-white border-white border-2 rounded-lg px-4 py-2 md:hidden">
               <FiShoppingCart /> 
            </button>
         </div>
         <span className="hidden md:block text-lg text-white">A collection of miscellaneous goods!</span>
         <span className="hidden md:inline-block mt-2 rounded bg-blue-50 p-1 uppercase tracking-wider text-xs">* Free shipping on orders over $199!</span>
       
      </div>
   )
}

export default Navbar
