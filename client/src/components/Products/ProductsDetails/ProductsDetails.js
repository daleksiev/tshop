import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOneProductAsync } from '../../../actions/productsActions';
import styles from './ProductsDetails.module.scss';

const ProductsDetails = ({
    match,
    fetchOneProductAsync,
    product,
}) => {
    const { productId } = match.params;

    useEffect(() => {
        if (product._id !== productId) {
            fetchOneProductAsync(productId);
        }
    }, [fetchOneProductAsync, productId]);

    return (
        <section className={styles['product-details']}>
            <article>
                <img src={product.imageUrl} alt={product.title} />
            </article>

            <article>
                <h1>{product.title}</h1>

                <strong>Brand: {product.brand}</strong>

                <em>Price: ${product.price}</em>

                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Deinde qui fit, ut ego nesciam, sciant omnes, quicumque Epicurei esse voluerunt? Qui autem esse poteris, nisi te amor ipse ceperit? Idem iste, inquam, de voluptate quid sentit? Huius ego nunc auctoritatem sequens idem faciam. Maximas vero virtutes iacere omnis necesse est voluptate dominante. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Unum nescio, quo modo possit, si luxuriosus sit, finitas cupiditates habere. Duo Reges: constructio interrete. Non est igitur voluptas bonum. Atque haec coniunctio confusioque virtutum tamen a philosophis ratione quadam distinguitur.

</p>
            </article>
        </section>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
});

const mapDispatchToProps = {
    fetchOneProductAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);