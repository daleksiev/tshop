import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
// import styles from './CategoriesItem.module.scss';

const CategoriesItem = ({
    _id,
    name,
    imageUrl,
}) => {
    const [didLoad, setDidLoad] = useState(false);

    const onLoad = (e) => setDidLoad(true);

    return (
        <Link
            to={`/categories/${_id}`}
        >
            <Spinner
                style={didLoad ? { 'display': 'none' } : {}}
                animation="border"
                variant="primary"
            />

            <img
                style={didLoad ? {} : { 'visibility': 'hidden' }}
                src={imageUrl}
                alt=""
                onLoad={onLoad}
            />
            <h3>{name}</h3>
        </Link>
    )
}

export default CategoriesItem;