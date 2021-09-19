import React from 'react'
import { Link } from 'react-router-dom';

const Cancel = () => {
   return (
      <div>
          <h1 className="text-5xl">
            There was a problem with completing your order.
         </h1>
         <button className="rounded text-2xl mt-8 bg-blue-100 p-4">
            <Link to="/"> Click here to try again!</Link>
         </button>
      </div>
   )
}

export default Cancel
