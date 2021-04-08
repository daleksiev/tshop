import { useEffect } from 'react';
import {
    getBrandsList,
} from '../../reducers';
import { fetchAllBrandsAsync } from '../../actions/brandsActions';
import BrandsItem from './BrandsItem';
import { connect } from 'react-redux';
import './Brands.scss';

const Brands = ({
    brands,
    fetchAllBrandsAsync,
}) => {
    useEffect(() => {
        fetchAllBrandsAsync()
    }, [fetchAllBrandsAsync])

    return (
        <section className="brands-container">
            {brands.map(brand => <BrandsItem brand={brand} />)}
        </section>
    )
}

const mapStateToProps = (state) => ({
    brands: getBrandsList(state),
})

const mapDispatchToProps = {
    fetchAllBrandsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);