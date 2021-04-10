import CartContext from '../../../context/CartContext';
import { useContext } from "react";
import UserCartItem from './UserCartItem/UserCartItem';
import {
    changeProductCount,
    decreaseProductCount,
    increaseProductCount,
    removeFromCart,
} from '../../../actions/cartActions'
import './UserCart.scss';

const UserCart = () => {
    const [cartContext, setCartContext] = useContext(CartContext);

    let total = cartContext.reduce((a, b) => ({ price: a.price * a.count + b.price * b.count, count: 1 }), { price: 0, count: 1 });
    total = total.price.toFixed(2);

    const onChangeCount = (id) => (e) => setCartContext(changeProductCount(id, e.target.value))
    const onClickMinusSign = (id) => () => setCartContext(decreaseProductCount(id));
    const onClickPlusSign = (id) => () => setCartContext(increaseProductCount(id));
    const onClickRemoveFromCart = (id) => () => setCartContext(removeFromCart(id));

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            { cartContext?.length
                ? (
                    <>
                        <section>
                            <p>Total price : ${total} </p>

                            <button>Order now</button>
                        </section>
                        {cartContext?.map(x => (
                            <UserCartItem
                                key={x?._id}
                                item={x}
                                onChange={onChangeCount(x?._id)}
                                onClickMinusSign={onClickMinusSign(x?._id)}
                                onClickPlusSign={onClickPlusSign(x?._id)}
                                onClickRemoveFromCart={onClickRemoveFromCart(x?._id)}
                            />
                        ))}
                    </>
                )
                : <p>No products found in the cart!</p>
            }
        </div>
    )
}

export default UserCart;