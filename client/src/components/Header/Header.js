import { Link } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { setMessage } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import { getUser } from '../../reducers';
import Img from "../Shared/Img/Img";
import './Header.scss';
import { useState } from "react";
import HeaderUserMenu from "./HeaderUserMenu/HeaderUserMenu";
import {
  FormOutlined as RegisterIcon,
  LoginOutlined as LoginIcon,
  LogoutOutlined as LogoutIcon,
  ShoppingCartOutlined as CartIcon,
  ApartmentOutlined as CategoriesIcon,
  DeliveredProcedureOutlined as OrderIcon,
  PlusCircleOutlined as AddProductIcon,
  FireOutlined as BrandIcon
} from '@ant-design/icons'
const Header = ({
  user,
  logoutUser,
  setMessage,
}) => {
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const onClickToggleUserMenu = (e) => setToggleUserMenu(!toggleUserMenu);

  const onClickLogoutUser = e => {
    e.preventDefault();
    firebaseService.logout();
    logoutUser();
    setMessage('You logged out successfully!');
  }

  const guestLinks = () => (
    <>
      <Link to="/login" ><LoginIcon />Login</Link>

      <Link to="/register" > <RegisterIcon /> Register</Link>
    </>
  )

  const adminLinks = () => (
    <>
      <Link to="/products/create" ><AddProductIcon /> Create Product</Link>

      <Link to="/brands" ><BrandIcon /> Brands</Link>
    </>
  )

  const userLinks = () => (
    <>
      {user?.role === 'admin'
        ? adminLinks()
        : <Link to="/cart" ><CartIcon /> Cart</Link>
      }

      <Link to="/orders"><OrderIcon /> Orders</Link>

      <Link onClick={onClickLogoutUser} to="/logout"><LogoutIcon /> Logout</Link>
    </>
  )

  return (
    <header className="header-wrapper">
      <ModalError />

      <ModalSuccess />

      <nav className={user.role}>
        <Link to="/categories" ><CategoriesIcon />Categories</Link>

        {user.isLoggedIn ? userLinks() : guestLinks()}
      </nav>

      <div className="header-toggle-user-menu">
        <div onClick={onClickToggleUserMenu}>
          {user.isLoggedIn && <Img src={user.imageUrl} alt={user.email} />}

          {toggleUserMenu && <HeaderUserMenu user={user} onClickLogoutUser={onClickLogoutUser} />}
        </div>
      </div>

    </header >
  )
}

const mapStateToProps = (state) => ({
  user: getUser(state),
})

const mapDispatchToProps = {
  logoutUser,
  setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
