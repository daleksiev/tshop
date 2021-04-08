import { Link } from 'react-router-dom';
import './BrandsItem.scss';

const BrandsItem = ({
    brand,
}) => (
    <article className='brands-item-container'>
        <Link to="" >
            <img src={brand.imageUrl} alt={brand.name} />
            <p>{brand.name}</p>
        </Link>
    </article>
)

export default BrandsItem;