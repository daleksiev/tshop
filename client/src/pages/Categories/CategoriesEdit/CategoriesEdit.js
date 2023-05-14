import useForm from '../../../hooks/useForm';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage, setError } from '../../../actions/messageActions';
import { fetchOneCategoryAsync, updateCategoryAsync } from '../../../actions/categoriesActions';
import { getUser, getCurrentCategory } from '../../../reducers';
import CategoriesEditForm from './CategoriesEditForm/CategoriesEditForm';

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
    const [state, onChangeInput, setState] = useForm({ ...category });
    const [isLoading, setIsLoading] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);

    useEffect(() => {
        fetchOneCategoryAsync(categoryId)
            .then((category) => {
                setState({
                    ...category,
                    image: category.image || '',
                    imageUrl: category.imageUrl || '',
                })
            })

    }, [fetchOneCategoryAsync, categoryId, setState])

    const onImageUpload = (e) => setState({ ...state, image: e.target.files[0] });

    const onClickButtonSubmit = (e) => {
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
        <CategoriesEditForm
            onImageUpload={onImageUpload}
            onSubmit={onClickButtonSubmit}
            onChangeInput={onChangeInput}
            isLoading={isLoading}
            state={state}
            category={category}
        />
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