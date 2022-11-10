import React, { useState } from 'react'
import Product from './Product/Product.js';
import axios from 'axios';
import Loader from '../images/loader.gif';
import checkoutSpinner from '../images/checkout-spinner.gif';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CgArrowUpO } from 'react-icons/cg';
import { FcCheckmark } from 'react-icons/fc';
import { FiChevronRight } from 'react-icons/fi';

const Storefront = ({ products, cart, handleAddToCart, handleRemoveFromCart, incrementCart, mobileCartOpen, setMobileCartOpen, itemAdded }) => {

   const itemsSubtotal = cart.reduce((accumlatedTotal, currentItem) => accumlatedTotal + currentItem.price * currentItem.qty, 0);
   const taxPrice = itemsSubtotal * 0.13;
   const shippingPrice = itemsSubtotal && itemsSubtotal > 199 ? 0 : 20 ;
   const totalPrice = itemsSubtotal + taxPrice + shippingPrice;
   const [checkingOut, setCheckingOut] = useState(false);

   function closeCart(){
      setMobileCartOpen(false);
      console.log(`the state is currently ${mobileCartOpen}`)
   }

   async function handleCheckout(){
      setCheckingOut(true);
      try {
         if(shippingPrice !== 0){
            const response = await axios.post('https://shop-app-server.onrender.com/create-checkout-session', cart);
            window.location = response.data.url;
            // const response = await axios.post('http://localhost:4000/create-checkout-session', cart);
            // window.location = response.data.url;
         } else {
            const response = await axios.post('https://shop-app-server.onrender.com/create-checkout-session-free-shipping', cart);
            window.location = response.data.url;
            // const response = await axios.post('http://localhost:4000/create-checkout-session-free-shipping', cart);
            // window.location = response.data.url;
         }
      } catch (error) {
         console.log(error);
      }
   }

   if(mobileCartOpen){
      document.querySelector('html').style.overflow = 'hidden';
   } else {
      document.querySelector('html').style.overflow = 'scroll';
   }

   return (
      <div>
         { products.length === 0 && <img className="m-auto w-1/2 md:w-1/3 lg:w-1/5" src={Loader} alt="Loading progress" />}
         { products.length !== 0 && 
            // ================================== Entire Storefront Wrapper ==========================================
            <div>
               {/* ================ Product and Items Wrapper ================== */}
               <div className="grid grid-cols-8 m-auto max-w-screen-xl p-3 space-x-4">
                  {/* ===================== Product Items div ===================== */}
                  <div className="col-span-8 md:col-span-6">
                     {/* Product items */}
                     <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-3 max-w-screen-lg m-auto">                 
                        { products && products.map(product => (
                           <Product product={product} key={product.id} handleAddToCart={handleAddToCart} /> 
                        ))}
                     </div>
                  </div>
                  {/* ===================== Cart Preview div ===================== */}
                  <div className="hidden md:block col-span-2">
                     <div className="border-2 border-black bg-gray-50 rounded-lg">
                        {/* Cart Preview on Storefront page */}
                        <div className="text-xl font-bold">Cart</div>
                        <div className="border-t-2 border-blue-100 text-xl">
                              { !cart.length && 'You currently have no items in your cart' }
                        </div>
                        {/* individual items in cart */}
                        { cart.map(item => (
                           <div key={item.id} className="p-2 rounded border-b-2 border-black">
                              <div className="uppercase font-semibold ">{item.title}</div>
                              <img src={item.image} style={{height: '50px', width: '50px'}} className="mx-auto my-3" alt={item.description} />
                              <div>
                                 <button className="rounded text-2xl px-4 py-1 mx-1 bg-yellow-300 hover:bg-yellow-500" onClick={() => incrementCart(item)}>+</button>
                                 <button className="rounded text-2xl px-4 py-1 mx-1  bg-yellow-300 hover:bg-yellow-500" onClick={() => handleRemoveFromCart(item)}>-</button>
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
                           <button onClick={handleCheckout} className="mt-4 text-lg border-2 border-black bg-yellow-300 hover:bg-yellow-500 rounded px-4 py-5">{ !checkingOut ? 'Go to checkout' : <div className="flex"> Checking out... <img src={checkoutSpinner} alt="spinner" style={{ width: '30px', height: '30px'}}/> </div> }</button>
                        </div>
                        )}
                     </div>
                  </div>
               </div>
               {/* footer */}
               <footer className="flex justify-evenly items-center p-4 mb-4">
                  <div> Copyright 2021 &copy; John's Pawn Shop</div>
                  <a href="#" className="text-6xl ">
                     <CgArrowUpO /> 
                  </a>
               </footer>
               {/* Storefront Wrapper end */}
            </div>
         }

         {/* ============================================= Mobile Cart Popout =============================================  */}
         <div className={mobileCartOpen ? "bg-blue-50 fixed z-10 w-11/12 top-0 right-0 transform -translate-x-0 h-screen transition ease-in-out duration-500 rounded overflow-y-auto" : "bg-blue-50 fixed z-10 w-11/12 top-0 right-0 h-screen transform translate-x-full transition ease-in-out duration-500" }>
         {/* Cart Preview on Storefront page */}
            <button className="text-5xl my-2 border-2 border-black rounded-xl block ml-8" onClick={closeCart}>
               <FiChevronRight/>
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
                     <button className="rounded text-2xl px-4 py-1 mx-1 bg-yellow-300" onClick={() => incrementCart(item)}>+</button>
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
               <button onClick={handleCheckout} className="mt-4 text-lg border-2 border-black bg-yellow-300 hover:bg-yellow-500 rounded px-4 py-5">{ !checkingOut ? 'Go to checkout' : <div className="flex"> Checking out... <img src={checkoutSpinner} style={{ width: '30px', height: '30px'}}/> </div> }</button>
            </div>
            )}
         </div>
        
         {/* ================== Cart Item Added Popup Confirmation =================== */}
         <div className={ itemAdded ? "fade-in-fast bg-gray-800 bg-opacity-90 text-white fixed top-0 left-0 z-20 w-full h-screen rounded-lg" : "hidden"}>
            <div className="flex items-center justify-center mt-24 absolute inset-0">
               <FcCheckmark className="text-7xl"/>
               <span className="text-6xl"> Cart Item added</span>   
            </div>
         </div>


      </div>
   )
}

export default Storefront
