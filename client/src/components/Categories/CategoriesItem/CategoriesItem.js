import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { getUser } from '../../../reducers';
import { connect } from 'react-redux';
import Button from '../../Shared/Button';
import './CategoriesItem.scss';

const CategoriesItem = ({
    _id,
    name,
    imageUrl,
    user,
}) => {
    const [didLoad, setDidLoad] = useState(false);

    const onClickDelete = (e) => {

    }

    const onLoad = (e) => setDidLoad(true);

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
            {user?.role === 'admin' &&
                <article>
                    <Link className="edit-button" to={`/categories/edit/${_id}`} >Edit</Link>
                    <Button className="delete-button" name="Delete" onClick={onClickDelete} />
                </article>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: getUser(state),
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesItem);