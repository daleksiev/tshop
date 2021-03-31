import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchOneProductAsync,
    deleteProductAsync,
} from '../../../actions/productsActions';
import { setError, setMessage } from '../../../actions/messageActions';
import {
    buyProductAsync,
} from '../../../actions/userActions';
import emptyImageSrc from '../../../assets/empty.jpg';
import styles from './ProductsDetails.module.scss';
import {
    getCurrentProduct,
    getUser,
} from '../../../reducers';

const ProductsDetails = ({
    match,
    fetchOneProductAsync,
    product,
    deleteProductAsync,
    buyProductAsync,
    user,
    setError,
    setMessage,
}) => {
    const [toRedirect, setToRedirect] = useState(false);
    const [didLoad, setDidLoad] = useState(false);
    const { productId } = match.params;
    const isBought = user.bought.find(product => product === productId || product._id === productId);
    const isAuthor = product.author === user._id;

    useEffect(() => {
        fetchOneProductAsync(productId);
    }, [fetchOneProductAsync, productId]);

    const onClickDeleteProduct = () => {
        deleteProductAsync(productId, user.accessToken)
            .then(() => {
                setToRedirect(true);
                setMessage('You deleted your product successfully!');
            })
            .catch(err => setError(err.message));
    }

    const onClickBuyProduct = () => {
        buyProductAsync(user._id, productId, user.accessToken)
            .then(res => {
                console.log(res)
                setMessage('You bought this product successfully!')
            });
    }

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
                <img
                    style={didLoad ? {} : { 'visibility': 'hidden' }}
                    src={product.imageUrl}
                    alt={product.title}
                    onLoad={e => setDidLoad(true)}
                    onError={e => e.target.src = emptyImageSrc}
                />
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
    product: getCurrentProduct(state),
    user: getUser(state),
});

const mapDispatchToProps = {
    fetchOneProductAsync,
    deleteProductAsync,
    buyProductAsync,
    setError,
    setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);