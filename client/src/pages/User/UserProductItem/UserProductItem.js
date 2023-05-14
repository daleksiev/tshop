import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const UserProducts = ({ product }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div key={product._id}>
            <Link to={`/products/${product._id}`}>
                <Spinner style={isLoaded ? { display: 'none' } : {}} animation="border" variant="primary" />

                <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={!isLoaded ? { display: 'none' } : {}}
                    onLoad={() => setIsLoaded(true)}
                />
                {product.title}
            </Link>
        </div>
    )
}
export default UserProducts