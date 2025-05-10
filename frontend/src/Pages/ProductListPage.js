// frontend/src/pages/ProductListPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';

const ProductListPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productResponse = await axios.get(`http://localhost:5001/api/products/${categoryId}`);
        setProducts(productResponse.data);

        const categoriesResponse = await axios.get('http://localhost:5001/api/categories');
        const currentCategory = categoriesResponse.data.find(cat => cat.id === categoryId);
        setCategoryName(currentCategory ? currentCategory.name : categoryId.toUpperCase());

        setError('');
      } catch (err) {
        setError(`Failed to fetch products for ${categoryId}.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <Link to="/" className="back-button">← Back to Categories</Link>
      <h2>{categoryName}</h2>
      {products.length === 0 && !loading && <p>No products found in this category.</p>}
      <div className="cards-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
