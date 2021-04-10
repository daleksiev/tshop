import CartContext from '../../../context/CartContext';
import { useContext } from "react";
import UserCartItem from './UserCartItem/UserCartItem';
import './UserCart.scss';

const UserCart = () => {
    const [cartContext, setCartContext] = useContext(CartContext);

    // onClickMinusSign,
    //     onChange,
    //     onClickPlusSign,

    const onChangeCount = (e) => setCartContext()

    return (
        <div className="cart-container">
            { cartContext?.length
                ? cartContext?.map(x => <UserCartItem key={x._id} item={x} />)
                : 'No products in the cart!'
            }
        </div>
    )
}

export default UserCart;