import { useEffect } from 'react';
import {
    getBrandsList,
    getUser,
} from '../../reducers';
import { fetchAllBrandsAsync } from '../../actions/brandsActions';
import BrandsItem from './BrandsItem';
import { connect } from 'react-redux';
import './Brands.scss';
import { Redirect } from 'react-router';

const Brands = ({
    brands,
    user,
    fetchAllBrandsAsync,
}) => {
    useEffect(() => {
        fetchAllBrandsAsync()
    }, [fetchAllBrandsAsync])

    if (user?.role !== 'admin') {
        return <Redirect to="/" />
    }

    return (
        <section className="brands-container">
            {brands.map(brand => <BrandsItem key={brand._id} brand={brand} />)}
        </section>
    )
}

const mapStateToProps = (state) => ({
    brands: getBrandsList(state),
    user: getUser(state),
})

const mapDispatchToProps = {
    fetchAllBrandsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Brands);