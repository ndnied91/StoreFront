import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { numItemsInCart } = useSelector((store) => store.cartState);
  const { user } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  if (numItemsInCart < 1) {
    return (
      <div className="text-center">
        <SectionTitle text={'Your cart is empty'} />
      </div>
    );
  }

  return (
    <>
      <SectionTitle text={'Shopping Cart'} />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* main 12 grid layout */}
        <div className="lg:col-span-8">
          {/* taking up 8 grid spots */}
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          {/* taking up 4 grid spots */}
          <CartTotals />
          <button
            className="btn btn-primary btn-block mt-8"
            onClick={() => dispatch(clearCart())}
          >
            {' '}
            Clear Cart{' '}
          </button>
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please login{' '}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
