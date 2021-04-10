import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { getUser } from '../../../reducers';
import { connect } from 'react-redux';
import Button from '../../Shared/Button';
import { setMessage, setError } from '../../../actions/messageActions'
import { deleteCategoryAsync } from '../../../actions/categoriesActions'
import './CategoriesItem.scss';

const CategoriesItem = ({
    _id,
    name,
    imageUrl,
    user,
    setMessage,
    setError,
    deleteCategoryAsync,
}) => {
    const [didLoad, setDidLoad] = useState(false);

    const onClickDelete = (e) => {
        deleteCategoryAsync(_id, user.accessToken)
            .then(() => setMessage('You deleted a category successfully!'))
            .catch((err) => setError(err.message));
    }

    const onLoad = (e) => setDidLoad(true);

    const adminView = (
        <article>
            <Link className="edit-button" to={`/categories/edit/${_id}`} >Edit</Link>

            <Button className="delete-button" name="Delete" onClick={onClickDelete} />
        </article>
    )

    return (
        <div className="categories-item">
            <Link to={`/categories/${_id}`}>
                <Spinner
                    style={didLoad ? { 'display': 'none' } : {}}
                    animation="border"
                    variant="primary"
                />

                <img
                    style={didLoad ? {} : { 'visibility': 'hidden' }}
                    src={imageUrl}
                    alt=""
                    onLoad={onLoad}
                />

                <h3>{name}</h3>

            </Link>

            {user?.role === 'admin' && adminView}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {
    setMessage,
    setError,
    deleteCategoryAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesItem);