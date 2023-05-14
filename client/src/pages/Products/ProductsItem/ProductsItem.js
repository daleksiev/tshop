import { Link } from 'react-router-dom';
import emptyImageSrc from '../../../assets/empty.jpg';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './ProductsItem.scss';

const ProductsItem = ({
    title,
    brand,
    price,
    imageUrl,
    href,
}) => {
    const [didLoad, setDidLoad] = useState(false);

    return (
        <Link to={href} className='product-item'>
            <article>
                <img
                    style={didLoad ? {} : { 'visibility': 'hidden' }}
                    src={imageUrl}
                    alt={title}
                    onLoad={e => setDidLoad(true)}
                    onError={e => e.target.src = emptyImageSrc}
                />

                {!didLoad &&
                    <Spinner animation="border" variant="primary" />
                }

                <h1>{title}</h1>

                <strong>{brand.name}</strong>

                <em>Price ${price}</em>
            </article>
        </Link >
    )
}
export default ProductsItem;