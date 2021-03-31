import { Link } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { setMessage } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import { getUser } from '../../reducers';
import './Header.scss';

const Header = ({
	user,
	logoutUser,
	setMessage,
}) => {
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

	const loggedInLinks = () => (
		<>
			<Link to="/products/create" >Create</Link>

			<Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
		</>
	)

	return (
		<header className="header-wrapper">
			<ModalError />
			<ModalSuccess />

			<nav>
				<Link to="/" >Home</Link>

				{user.isLoggedIn
					? loggedInLinks()
					: guestLinks()
				}
			</nav>

			<Link className="profile" to="/profile">{user.email}</Link>
		</header>
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