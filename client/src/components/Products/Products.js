import ProductsItem from './ProductsItem';
import styles from './Products.module.scss';
import { connect } from 'react-redux';
import { fetchAllProductsAsync } from '../../actions/productsActions';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import {
    getProductsList,
    getProductsIsLoading,
} from '../../reducers';

const Products = ({
    fetchAllProductsAsync,
    products,
    isLoading,
}) => {
    useEffect(() => {
        fetchAllProductsAsync();
    }, [fetchAllProductsAsync,])

    return (
        <section className={styles['products-wrapper']}>
            {isLoading
                ? <Spinner animation="border" variant="primary" />
                : products.map((product) =>
                    <ProductsItem key={product._id} href={`/products/${product._id}`} {...product} />
                )
            }
        </section>
    )
}

const mapStateToProps = (state) => ({
    products: getProductsList(state),
    isLoading: getProductsIsLoading(state),
})

const mapDispatchToProps = {
    fetchAllProductsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);