import { Link } from "react-router-dom";
import ModalError from "../Modal/ModalError";
import './Header.scss';

const Header = () => (
	<header className="header-wrapper">
		<ModalError />
		<Link to="/" >Home</Link>
		<Link to="/login" >Login</Link>
		<Link to="/register" >Register</Link>
	</header>
)

export default Header;