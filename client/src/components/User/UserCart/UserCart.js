import CartContext from '../../../context/CartContext';
import { useContext } from "react";
import UserCartItem from './UserCartItem/UserCartItem';
import { connect } from 'react-redux';
import { getUser } from '../../../reducers';
import { createOrderAsync } from '../../../actions/ordersActions';
import { setMessage, setError } from '../../../actions/messageActions';
import {
    changeProductCount,
    decreaseProductCount,
    increaseProductCount,
    removeFromCart,
} from '../../../actions/cartActions';
import './UserCart.scss';

const UserCart = ({
    createOrderAsync,
    user,
    setMessage,
    setError,
}) => {
    const [cartContext, setCartContext] = useContext(CartContext);

    let total = cartContext.reduce((a, b) => ({ price: a.price * a.count + b.price * b.count, count: 1 }), { price: 0, count: 1 });
    total = total.price.toFixed(2);

    const onChangeCount = (id) => (e) => setCartContext(changeProductCount(id, e.target.value));
    const onClickDecreaseCount = (id) => () => setCartContext(decreaseProductCount(id));
    const onClickIncreaseCount = (id) => () => setCartContext(increaseProductCount(id));
    const onClickRemoveFromCart = (id) => () => setCartContext(removeFromCart(id));
    const onClickMakeAnOrder = () => {
        createOrderAsync({ products: cartContext, price: total }, user.accessToken)
            .then(() => {
                setMessage('You made an order successfully!');
            })
            .catch(err => setError(err.message));
    }

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            { cartContext?.length
                ? (
                    <>
                        <section>
                            <p>Total price : ${total} </p>

                            <button onClick={onClickMakeAnOrder}>Order now</button>
                        </section>

                        {cartContext?.map(x => (
                            <UserCartItem
                                key={x?._id}
                                item={x}
                                onChange={onChangeCount(x?._id)}
                                onClickDecreaseCount={onClickDecreaseCount(x?._id)}
                                onClickIncreaseCount={onClickIncreaseCount(x?._id)}
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

const mapStateToProps = (state) => ({
    user: getUser(state),
});

const mapDispatchToProps = {
    createOrderAsync,
    setMessage,
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCart);