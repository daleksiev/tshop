import { useEffect } from 'react';
import {
    getBrandsList,
    getUser,
} from '../../reducers';
import { fetchAllBrandsAsync } from '../../actions/brandsActions';
import BrandsItem from './BrandsItem';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './Brands.scss';

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
            <article>
                <Link to="/brands/create">+ Create new Brand</Link>
            </article>

            <div>
                {brands.map(brand => <BrandsItem key={brand._id} brand={brand} />)}
            </div>
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