import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

import { QueryClient } from '@tanstack/react-query';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch.get(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    //get url to get the ID off of the params
    // make api call to get single item

    // const response = await customFetch(`/products/${params.id}`);
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    //return item and use it in SingleProduct component
    return { product: response.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  console.log(amount);

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const cartProduct = {
    // constructs the already existing item into the cartProduct, this then gets passed as 'product'
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />

        <div>
          <h1 className="capitalize text-3xl font-bold"> {title} </h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>

            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>

          <div>
            <select
              className="select select-secondary select-bordered select-md"
              onChange={handleAmount}
              value={parseInt(amount)}
            >
              {generateAmountOptions(3)}
            </select>
          </div>
          <div className="mt-6 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => addToCart()}
            >
              {' '}
              Add to bag{' '}
            </button>
          </div>
        </div>
        {/* end of desc */}
      </div>
    </section>
  );
};

export default SingleProduct;
