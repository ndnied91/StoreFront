import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { store } from '../store';
import { customFetch, formatPrice } from '../utils';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    console.log(name, address);
    // console.log(data);

    const user = store.getState().userState.user;

    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name: name,
      address: address,
      chargeTotal: orderTotal,
      cartItems,
      orderTotal: formatPrice(orderTotal),
      numItemsInCart: numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(response);
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('Order placed succesfully!');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/login');

      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <div>
      <Form method="POST" className="flex flex-col gap-y-4">
        <h4 className="font-medium txt-xl"> Shipping Info</h4>

        <FormInput
          label={'First name'}
          name={'name'}
          type={'text'}
          defaultValue={'James'}
        />
        <FormInput
          label={'address'}
          name={'address'}
          type={'text'}
          defaultValue={'123 Main St'}
        />

        <div className="mt-4">
          <SubmitBtn text="place your order" />
        </div>
      </Form>
    </div>
  );
};

export default CheckoutForm;
