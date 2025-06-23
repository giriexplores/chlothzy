import React, { useState } from 'react';
import { navItems } from '@/data/constants.js';
import logo from '@/assets/logo.png';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/lib/redux/authSlice.js';
import { logoutUser } from '@/services/auth.service';
import { clearCart } from '@/lib/redux/cartSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { count: cartCount } = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      dispatch(logout());
      dispatch(clearCart());
      navigate('/');
      setIsDropdownOpen(false);
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-24" />
        </Link>
      </div>
      <nav className="hidden space-x-4 md:flex">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-gray-900 ${isActive ? 'font-bold underline' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <Search className="cursor-pointer text-gray-700 hover:text-gray-900" />
        {!isAuthenticated ? (
          <Link to="/login" className="mouse-pointer">
            <User className="cursor-pointer text-gray-700 hover:text-gray-900" />
          </Link>
        ) : (
          <div className="relative z-10">
            <img
              src={user?.image}
              alt="me"
              className="h-8 w-8 cursor-pointer rounded-full object-cover"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-md">
                <button
                  onClick={toggleDropdown}
                  className="flex w-full justify-between self-end rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Close <X className="mr-2 inline" />
                </button>
                <Link
                  to="/me"
                  className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}{' '}
        <Link to="/cart" className="relative">
          <ShoppingCart className="cursor-pointer text-gray-700 hover:text-gray-900" />
          <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
            {cartCount}
          </span>
        </Link>
        <Menu
          className="cursor-pointer text-gray-700 hover:text-gray-900 md:hidden"
          onClick={toggleMenu}
        />
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 right-0 z-10 h-full w-64 bg-white p-4 shadow-lg">
          <X
            className="mb-4 cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={toggleMenu}
          />
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-gray-900 ${isActive ? 'font-bold underline' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
