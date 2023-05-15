import { Link, useLocation } from "react-router-dom";
import Img from '../Shared/Img'
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { setMessage } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import { getUser } from '../../reducers';
import { useState } from "react";
import UserMenu from "./UserMenu";
import './Menu.scss';

import Logo from '../../assets/logo.png'

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

  const selectCurrentPage = (path = '/') => location.pathname === path ? 'active' : ''

  const guestLinks = () => (
    <>
      <Link to="/login" className={selectCurrentPage('/login')}><LoginIcon />Login</Link>

      <Link to="/register" className={selectCurrentPage('/register')}> <RegisterIcon /> Register</Link>
    </>
  )

  const adminLinks = () => (
    <>
      <Link to="/products/create" className={selectCurrentPage('/products/create')} ><AddProductIcon /> Add Product</Link>

      <Link to="/brands" className={selectCurrentPage('/brands')}><BrandIcon /> Brands</Link>
    </>
  )

  const userLinks = () => (
    <>
      {user?.role === 'admin' ? adminLinks() : null}

      <Link to="/cart" className={selectCurrentPage('/cart')} ><CartIcon /> Cart</Link>

      <Link to="/orders" className={selectCurrentPage('/orders')}><OrderIcon /> Orders</Link>

      <Link onClick={onClickLogoutUser} to="/logout"><LogoutIcon /> Logout</Link>
    </>
  )

  return (
    <div className="menu-wrapper">
      <ModalError />

      <ModalSuccess />

      <Link to="/" className="logo-wrapper">
        <img className='logo' src={Logo} alt="logo" />
        <h1>T-shop</h1>
      </Link>

      <nav className={user.role}>
        <Link to="/" className={selectCurrentPage('/')}><HomeIcon /> Home</Link>

        <Link to="/categories" className={selectCurrentPage('/categories')}><CategoriesIcon />Categories</Link>

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
