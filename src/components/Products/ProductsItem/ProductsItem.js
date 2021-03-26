import { Link } from 'react-router-dom';
import styles from './ProductsItem.module.scss';

const ProductsItem = ({
    name,
    brand,
    price,
    imageUrl,
    href,
}) => (
    <article className={styles['product-item']}>
        <Link to={href}>
            <img
                src={imageUrl}
                alt={name}
            />

            <h1>{name}</h1>

            <strong>{brand}</strong>

            <em>Price ${price}</em>
        </Link>
    </article>
)

export default ProductsItem;