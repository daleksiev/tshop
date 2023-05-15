import { Link } from "react-router-dom";
import './UserMenu.scss';

const UserMenu = ({
  onClickLogoutUser,
  user,
}) => (
  <section className="header-user-menu">
    <Link to="/profile">Profile</Link>

    {user.role !== 'admin' &&
      <>
        <Link to="/favourites">Favourites</Link>

        <Link to="/cart">Cart</Link>
      </>
    }

    <Link to="/orders">Orders</Link>

    <Link to="/logout" onClick={onClickLogoutUser} >Logout</Link>
  </section>
)

export default UserMenu;
