// src/components/Product.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';

function Product() {
  const [product, setProduct] = useState({ name: '', size: '', color: '', quantity: 1 });
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));  // Add product to cart
  };

  return (
    <div>
      <h2>Add a Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Size"
        value={product.size}
        onChange={(e) => setProduct({ ...product, size: e.target.value })}
      />
      <input
        type="text"
        placeholder="Color"
        value={product.color}
        onChange={(e) => setProduct({ ...product, color: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={product.quantity}
        onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
