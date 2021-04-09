import { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchOneProductAsync,
    clearOneProduct,
    deleteProductAsync,
} from '../../../actions/productsActions';
import { setError, setMessage } from '../../../actions/messageActions';
import {
    addToFavouritesAsync,
    removeFromFavouritesAsync,
} from '../../../actions/userActions';
import emptyImageSrc from '../../../assets/empty.jpg';
import './ProductsDetails.scss';
import {
    getCurrentProduct,
    getUser,
} from '../../../reducers';
import CartContext from '../../../context/CartContext';
import { addToCart, removeFromCart } from '../../../actions/cartActions';

const ProductsDetails = ({
    match,
    fetchOneProductAsync,
    clearOneProduct,
    product,
    deleteProductAsync,
    addToFavouritesAsync,
    user,
    setError,
    setMessage,
    removeFromFavouritesAsync,
}) => {
    const [toRedirect, setToRedirect] = useState(false);
    const [didLoad, setDidLoad] = useState(false);
    const [cartContext, setCartContext] = useContext(CartContext);
    const { productId } = match.params;

    useEffect(() => {
        fetchOneProductAsync(productId);

        return () => clearOneProduct();
    }, [fetchOneProductAsync, productId, clearOneProduct]);

    const isFavourite = user?.favourites?.find(product => product === productId || product._id === productId);
    const isInCart = cartContext?.find(x => x._id === productId);

    const redirectUrl = `/categories/${product.category}`;

    const onClickAddToCart = () => {
        setMessage('The product was added to the cart successfully!');
        setCartContext(addToCart(productId, product.price));
    }

    const onClickRemoveFromCart = () => {
        setMessage('The product was removed from the cart successfully!');
        setCartContext(removeFromCart(productId));
    }

    const onClickDeleteProduct = () => {
        deleteProductAsync(productId, user.accessToken)
            .then(() => {
                setToRedirect(true);
                setMessage('You deleted your product successfully!');
            })
            .catch(err => setError(err.message));
    }

    const onClickAddToFavourites = () => {
        addToFavouritesAsync(user._id, productId, user.accessToken)
            .then(res => {
                setMessage('You added this product to favourites successfully!')
            });
    }

    const onClickRemoveFromFavourites = () => {
        removeFromFavouritesAsync(user._id, productId, user.accessToken)
            .then(() => setMessage('You removed this product from favourites successfully!'))
    }

    const adminView = (
        <>
            <Link className='edit-button' to={`/products/edit/${productId}`} >Edit Product</Link>

            <button className='delete-button' onClick={onClickDeleteProduct}>Delete Product</button>
        </>
    );

    const userView = (
        <>
            {isFavourite
                ? <button className='remove-favourite-button' onClick={onClickRemoveFromFavourites}> Remove from favourites</button>
                : <button className='add-favourite-button' onClick={onClickAddToFavourites}>Add to favourites</button>
            }
            {isInCart
                ? <button className='remove-favourite-button' onClick={onClickRemoveFromCart}>Remove from cart</button>
                : <button className='add-favourite-button' onClick={onClickAddToCart}>Add to cart</button>
            }
        </>
    )

    if (toRedirect) {
        return <Redirect exact to={redirectUrl} />
    }

    return (
        <section className='product-details'>
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
                <div className='back-link'>
                    <Link to={redirectUrl}>Back</Link>
                </div>

                <h1>{product.title}</h1>

                <strong>Brand: {product.brand.name}</strong>

                <em>Price: ${product.price}</em>

                <p>
                    <strong>Description:</strong>

                    {product.description}
                </p>

                {user.isLoggedIn &&
                    <div >
                        {user?.role === 'user' ? userView : adminView}
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
    clearOneProduct,
    fetchOneProductAsync,
    deleteProductAsync,
    addToFavouritesAsync,
    setError,
    setMessage,
    removeFromFavouritesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);