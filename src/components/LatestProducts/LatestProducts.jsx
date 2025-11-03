import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <div>
      <h1 className="text-4xl text-center my-10">
        Latest Products {products.length}
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
