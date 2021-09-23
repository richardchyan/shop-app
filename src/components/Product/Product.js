import React from 'react'

const Product = ({ product, handleAddToCart }) => {

   return (
      <div className="border-2 border-black p-4 rounded-lg flex flex-col">
         <div>
            <span className="text-lg uppercase font-semibold">{product.title}</span>
            <img className="m-auto my-4" src={product.image} alt={product.title} style={{height: '150px', width: '175px'}} />  
         </div>
         <div>
            <p className="text-xl p-2"><span className="font-semibold">Price:</span> ${product.price}</p>
            <p className="text-left m-auto break-words">{product.description}</p>
         </div>
         <button className="rounded-md bg-yellow-300 hover:bg-yellow-500 text-xl p-2 my-2 w-3/4 m-auto" onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
   )
}

export default Product;
