import CartContext from '../../../context/CartContext';
import { useContext } from "react";

const UserCart = () => {
    const [cartContext,] = useContext(CartContext);

    return (
        <div>
            {
                cartContext?.map(x => (
                    <article key={x._id}>
                        <img
                            src={x?.imageUrl}
                            alt={x?.title}
                        />
                        {x?.title}
                        ${x?.price}
                    </article>
                ))
            }
        </div>
    )
}

export default UserCart;