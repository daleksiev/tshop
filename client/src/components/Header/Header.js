import { Link } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import firebaseService from '../../services/firebaseService';
import './Header.scss';

const Header = ({
	user,
	logoutUser,
}) => {
	const onClickLogoutUser = e => {
		e.preventDefault();
		firebaseService.logout();
		logoutUser();
	}

	const guestLinks = () => (
		<>
			<Link to="/login" >Login</Link>

			<Link to="/register" >Register</Link>
		</>
	)

	const loggedInLinks = () => (
		<>
			<Link to="/create" >Create</Link>

			<Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>

			<Link className="profile" to="/user">{user.email}</Link>
		</>
	)

	return (
		<header className="header-wrapper">
			<ModalError />

			<nav>
				<Link to="/" >Home</Link>

				{user.isLoggedIn
					? loggedInLinks()
					: guestLinks()
				}
			</nav>
		</header>
	)
}

const mapStateToProps = (state) => ({
	user: state.user
})

const mapDispatchToProps = {
	logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);