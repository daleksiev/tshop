import useForm from '../../../hooks/useForm';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage, setError } from '../../../actions/messageActions';
import { fetchOneCategoryAsync, updateCategoryAsync } from '../../../actions/categoriesActions';
import { getUser, getCurrentCategory } from '../../../reducers';

const CategoriesEdit = ({
    setMessage,
    setError,
    user,
    updateCategoryAsync,
    category,
    match,
    fetchOneCategoryAsync,
}) => {
    const { categoryId } = match.params;
    const [state, onChangeInput, setState] = useForm({
        ...category,
        image: category.image || '',
        imageUrl: category.imageUrl || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);

    useEffect(() => {
        fetchOneCategoryAsync(categoryId);

    }, [fetchOneCategoryAsync, categoryId])


    const onImageUpload = (e) => setState({ ...state, image: e.target.files[0] });

    const onClickButton = (e) => {
        e.preventDefault();
        setIsLoading(true);

        updateCategoryAsync(categoryId, state, user.accessToken)
            .then(() => {
                setIsLoading(false);
                setToRedirect(true);
                setMessage('You updated a category successfully!');
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
            <h1>Update Category</h1>

            <Input
                id="name"
                type="text"
                name="name"
                title="Name:"
                value={state.name}
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
                : <Button name="Update" onClick={onClickButton} />}

        </form>
    )
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    category: getCurrentCategory(state),
})

const mapDispatchToProps = {
    setMessage,
    setError,
    updateCategoryAsync,
    fetchOneCategoryAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesEdit);