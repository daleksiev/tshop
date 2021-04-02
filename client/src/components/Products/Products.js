import ProductsItem from './ProductsItem';
import { connect } from 'react-redux';
import { fetchAllProductsAsync } from '../../actions/productsActions';
import { fetchOneCategoryAsync } from '../../actions/categoriesActions';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {
    getProductsList,
    getProductsIsLoading,
    getCurrentCategory,
} from '../../reducers';
import { Link } from 'react-router-dom';
import Input from '../Shared/Input';
import ProductsAside from './ProductsAside/ProductsAside';
import useForm from '../../hooks/useForm'
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
    const [searchValue, setSearchValue] = useState('');
    const [filterBy, setFilterBy] = useForm({
        brand: '',
    })
    const [sortBy, setSortBy] = useForm({
        price: '',
    })

    useEffect(() => {
        fetchOneCategoryAsync(categoryId);
        fetchAllProductsAsync(categoryId);
    }, [fetchAllProductsAsync, categoryId, fetchOneCategoryAsync])

    const onSearchChange = (e) => setSearchValue(e.target.value);

    return (
        <section className='products-wrapper'>

            <ProductsAside
                onChangeFilter={setFilterBy}
                filterBy={filterBy}
                onChangeSort={setSortBy}
                sortBy={sortBy}
            />

            <div>
                <Link to="/categories">Back</Link>

                <Input
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search Products"
                    onChange={onSearchChange}
                />

                <h2>Products from category "{currentCategory.name}"</h2>
            </div>

            <section>
                {isLoading
                    ? <Spinner animation="border" variant="primary" />
                    : products
                        .filter(x => x.title.toLowerCase().includes(searchValue.toLowerCase()))
                        .filter(x => filterBy.brand ? x.brand._id === filterBy.brand : true)
                        .sort((a, b) => {
                            if (!sortBy.price) return 0;

                            return sortBy.price === 'asc'
                                ? a.price - b.price
                                : b.price - a.price
                        })
                        .map((product) =>
                            <ProductsItem
                                key={product._id}
                                href={`/products/${product._id}`}
                                {...product}
                            />
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