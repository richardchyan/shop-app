import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Success = ({ setCart }) => {

   useEffect(() => {

      localStorage.clear();
      setCart([]);

   }, []);

   return (
      <div>
         <h1 className="text-5xl">
            Thank you for your order!
         </h1>
         <button className="rounded text-2xl mt-8 bg-blue-100 p-4">
            <Link to="/"> Click here to make another order</Link>
         </button>
      </div>
   )
}

export default Success
