import ProductsItem from './ProductsItem';
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
import { Link } from 'react-router-dom';
import './Products.scss';

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
        if (categoryId !== currentCategory?._id) {
            fetchOneCategoryAsync(categoryId);
            fetchAllProductsAsync(categoryId);
        }
    }, [fetchAllProductsAsync, categoryId, fetchOneCategoryAsync, currentCategory, products])

    const onClickRefreshProducts = () => fetchAllProductsAsync(categoryId);

    return (
        <section className='products-wrapper'>

            <div>
                <Link to="/categories">Back</Link>

                <button className="filter" onClick={onClickRefreshProducts}>Refresh products</button>

                <h2>Products from category "{currentCategory.name}"</h2>
            </div>

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