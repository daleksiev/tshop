import CartContext from '../../../context/CartContext';
import { useContext } from "react";
import UserCartItem from './UserCartItem/UserCartItem';
import {
    changeProductCount,
    decreaseProductCount,
    increaseProductCount,
} from '../../../actions/cartActions'
import './UserCart.scss';

const UserCart = () => {
    const [cartContext, setCartContext] = useContext(CartContext);

    // onClickMinusSign,
    //     onChange,
    //     onClickPlusSign,

    const onChangeCount = (id) => (e) => setCartContext(changeProductCount(id, e.target.value))
    const onClickMinusSign = (id) => () => setCartContext(decreaseProductCount(id));
    const onClickPlusSign = (id) => () => setCartContext(increaseProductCount(id));

    return (
        <div className="cart-container">
            { cartContext?.length
                ? cartContext?.map(x => (
                    <UserCartItem
                        key={x?._id}
                        item={x}
                        onChange={onChangeCount(x?._id)}
                        onClickMinusSign={onClickMinusSign(x._id)}
                        onClickPlusSign={onClickPlusSign(x._id)}
                    />
                ))
                : 'No products found in the cart!'
            }
        </div>
    )
}

export default UserCart;