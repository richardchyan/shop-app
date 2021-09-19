import React from 'react'

const Navbar = () => {
   return (
      <div className="py-10 mb-8 bg-green-400 rounded-lg">
         <h1 className="text-6xl uppercase track-wider border-8 border-white border-dotted w-2/3 m-auto py-4">John's Pawn Shop</h1>
         <h2 className="text-2xl mt-4">A collection of miscellaenous goods!</h2>
         <div className="mt-4">
            <span className="rounded bg-blue-200 p-2 uppercase tracking-wider">* Free shipping on orders over $199!</span>
         </div>
      </div>
   )
}

export default Navbar
