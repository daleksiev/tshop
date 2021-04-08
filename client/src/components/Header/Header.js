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
		setMessage('You logout successfully!');
	}

	const guestLinks = () => (
		<>
			<Link to="/login" >Login</Link>

			<Link to="/register" >Register</Link>
		</>
	)

	const adminLinks = () => (
		<>
			<Link to="/products/create" >Create Product</Link>

			<Link to="/brands" >Brands</Link>
		</>
	)

	const userLinks = () => (
		<>
			{user?.role === 'admin' && adminLinks()}

			<Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
		</>
	)

	return (
		<header className="header-wrapper">
			<ModalError />

			<ModalSuccess />

			<nav className={user.role}>
				<Link to="/categories" >Categories</Link>

				{user.isLoggedIn ? userLinks() : guestLinks()}
			</nav>

			<div className="header-toggle-user-menu">
				<div onClick={onClickToggleUserMenu}>
					{user.isLoggedIn && <Img src={user.imageUrl} alt={user.email} />}

					{toggleUserMenu && <HeaderUserMenu />}
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