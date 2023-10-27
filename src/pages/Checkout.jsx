import { useSelector } from 'react-redux';

import { CheckoutForm, CartTotals, SectionTitle } from '../components';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user.username) {
    toast.error('Must log in to go to checkout');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  // const { cartTotal } = useSelector((state) => state.cartState);
  const cartItems = useSelector((state) => state.cartState.cartItems);
  // console.log(cartItems.length);

  if (cartItems.length === 0) {
    return (
      <div>
        <SectionTitle text={'Your cart is empty'} />
      </div>
    );
  } else {
    return (
      <div className="">
        <SectionTitle text={'Place your order'} />

        <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
          <CheckoutForm />

          <CartTotals />
        </div>
      </div>
    );
  }
};

export default Checkout;
