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

    let total = cartContext.reduce((a, b) => {
        const price = a.price * a.count + b.price * b.count
        return { price, count: 1 };
    }, { price: 0, count: 1 });
    total = total.price.toFixed(2);
    const onChangeCount = (id) => (e) => setCartContext(changeProductCount(id, e.target.value))
    const onClickMinusSign = (id) => () => setCartContext(decreaseProductCount(id));
    const onClickPlusSign = (id) => () => setCartContext(increaseProductCount(id));

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            <span>Total sum : ${cartContext.length ? total : 0.00} </span>

            {/* <button>Order now</button> */}

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