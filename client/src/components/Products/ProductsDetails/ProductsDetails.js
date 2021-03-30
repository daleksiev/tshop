import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchOneProductAsync,
    deleteProductAsync,
} from '../../../actions/productsActions';

import {
    buyProductAsync,
} from '../../../actions/userActions';

import styles from './ProductsDetails.module.scss';

const ProductsDetails = ({
    match,
    fetchOneProductAsync,
    product,
    deleteProductAsync,
    buyProductAsync,
    user,
}) => {
    const [toRedirect, setToRedirect] = useState(false);
    const { productId } = match.params;
    const isBought = user.bought.find(product => product._id === productId);
    const isAuthor = product.author === user._id;

    useEffect(() => {
        fetchOneProductAsync(productId);
    }, [fetchOneProductAsync, productId]);

    const onClickDeleteProduct = () => {
        deleteProductAsync(productId)
            .then(() => setToRedirect(true));
    }

    const onClickBuyProduct = () => buyProductAsync(user._id, productId);

    const authorView = (
        <>
            <Link className={styles['edit-button']} to={`/products/edit/${productId}`} >Edit Product</Link>

            <button className={styles['delete-button']} onClick={onClickDeleteProduct}>Delete Product</button>
        </>
    );

    const userView = (
        isBought
            ? <button className={styles['buy-unactive-button']} > You already bought this product!</button>
            : <button className={styles['buy-button']} onClick={onClickBuyProduct}>Buy</button>
    )

    if (toRedirect) {
        return <Redirect to='/' />
    }

    return (
        <section className={styles['product-details']}>
            <article>
                <img src={product.imageUrl} alt={product.title} />
            </article>

            <div>
                <h1>{product.title}</h1>

                <strong>Brand: {product.brand}</strong>

                <em>Price: ${product.price}</em>

                <p>
                    <strong>Description:</strong>

                    {product.description}
                </p>

                {user.isLoggedIn &&
                    <div >
                        {!isAuthor ? userView : authorView}
                    </div>
                }
            </div >
        </section >
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
    user: state.user,
});

const mapDispatchToProps = {
    fetchOneProductAsync,
    deleteProductAsync,
    buyProductAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);