import ProductsItem from './ProductsItem';
import styles from './Products.module.scss';
import { connect } from 'react-redux';
import { fetchAllProductsAsync } from '../../actions/productsActions';
import { fetchOneCategoryAsync } from '../../actions/categoriesActions';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import {
    getProductsList,
    getProductsIsLoading,
    getCurrentCategory,
} from '../../reducers';

const Products = ({
    fetchAllProductsAsync,
    products,
    isLoading,
    match,
    currentCategory,
    fetchOneCategoryAsync,
}) => {
    const { categoryId } = match.params;

    useEffect(() => {
        fetchOneCategoryAsync(categoryId);
        fetchAllProductsAsync(categoryId);
    }, [fetchAllProductsAsync, categoryId, fetchOneCategoryAsync])

    return (
        <section className={styles['products-wrapper']}>
            <h2>Products from category "{currentCategory.name}"</h2>
            <section>
                {isLoading
                    ? <Spinner animation="border" variant="primary" />
                    : products.map((product) =>
                        <ProductsItem key={product._id} href={`/products/${product._id}`} {...product} />
                    )
                }
            </section>
        </section>
    )
}

const mapStateToProps = (state) => ({
    products: getProductsList(state),
    isLoading: getProductsIsLoading(state),
    currentCategory: getCurrentCategory(state),
})

const mapDispatchToProps = {
    fetchAllProductsAsync,
    fetchOneCategoryAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);