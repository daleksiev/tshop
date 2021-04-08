import { Link } from 'react-router-dom';
import Button from '../../Shared/Button';
import { deleteBrandAsync, fetchAllBrandsAsync } from '../../../actions/brandsActions'
import { setMessage, setError } from '../../../actions/messageActions'
import { getUser } from '../../../reducers';
import { connect } from 'react-redux';
import './BrandsItem.scss';

const BrandsItem = ({
    brand,
    user,
    deleteBrandAsync,
    fetchAllBrandsAsync,
    setMessage,
    setError,
}) => {
    const onClickDeleteBrand = (e) => {
        deleteBrandAsync(brand._id, user.accessToken)
            .then(() => {
                fetchAllBrandsAsync();
                setMessage('Deleted a brand successfully');
            })
            .catch(err => setError(err.message));
    }

    return (
        <article className='brands-item-container'>
            <Link to={`/brands/edit/${brand._id}`} >
                <img src={brand.imageUrl} alt={brand.name} />
                <p>{brand.name}</p>
            </Link>

            <div>
                <Button className="delete-button" name="Delete" onClick={onClickDeleteBrand} />
            </div>
        </article>
    )
}


const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {
    deleteBrandAsync,
    fetchAllBrandsAsync,
    setMessage,
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandsItem);