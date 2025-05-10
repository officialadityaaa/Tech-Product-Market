
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card product-card">
      <img src={product.iconUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <a href={product.buyLink} target="_blank" rel="noopener noreferrer" className="buy-button">
        Buy Now
      </a>
    </div>
  );
};

export default ProductCard;