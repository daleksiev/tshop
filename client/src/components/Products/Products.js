import ProductsItem from './ProductsItem';
import styles from './Products.module.scss';
import { connect } from 'react-redux';
import { fetchAllProductsAsync } from '../../actions/productsActions';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const Products = ({
    fetchAllProductsAsync,
    products,
}) => {
    useEffect(() => {
        fetchAllProductsAsync();
    }, [fetchAllProductsAsync,])

    return (
        <section className={styles['products-wrapper']}>
            {products.isLoading
                ? <Spinner animation="border" variant="primary" />
                : products.list.map((product) =>
                    <ProductsItem key={product._id} href={`/products/${product._id}`} {...product} />
                )
            }
        </section>
    )
}


const mapStateToProps = (state) => ({
    products: state.products,
})

const mapDispatchToProps = {
    fetchAllProductsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);