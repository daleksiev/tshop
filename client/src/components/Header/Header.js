import { Link } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { setMessage } from '../../actions/messageActions';
import firebaseService from '../../services/firebaseService';
import { getUser } from '../../reducers';
import { Spinner } from 'react-bootstrap';
import './Header.scss';
import { useState } from "react";

const Header = ({
	user,
	logoutUser,
	setMessage,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);

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
			<Link to="/products/create" >Create Product</Link>

			<Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
		</>
	)

	return (
		<header className="header-wrapper">
			<ModalError />

			<ModalSuccess />

			<nav>
				<Link to="/categories" >Categories</Link>

				{user.isLoggedIn
					? loggedInLinks()
					: guestLinks()
				}
			</nav>

			<div>
				{user.email &&
					<Link to="/profile">
						<img
							src={user.imageUrl}
							alt={user.image}
							onLoad={() => setIsLoaded(true)}
							style={!isLoaded ? { display: 'none' } : {}}
							onError={(e) => {
								setIsLoaded(true);
								e.target.src = "https://firebasestorage.googleapis.com/v0/b/t-shop-e1948.appspot.com/o/users%2Funnamed.png?alt=media&token=6adb23b1-b1bc-41ae-9c03-10a38b086a9b"
							}}
						/>

						<Spinner style={isLoaded ? { display: 'none' } : {}} animation="border" variant="primary" />
					</Link>
				}
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