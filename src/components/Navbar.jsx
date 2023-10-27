import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import Navlinks from './Navlinks';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const { theme } = useSelector((state) => state.userState);
  const { numItemsInCart } = useSelector((store) => store.cartState);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-base-200 mb-20">
      <div className="navbar">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden sm:flex btn btn-primary text-3xl items-center "
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost sm:hidden">
              <FaBars className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-[1] shadow bg-base-200 rounded-box p-0 w-[calc(100vw-2.5vw)]"
            >
              <Navlinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden sm:flex">
          <ul className="menu menu-horizontal ">
            <Navlinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}

          <label className="swap swap-rotate ">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={theme === 'winter' ? true : false}
              onChange={handleTheme}
            />

            {/* sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />

            {/* moon icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
        </div>

        {/* CART LINK*/}
        <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
          <div className="indicator">
            <BsCart3 className="h-6 w-6" />
            <span className="badge badge-sm badge-primary indicator-item">
              {numItemsInCart}
            </span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
