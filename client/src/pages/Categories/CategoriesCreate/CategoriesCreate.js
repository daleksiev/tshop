import useForm from '../../../hooks/useForm';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage, setError } from '../../../actions/messageActions';
import { createCategoryAsync } from '../../../actions/categoriesActions';
import { getUser } from '../../../reducers';

const CategoriesCreate = ({
  setMessage,
  setError,
  user,
  createCategoryAsync,
}) => {
  const [state, onChangeInput, setState] = useForm({
    name: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toRedirect, setToRedirect] = useState(false);

  const onImageUpload = (e) => setState({ ...state, image: e.target.files[0] });

  const onClickButton = (e) => {
    e.preventDefault();
    setIsLoading(true);

    createCategoryAsync(state, user.accessToken)
      .then(() => {
        setIsLoading(false);
        setToRedirect(true);
        setMessage('You created new category successfully!');
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.message);
      })
  }

  if (user?.role !== 'admin' || toRedirect) {
    return <Redirect to="/" exact />
  }

  return (
    <form method="post">
      <h1>Create Category</h1>

      <Input
        id="name"
        type="text"
        name="name"
        title="Name:"
        onChange={onChangeInput}
      />

      <Input
        id="image"
        type="file"
        name="image"
        fileName={state.image.name}
        title="Upload an image:"
        onChange={onImageUpload}
      />

      {isLoading
        ? (
          <Button name="Loading...">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        )
        : <Button name="Create" onClick={onClickButton} />}

    </form>
  )
}

const mapStateToProps = (state) => ({
  user: getUser(state),
})

const mapDispatchToProps = {
  setMessage,
  setError,
  createCategoryAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCreate);
