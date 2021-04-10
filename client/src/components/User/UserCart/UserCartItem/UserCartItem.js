import { Link } from 'react-router-dom'

const UserCartItem = ({
    item,
    onClickMinusSign,
    onChange,
    onClickPlusSign,
    onClickRemoveFromCart,
}) => {
    return (
        <article>
            <Link to={`/products/${item?._id}`}>
                <img
                    src={item?.imageUrl}
                    alt={item?.title}
                />

                <span>
                    {item?.title}
                </span>

                <span>
                    ${item?.price}
                </span>

            </Link>

            <button onClick={onClickMinusSign}>-</button>

            <input type="number" value={item?.count} onChange={onChange} min={1} />

            <button onClick={onClickPlusSign}>+</button>

            <button onClick={onClickRemoveFromCart}>x</button>
        </article>
    )
}
export default UserCartItem;