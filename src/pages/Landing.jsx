import { QueryClient } from '@tanstack/react-query';
import { FeaturedProducts, ReviewsCarousel } from '../components';
import Hero from '../components/Hero';
import { customFetch } from '../utils';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch('/products?featured=true'),
};

export const loader = (queryClient) => async () => {
  const { data } = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = data.data;
  return { products };
};

const Landing = () => {
  return (
    <div>
      <Hero />
      <ReviewsCarousel />
      <FeaturedProducts />
    </div>
  );
};

export default Landing;
