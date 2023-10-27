import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
];

NavLink;

const Navlinks = () => {
  const { user } = useSelector((state) => state.userState);

  return (
    <>
      {links.map(({ id, url, text }) => {
        if ((text === 'checkout' || text === 'cart') && !user.username) {
          return null;
        }

        return (
          <li key={id}>
            <NavLink
              to={url}
              className="capitalize flex flex-col mt-4 font-medium md:flex-row md:space-x-10 md:mt-0 "
            >
              {' '}
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default Navlinks;
