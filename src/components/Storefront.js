import React, { useState, useEffect } from 'react'
import Product from './Product/Product.js';
import axios from 'axios';
import Loader from './loader.gif';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CgArrowUpO } from 'react-icons/cg';

const Storefront = ({ products, cart, handleAddToCart, handleRemoveFromCart, mobileCartOpen, setMobileCartOpen }) => {

   const itemsSubtotal = cart.reduce((accumlatedTotal, currentItem) => accumlatedTotal + currentItem.price * currentItem.qty, 0);
   const taxPrice = itemsSubtotal * 0.13;
   const shippingPrice = itemsSubtotal && itemsSubtotal > 199 ? 0 : 20 ;
   const totalPrice = itemsSubtotal + taxPrice + shippingPrice;

   function closeCart(){
      setMobileCartOpen(false);
      console.log(`the state is currently ${mobileCartOpen}`)
   }

   async function handleCheckout(){
      try {
         if(shippingPrice !== 0){
            const response = await axios.post('https://shopapp-server.herokuapp.com/create-checkout-session', cart);
            window.location = response.data.url;
         } else {
            const response = await axios.post('https://shopapp-server.herokuapp.com/create-checkout-session-free-shipping', cart);
            window.location = response.data.url;
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         { products.length == 0 && <img className="m-auto w-1/2 md:w-1/3 lg:w-1/5" src={Loader} alt="Loading progress" />}
         { products.length !== 0 && 
               <div className="grid grid-cols-8 m-auto max-w-screen-lg p-3 space-x-4">
               {/* ===================== Product Items div ===================== */}
               <div className="col-span-8 md:col-span-5">
                  {/* Product items */}
                  <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-3 max-w-screen-lg m-auto">                 
                     { products && products.map(product => (
                        <Product product={product} key={product.id} handleAddToCart={handleAddToCart} /> 
                     ))}
                  </div>
               </div>
            {/* ===================== Cart Preview div ===================== */}
               <div className="hidden md:block col-start-6 col-span-3">
                  <div className="border-2 border-black bg-gray-100">
                     {/* Cart Preview on Storefront page */}
                     <div className="text-xl font-bold">Cart</div>
                     <div className="border-4 text-xl">
                           { !cart.length && 'You currently have no items in your cart' }
                     </div>
                     {/* individual items in cart */}
                     { cart.map(item => (
                        <div key={item.id} className="p-2 rounded border-b-2 border-black">
                           <div className="uppercase font-semibold ">{item.title}</div>
                           <img src={item.image} style={{height: '50px', width: '50px'}} className="mx-auto my-3" alt={item.description} />
                           <div>
                              <button className="rounded text-2xl px-4 py-1 mx-1 bg-yellow-300" onClick={() => handleAddToCart(item)}>+</button>
                              <button className="rounded text-2xl px-4 py-1 mx-1  bg-yellow-300" onClick={() => handleRemoveFromCart(item)}>-</button>
                           </div>
                           <div>
                              Amount: <span className="font-semibold">{item.qty}</span> x ${item.price.toFixed(2)}
                           </div>
                        </div>
                     ))}
                     {/* Cart Totals Summary*/}
                     {cart.length !== 0 && (
                     <div className="p-2">
                        <div>
                           <div>Items Subotal:</div>
                           <div>${itemsSubtotal.toFixed(2)}</div>
                        </div>
                        <div>
                           <div>Tax Amount:</div>
                           <div>${taxPrice.toFixed(2)}</div>
                        </div>
                        <div>
                           <div>Shipping Price</div>
                           <div>${shippingPrice.toFixed(2)}</div>
                        </div>
                        {/* Price Total and Checkout button */}
                        <div className="text-xl border-black rounded">Total: ${cart.length!== 0 ? totalPrice.toFixed(2) : '0.00'} </div>
                        <button onClick={handleCheckout} className={cart.length !==0 ? "mt-4 text-lg border-2 border-black bg-yellow-300 rounded px-4 py-5" : "mt-4 text-lg border-2 border-black bg-blue-300 rounded px-4 py-5  opacity-20"}>{cart.length !==0 ? 'Go to Checkout' : 'Add items to checkout'}</button>
                     </div>
                     )}
                  </div>
               </div>
            </div>
         }
         {/* ================ Mobile Cart Popout ====================== */}
         <div className={mobileCartOpen ? "bg-blue-100 fixed z-10 w-11/12 top-0 right-0 transform -translate-x-0 h-screen transition ease-in-out duration-500 rounded" : "bg-blue-100 fixed z-10 w-11/12 top-0 right-0 h-screen transform translate-x-full transition ease-in-out duration-500" }>
         {/* Cart Preview on Storefront page */}
            <button className="text-5xl my-2" onClick={closeCart}>
               <AiOutlineCloseCircle />
            </button>
            <div className="text-xl font-bold">Cart</div>
            <div className="border-b-2 text-xl border-black">
                  { !cart.length && 'You currently have no items in your cart' }
            </div>
            {/* individual items in cart */}
            { cart.map(item => (
               <div key={item.id} className="p-2 rounded border-b-2 border-black">
                  <div className="uppercase font-semibold ">{item.title}</div>
                  <img src={item.image} style={{height: '50px', width: '50px'}} className="mx-auto my-3" alt={item.description} />
                  <div>
                     <button className="rounded text-2xl px-4 py-1 mx-1 bg-yellow-300" onClick={() => handleAddToCart(item)}>+</button>
                     <button className="rounded text-2xl px-4 py-1 mx-1  bg-yellow-300" onClick={() => handleRemoveFromCart(item)}>-</button>
                  </div>
                  <div>
                     Amount: <span className="font-semibold">{item.qty}</span> x ${item.price.toFixed(2)}
                  </div>
               </div>
            ))}
            {/* Cart Totals Summary*/}
            {cart.length !== 0 && (
            <div className="p-2">
               <div>
                  <div>Items Subotal:</div>
                  <div>${itemsSubtotal.toFixed(2)}</div>
               </div>
               <div>
                  <div>Tax Amount:</div>
                  <div>${taxPrice.toFixed(2)}</div>
               </div>
               <div>
                  <div>Shipping Price</div>
                  <div>${shippingPrice.toFixed(2)}</div>
               </div>
               {/* Price Total and Checkout button */}
               <div className="text-xl border-black rounded">Total: ${cart.length!== 0 ? totalPrice.toFixed(2) : '0.00'} </div>
               <button onClick={handleCheckout} className={cart.length !==0 ? "mt-4 text-lg border-2 border-black bg-yellow-300 rounded px-4 py-5" : "mt-4 text-lg border-2 border-black bg-blue-300 rounded px-4 py-5  opacity-20"}>{cart.length !==0 ? 'Go to Checkout' : 'Add items to checkout'}</button>
            </div>
            )}
         </div>
         {/* footer */}
         <footer className="flex justify-evenly items-center p-4">
            <div> Copyright 2021 &copy; John's Pawn Shop</div>
            <a href="#" className="text-6xl ">
               <CgArrowUpO /> 
            </a>
         </footer>
      </div>
   )
}

export default Storefront
