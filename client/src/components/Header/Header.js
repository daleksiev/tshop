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
	return (
		<header className="header-wrapper">
			<ModalError />

			<Link to="/" >Home</Link>

			{user.isLoggedIn
				? <Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
				: (
					<>
						<Link to="/login" >Login</Link>

						<Link to="/register" >Register</Link>
					</>
				)
			}

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