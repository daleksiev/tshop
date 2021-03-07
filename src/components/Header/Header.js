import { Link } from "react-router-dom";
import './Header.scss';

const Header = () => (
	<header className="header-wrapper">
		<Link to="/" >Home</Link>
		<Link to="/login" >Login</Link>
		<Link to="/register" >Register</Link>
	</header>
)

export default Header;