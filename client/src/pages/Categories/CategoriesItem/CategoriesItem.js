import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { getUser } from '../../../reducers';
import { connect } from 'react-redux';
import Button from '../../../components/Shared/Button';
import { setMessage, setError } from '../../../actions/messageActions'
import { deleteCategoryAsync } from '../../../actions/categoriesActions'
import CardLink from '../../../components/Shared/CardLink'
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

  const isAdmin = user?.role === 'admin'

  const onLoad = (e) => setDidLoad(true);

  const adminView = (
    <article className='action-buttons'>
      <Link className="edit-button" to={`/categories/edit/${_id}`} >Edit</Link>

      <Button className="delete-button" name="Delete" onClick={onClickDelete} />
    </article>
  )

  return (
    <div className='card-container'>
      <CardLink to={`/categories/${_id}`} className='card-item'>
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


      </CardLink>
      {isAdmin && adminView}
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
