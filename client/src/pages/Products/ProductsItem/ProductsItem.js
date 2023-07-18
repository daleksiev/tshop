import { Link } from 'react-router-dom';
import emptyImageSrc from '../../../assets/empty.jpg';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import CardLink from '../../../components/Shared/CardLink'
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
    <CardLink to={href} className='product-item'>
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

      <h4>{title}</h4>

      <em>Price ${price}</em>
    </CardLink>
  )
}
export default ProductsItem;
