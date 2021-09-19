import React from 'react'

const Product = ({ product, handleAddToCart }) => {

   function expandEllipsis(){
   }

   return (
      <div className="border-2 border-black p-4 rounded-lg">
         <span className="uppercase tracking-wide text-xl">{product.title}</span>
         <img className="m-auto my-4" src={product.image} alt={product.title} style={{height: '150px', width: '150px'}} />  
         <p className="text-xl p-2"><span className="font-semibold">Price:</span> ${product.price}</p>
         <p className="text-left">{product.description}</p>
         <button className="rounded-md bg-yellow-300 text-xl p-2 my-2" onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
   )
}

export default Product;
