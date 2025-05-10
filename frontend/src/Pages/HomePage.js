import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from '../Components/CategoryCard';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/categories');
        setCategories(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch categories. Make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return(
  <p className="loading">Loading categories...</p>);
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <header className="app-header">
        <h1>Welcome to Tech Product Market</h1>
        <p className="subtitle">Explore our curated list of tech products</p>
      </header>
      {categories.length === 0 && !loading && <p>No categories found.</p>}
      <div className="cards-grid">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
