import { useLoaderData } from 'react-router';
import {
  FeaturedProducts,
  Filters,
  ProductsContainer,
  PaginationContainer,
} from '../components';
import { customFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';

const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    // const response = await customFetch(url, { params });

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    return { products: response.data.data, meta: response.data.meta, params };

    // return null;
  };

const Products = () => {
  // const data = useLoaderData();
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
