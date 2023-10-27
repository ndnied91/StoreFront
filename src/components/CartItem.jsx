import { useDispatch } from 'react-redux';
import { editItem, removeItem } from '../features/cart/cartSlice';
import { formatPrice, generateAmountOptions } from '../utils';

const CartItem = ({
  title,
  cartID,
  price,
  image,
  amount,
  company,
  productColor,
}) => {
  const dispatch = useDispatch();

  const removeItemFromTheCart = (cartID) => {
    dispatch(removeItem({ cartID }));
  };

  const handleAmount = (cartID, amount) => {
    dispatch(editItem({ cartID, amount }));
  };

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      <img
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32"
        src={image}
        alt={title}
      />
      {/* IMAGE */}

      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>

        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          {' '}
          Color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>

      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={(e) => handleAmount(cartID, e.target.value)}
          >
            {generateAmountOptions(amount)}
          </select>
        </div>
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={() => removeItemFromTheCart(cartID)}
        >
          Remove
        </button>
      </div>

      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
