import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import emptyImageSrc from '../../../assets/empty.jpg';
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

            <Image
                src={emptyImageSrc}
                alt={title}
                rounded
                onLoad={e => e.target.src = imageUrl}
                onError={e => e.target.src = imageUrl}
            />

            <h1>{title}</h1>

            <strong>{brand}</strong>

            <em>Price ${price}</em>
        </article>
    </Link >
)

export default ProductsItem;