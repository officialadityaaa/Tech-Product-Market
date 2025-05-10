
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="card-link">
      <div className="card">
        <img src={category.imageUrl} alt={category.name} />
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
