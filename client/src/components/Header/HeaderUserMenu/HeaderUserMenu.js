import { Link } from "react-router-dom";
import './HeaderUserMenu.scss';

const HeaderUserMenu = () => (
    <section className="header-user-menu">
        <Link to="/profile">Profile</Link>
    </section>
)

export default HeaderUserMenu;