import ProductsItem from './ProductsItem';
import styles from './Products.module.scss';
import { connect } from 'react-redux';
import { fetchProductsAsync } from '../../actions/productsActions';
import { useEffect } from 'react';

const Products = ({
    fetchProductsAsync,
    products,
}) => {
    useEffect(() => {
        fetchProductsAsync();
    }, [fetchProductsAsync,])

    return (
        <section className={styles['products-wrapper']}>
            {products.map((product) =>
                <ProductsItem key={product._id} href={`/products/${product._id}`} {...product} />
            )}
        </section>
    )
}


const mapStateToProps = (state) => ({
    products: state.products,
})

const mapDispatchToProps = {
    fetchProductsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);