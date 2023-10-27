import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Loading } from '../components';

const HomeLayout = () => {
  const { state } = useNavigation();

  return (
    <>
      <Header />
      <Navbar />

      {state === 'loading' ? (
        <Loading />
      ) : (
        <section className="align-element ph-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
