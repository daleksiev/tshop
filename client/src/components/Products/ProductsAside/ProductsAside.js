import Input from '../../Shared/Input';
import { connect } from 'react-redux';
import { getBrandsList } from '../../../reducers';
import { fetchAllBrandsAsync } from '../../../actions/brandsActions';
import './ProductsAside.scss';
import { useEffect } from 'react';

const ProductsAside = ({
    brands,
    fetchAllBrandsAsync,
    onChangeFilter,
    filterBy,
}) => {
    useEffect(() => {
        fetchAllBrandsAsync();
    }, [fetchAllBrandsAsync]);

    return (
        <aside className="aside-wrapper">
            <h4>Filter by:</h4>

            <section className="aside-filter-by">
                <h5>Brand</h5>

                <article>
                    <Input
                        onChange={onChangeFilter}
                        id="all"
                        name="brand"
                        title="All brands"
                        value=""
                        type="radio"
                        checked={filterBy.brand === ""}
                    />

                    {brands.map(brand => (
                        <Input
                            onChange={onChangeFilter}
                            key={brand._id}
                            id={brand.name}
                            name="brand"
                            title={brand.name}
                            value={brand._id}
                            type="radio"
                        />
                    ))}
                </article>
            </section>

            {/* <h4>Sort by:</h4> */}
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