// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import HealthBeauty from './pages/HealthBeauty';
import Help from './pages/Help';
import Home from './pages/Home';
import KidsBabies from './pages/KidsBabies';
import Login from './pages/Login';
import Shoes from './pages/Shoes';
import Watches from './pages/Watches';
import OrderForm from './components/OrderForm';
import Product from './components/Product';
import Electronics from './pages/Electronics';
import Clothing from './pages/Clothing';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/Clothing" element={<Clothing />} />
          <Route path="/products/Electronics" element={<Electronics/>} />
          <Route path="/products/shoes" element={<Shoes />} />
          <Route path="/products/watches" element={<Watches />} />
          <Route path="/products/kids-babies" element={<KidsBabies />} />
          <Route path="/products/health-beauty" element={<HealthBeauty />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/order" component={OrderForm} /> This line connects the OrderForm */}
          <Route path="/products/:id" element={<Product />} /> {/* Example product detail route */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

