import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/list.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="category-section">
        <h1>Categories</h1>
        <ul>
          {categories.map(category => (
            <li key={category.id} className="category-box">
              <div>ID: {category.id}</div>
              <div>Ürün Adı: {category.name}</div>
              <div>Stok Adedi: {category.number_of_product}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="product-section">
        <h1>Products</h1>
        <ul>
          {products.map(product => (
            <li key={product.id} className="product-box">
              <div>ID: {product.id}</div>
              <div>Ürün Adı: {product.name}</div>
              <div>DPI: {product.dpi}</div>
              <div>Tarayıcısı: {product.scanner}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
