import useAuth from '../../Hooks/useAuth';
import LatestProducts from '../LatestProducts/LatestProducts';

const latestProductsPromise = fetch(
  'http://localhost:3000/latest-products'
).then((res) => res.json());

const Home = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div className="container mx-auto">
      <LatestProducts
        latestProductsPromise={latestProductsPromise}
      ></LatestProducts>
    </div>
  );
};

export default Home;
