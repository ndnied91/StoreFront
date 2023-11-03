import { toast } from 'react-toastify';
import {
  OrdersList,
  PaginationContainer,
  SectionTitle,
  ComplexPaginationContainer,
} from '../components';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';

export const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user.username) {
      toast.warn('Must log in to view orders');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    // try {
    //   const response = await customFetch.get('/orders', {
    //     params,
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   });

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
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

const Orders = () => {
  const { orders, meta } = useLoaderData();
  console.log(meta);
  if (meta.pagination.total < 1) {
    return <SectionTitle text={'please place an order'} />;
  }

  return (
    <>
      <SectionTitle text={'your orders'} />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
