import { Link, useLocation } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { setMessage } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import { getUser } from '../../reducers';
import './Menu.scss';
import { useState } from "react";
import UserMenu from "./UserMenu";

import {
  AppRegistration as RegisterIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AddShoppingCart as CartIcon,
  Category as CategoriesIcon,
  LocalShipping as OrderIcon,
  PostAdd as AddProductIcon,
  BrandingWatermark as BrandIcon,
  Cottage as HomeIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

const Menu = ({
  user,
  logoutUser,
  setMessage,
}) => {
  const location = useLocation()
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const onClickToggleUserMenu = (e) => setToggleUserMenu(!toggleUserMenu);

  const onClickLogoutUser = e => {
    e.preventDefault();
    firebaseService.logout();
    logoutUser();
    setMessage('You logged out successfully!');
  }

  const getCurrentPageClass = (path = '/') => location.pathname === path ? 'active' : ''

  const guestLinks = () => (
    <>
      <Link to="/login" className={getCurrentPageClass('/login')}><LoginIcon />Login</Link>

      <Link to="/register" className={getCurrentPageClass('/register')}> <RegisterIcon /> Register</Link>
    </>
  )

  const adminLinks = () => (
    <>
      <Link to="/products/create" className={getCurrentPageClass('/products/create')} ><AddProductIcon /> Add Product</Link>

      <Link to="/brands" className={getCurrentPageClass('/brands')}><BrandIcon /> Brands</Link>
    </>
  )

  const userLinks = () => (
    <>
      {user?.role === 'admin'
        ? adminLinks()
        : <Link to="/cart" className={getCurrentPageClass('/cart')} ><CartIcon /> Cart</Link>
      }

      <Link to="/orders" className={getCurrentPageClass('/orders')}><OrderIcon /> Orders</Link>

      <Link onClick={onClickLogoutUser} to="/logout"><LogoutIcon /> Logout</Link>
    </>
  )

  return (
    <div className="menu-wrapper">
      <ModalError />

      <ModalSuccess />

      <nav className={user.role}>
        <Link to="/" className={getCurrentPageClass('/')}><HomeIcon /> Home</Link>

        <Link to="/categories" className={getCurrentPageClass('/categories')}><CategoriesIcon />Categories</Link>

        {user.isLoggedIn ? userLinks() : guestLinks()}
      </nav>

      <div className="profile">
        <div onClick={onClickToggleUserMenu}>
          {user.isLoggedIn && <AccountIcon className="account-icon" /> /* <Img src={user.imageUrl} alt={user.email} /> */}

          {toggleUserMenu && <UserMenu user={user} onClickLogoutUser={onClickLogoutUser} />}
        </div>
      </div>

    </div >
  )
}

const mapStateToProps = (state) => ({
  user: getUser(state),
})

const mapDispatchToProps = {
  logoutUser,
  setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
