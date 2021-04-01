import { Link } from 'react-router-dom';
// import styles from './CategoriesItem.module.scss';

const CategoriesItem = ({
    _id,
    name,
    imageUrl,
}) => (
    <Link to={`/categories/${_id}/products`}>
        <img src={imageUrl} alt="" />
        <h2>{name}</h2>
    </Link>
)

export default CategoriesItem;