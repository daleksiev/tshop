import { Link } from "react-router-dom";
import './HeaderUserMenu.scss';

const HeaderUserMenu = ({
    onClickLogoutUser,
}) => (
    <section className="header-user-menu">
        <Link to="/profile">Profile</Link>

        <Link to="/favourites">Favourites</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/orders">Orders</Link>

        <Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
    </section>
)

export default HeaderUserMenu;