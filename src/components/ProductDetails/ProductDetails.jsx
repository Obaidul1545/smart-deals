import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const product = useLoaderData();
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [bids, setBids] = useState();

  const handleModal = () => {
    modalRef.current.showModal();
  };
  const axiosSecure = useAxiosSecure();

  const handleBids = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const productId = product._id;

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: 'pending',
    };

    axiosSecure
      .post('/bids', newBid)
      .then((data) => {
        if (data.data.insertedId) {
          modalRef.current.close();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your bid has been placed',
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      })
      .catch((error) => console.log(error));

    // fetch('http://localhost:3000/bids', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   body: JSON.stringify(newBid),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.insertedId) {
    //       modalRef.current.close();
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Your bid has been placed',
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //       newBid._id = data.insertedId;
    //       const newBids = [...bids, newBid];
    //       newBids.sort((a, b) => b.bid_price - a.bid_price);
    //       setBids(newBids);
    //     }
    //   })
    //   .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${product._id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [product._id, user]);

  return (
    <>
      {/* product info  */}
      <div className="card lg:card-side bg-base-100 my-10 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <button onClick={() => navigate(-1)} className="btn justify-start">
            Back
          </button>
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button onClick={handleModal} className="btn btn-primary">
              I want Buy This Product
            </button>

            <dialog
              ref={modalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Give Seller Your Offered Price!
                </h3>
                <form onSubmit={handleBids}>
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      className="input"
                      name="name"
                      defaultValue={user.displayName}
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input"
                      name="email"
                      defaultValue={user.email}
                    />
                    <label className="label">Bid</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="your bid"
                      name="bid"
                    />

                    <button className="btn  mt-4">Submit Bids</button>
                  </fieldset>
                </form>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>

      {/* bids for this product */}
      <div className="my-10">
        <h2 className="text-3xl">Bids for this products {bids?.length}</h2>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids?.map((bid, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid.buyer_email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
