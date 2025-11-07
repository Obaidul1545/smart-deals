import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateAProduct = () => {
  const axiosSecure = useAxiosSecure();

  const handleAddProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.imageURL.value;
    const price_max = e.target.max_price.value;
    const price_min = e.target.min_price.value;
    const newProduct = { title, image, price_max, price_min };

    // axios.post('http://localhost:3000/products', newProduct).then((data) => {
    //   console.log(data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: 'Your Product has been created',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });

    axiosSecure.post('products', newProduct).then((data) => {
      if (data.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Product has been created',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-medium">Add a new Product</h1>
      <form onSubmit={handleAddProduct}>
        <fieldset className="fieldset">
          <label className="label">Title</label>
          <input
            type="text"
            className="input"
            placeholder="Product title"
            name="title"
          />
          <label className="label">Image</label>
          <input
            type="text"
            className="input"
            placeholder="Image URL"
            name="imageURL"
          />
          <label className="label">Max Price</label>
          <input
            type="text"
            className="input"
            placeholder="Max Price"
            name="max_price"
          />
          <label className="label">Min Price</label>
          <input
            type="text"
            className="input"
            placeholder="Min Price"
            name="min_price"
          />

          <button className="btn btn-primary mt-4">Add Product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
