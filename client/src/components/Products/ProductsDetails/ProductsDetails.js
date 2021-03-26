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
    useEffect(() => fetchOneProductAsync(productId), [fetchOneProductAsync, productId]);

    return (
        <div>
            {product.title}
            {product.brand}
            {product.price}
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
});

const mapDispatchToProps = {
    fetchOneProductAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);