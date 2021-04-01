import { Link } from 'react-router-dom';
// import styles from './CategoriesItem.module.scss';

const CategoriesItem = ({
    _id,
    name,
    imageUrl,
}) => (
    <Link to={`/categories/${_id}`}>
        <img src={imageUrl} alt="" />
        <h3>{name}</h3>
    </Link>
)

export default CategoriesItem;