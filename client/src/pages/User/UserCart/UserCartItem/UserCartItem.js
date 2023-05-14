import { Link } from 'react-router-dom'

const UserCartItem = ({
    item,
    onClickDecreaseCount,
    onClickIncreaseCount,
    onChange,
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

            <button onClick={onClickDecreaseCount}>-</button>

            <input type="number" value={item?.count} onChange={onChange} min={1} />

            <button onClick={onClickIncreaseCount}>+</button>

            <button onClick={onClickRemoveFromCart}>x</button>
        </article>
    )
}
export default UserCartItem;