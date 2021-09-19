import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Storefront from './components/Storefront';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Success from './components/Success';
import Cancel from './components/Cancel';

// Initialize local storage outside a function. Will not work inside!
const savedCart = JSON.parse(localStorage.getItem('cart') || []);

function App() {
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(savedCart);

  const fetchProducts = async () => {
    const products = await axios.get('https://fakestoreapi.com/products');
    setProducts(products.data);
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    fetchProducts();
  }, [cart])  

  function handleAddToCart(product){
    const existingItem = cart.find(item => item.id === product.id);
    if(existingItem){
      setCart(
        cart.map(item => item.id === product.id ? 
          {...item, qty: item.qty + 1}
          : item));
    } else {
      setCart([...cart, {...product, qty: 1 }])
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
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Storefront products={products} cart={cart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/cancel">
            <Cancel />
          </Route>
        </Switch>
      </Router>
      {/* { products.length == 0 && <div className="text-7xl uppercase"> ....Loading</div>}
      { products.length !== 0 && 
        <Storefront products={products} cart={cart} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
      }
       */}
      
    </div>
  );
}

export default App;
