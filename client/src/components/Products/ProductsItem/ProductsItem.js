import { Link } from 'react-router-dom';
import styles from './ProductsItem.module.scss';

const ProductsItem = ({
    title,
    brand,
    price,
    imageUrl,
    href,
}) => (
    <Link to={href} className={styles['product-item']}>
        <article>

            <img
                src={imageUrl}
                alt={title}
            />

            <h1>{title}</h1>

            <strong>{brand}</strong>

            <em>Price ${price}</em>
        </article>
    </Link >
)

export default ProductsItem;