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

    useEffect(() => {
        fetchOneProductAsync(productId);
    }, [fetchOneProductAsync, productId]);

    const onClickDeleteProduct = () => {
        deleteProductAsync(productId)
            .then(() => setToRedirect(true));
    }

    const onClickBuyProduct = () => buyProductAsync(user._id, productId);

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
                    <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deinde qui fit, ut ego nesciam, sciant omnes, quicumque Epicurei esse voluerunt? Qui autem esse poteris, nisi te amor ipse ceperit? Idem iste, inquam, de voluptate quid sentit? Huius ego nunc auctoritatem sequens idem faciam. Maximas vero virtutes iacere omnis necesse est voluptate dominante. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Duo Reges: constructio interrete. Non est igitur voluptas bonum. Atque haec coniunctio confusioque virtutum tamen a philosophis ratione quadam distinguitur.
                </p>

                {user.isLoggedIn &&
                    <div>
                        {isBought
                            ? <button className={styles['buy-unactive-button']}>You already bought this product!</button>
                            : <button className={styles['buy-button']} onClick={onClickBuyProduct}>Buy</button>
                        }


                        <Link className={styles['edit-button']} to={`/products/edit/${productId}`} >Edit Product</Link>

                        <button className={styles['delete-button']} onClick={onClickDeleteProduct}>Delete Product</button>
                    </div>
                }

            </div>
        </section>
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