import { Link } from "react-router-dom";
import './Header.scss';

const Header = () => (
	<header className="header-wrapper">
		<div className="header-container">
			<Link to="/" >Home</Link>
			<Link to="/login" >Login</Link>
			<Link to="/register" >Register</Link>
		</div>
	</header>
)

export default Header;