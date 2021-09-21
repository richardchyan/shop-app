import React from 'react'
import { GrCart } from 'react-icons/gr';

const Navbar = ({ toggleCartOpen }) => {
   return (
      <div id='#' className="sticky-nav md:static w-full py-8 mb-8 bg-blue-800 rounded-lg">
         <div className="flex justify-center md:justify-evenly p-2 space-x-3">
            <h1 className="text-3xl md:text-6xl text-white uppercase track-wider border-4 border-white border-dotted w-3/4 md:w-2/3 md:m-auto py-4">John's Pawn Shop</h1>
            <button onClick={toggleCartOpen} className="text-4xl bg-blue-200 rounded-lg p-2 md:hidden">
               <GrCart /> 
            </button>
         </div>
         <h2 className="text-2xl mt-4 text-white">A collection of miscellaneous goods!</h2>
         <div className="mt-4">
            <span className="rounded bg-blue-200 p-2 uppercase tracking-wider text-lg">* Free shipping on orders over $199!</span>
         </div>
      </div>
   )
}

export default Navbar
