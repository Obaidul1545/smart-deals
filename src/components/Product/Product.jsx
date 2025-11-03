import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
  console.log(product._id);

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={product.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>

        <p>Max Price: {product.price_max}</p>
        <p>Min Price: {product.price_min}</p>
        <div className="card-actions ">
          <Link
            to={`/productDetails/${product._id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
