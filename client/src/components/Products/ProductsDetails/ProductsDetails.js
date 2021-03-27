import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    fetchOneProductAsync,
    deleteProductAsync,
} from '../../../actions/productsActions';
import styles from './ProductsDetails.module.scss';

const ProductsDetails = ({
    match,
    fetchOneProductAsync,
    product,
    deleteProductAsync,
}) => {
    const [toRedirect, setToRedirect] = useState(false);
    const { productId } = match.params;

    console.log(productId);

    useEffect(() => {
        fetchOneProductAsync(productId);
    }, [fetchOneProductAsync, productId]);

    const onClickDeleteProduct = () => {
        deleteProductAsync(productId)
            .then(() => setToRedirect(true));
    }

    if (toRedirect) {
        return <Redirect to='/' />
    }

    return (
        <section className={styles['product-details']}>
            <article>
                <img src={product.imageUrl} alt={product.title} />
            </article>

            <article>
                <h1>{product.title}</h1>

                <strong>Brand: {product.brand}</strong>

                <em>Price: ${product.price}</em>

                <p>
                    <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deinde qui fit, ut ego nesciam, sciant omnes, quicumque Epicurei esse voluerunt? Qui autem esse poteris, nisi te amor ipse ceperit? Idem iste, inquam, de voluptate quid sentit? Huius ego nunc auctoritatem sequens idem faciam. Maximas vero virtutes iacere omnis necesse est voluptate dominante. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Duo Reges: constructio interrete. Non est igitur voluptas bonum. Atque haec coniunctio confusioque virtutum tamen a philosophis ratione quadam distinguitur.
                </p>

                <button className="product-delete-button" onClick={onClickDeleteProduct}>Delete Product</button>
            </article>
        </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
});

const mapDispatchToProps = {
    fetchOneProductAsync,
    deleteProductAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);