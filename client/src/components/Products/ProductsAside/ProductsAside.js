import { connect } from 'react-redux';
import { getBrandsList } from '../../../reducers';
import { fetchAllBrandsAsync } from '../../../actions/brandsActions';
import { useEffect } from 'react';
import './ProductsAside.scss';
import ProductsAsideBrands from './ProductsAsideBrands/ProductsAsideBrands';
import ProductsAsidePrice from './ProductsAsidePrice/ProductsAsidePrice';

const ProductsAside = ({
    fetchAllBrandsAsync,
    brands,
    onChangeFilter,
    filterBy,
    onChangeSort,
    sortBy,
}) => {
    useEffect(() => {
        fetchAllBrandsAsync();
    }, [fetchAllBrandsAsync]);

    return (
        <aside className="aside-wrapper">
            <h4>Filter by:</h4>

            <section className="aside-items">
                <h5>Brand</h5>

                <ProductsAsideBrands
                    brands={brands}
                    onChangeFilter={onChangeFilter}
                    filterBy={filterBy}
                />
            </section>

            <h4>Sort by:</h4>

            <section className="aside-items">
                <h5>Price</h5>

                <ProductsAsidePrice
                    onChangeSort={onChangeSort}
                    sortBy={sortBy}
                />
            </section>
        </aside>
    )
}

const mapStateToProps = (state) => ({
    brands: getBrandsList(state),
})

const mapDispatchToProps = {
    fetchAllBrandsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAside);