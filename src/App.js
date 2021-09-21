import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Storefront from './components/Storefront';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Success from './components/Success';
import Cancel from './components/Cancel';

// Initialize local storage outside a function. Will not work inside!
// parse an empty array if there is no local storage to not return undefined which gives an error
const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

function App() {
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(savedCart);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  const fetchProducts = async () => {
    const products = await axios.get('https://fakestoreapi.com/products');
    setProducts(products.data);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    fetchProducts();
  }, [cart])  

  function toggleCartOpen(){
    setMobileCartOpen(prevMobileCartOpen => !prevMobileCartOpen);
    // console.log(`the current state of the cart is ${mobileCartOpen}`);
  }

  function handleAddToCart(product){
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem){
      setCart(
        cart.map(item => item.id === product.id ? 
          {...item, qty: item.qty + 1} : item));
      setItemAdded(true);
      setTimeout(() => {
        setItemAdded(false);
      }, 1200);
    } else {
      setCart([...cart, {...product, qty: 1 }]);
      setItemAdded(true);
      setTimeout(() => {
        setItemAdded(false);
      }, 1200);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function incrementCart(product){
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem){
      setCart(
        cart.map(item => item.id === product.id ? 
          {...item, qty: item.qty + 1}
          : item));
    } else {
      setCart([...cart, {...product, qty: 1 }]);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function handleRemoveFromCart(product){
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem.qty === 1){
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item => item.id === product.id ? {...item, qty: item.qty - 1}: item))
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return (
    <div className="App">
      <Navbar toggleCartOpen={toggleCartOpen}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Storefront products={products} cart={cart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} mobileCartOpen={mobileCartOpen} setMobileCartOpen={setMobileCartOpen} itemAdded={itemAdded} incrementCart={incrementCart} />
          </Route>
          <Route exact path="/success">
            <Success setCart={setCart} />
          </Route>
          <Route exact path="/cancel">
            <Cancel />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
