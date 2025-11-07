import { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Product from '../Product/Product';

const AllProducts = () => {
  const axios = useAxios();
  const [products, setProducts] = useState([]);

  console.log(products);

  useEffect(() => {
    axios.get('/products').then((data) => {
      console.log(data.data);
      setProducts(data.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center my-10">
        All Products {products.length}
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
