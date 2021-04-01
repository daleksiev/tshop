import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import { Redirect } from 'react-router';
import { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import validateProduct from '../../../utils/validateProduct';
import { connect } from 'react-redux';
import { setError, setMessage } from '../../../actions/messageActions';
import { createProductAsync } from '../../../actions/productsActions';
import { fetchAllBrandsAsync } from '../../../actions/brandsActions';
import { Spinner } from 'react-bootstrap';
import {
    getUser,
    getCategoriesList,
    getBrandsList,
} from '../../../reducers';
import { fetchAllCategoriesAsync } from '../../../actions/categoriesActions';
import Select from '../../Shared/Select';

const ProductsCreate = ({
    createProductAsync,
    user,
    setMessage,
    setError,
    categories,
    fetchAllCategoriesAsync,
    fetchAllBrandsAsync,
    brands,
}) => {
    useEffect(() => {
        if (!brands.length) {
            fetchAllBrandsAsync();
        }
        if (!categories.length) {
            fetchAllCategoriesAsync();
        }
    }, [fetchAllCategoriesAsync, categories, fetchAllBrandsAsync, brands]);

    const [state, onChangeInput] = useForm({
        title: '',
        brand: '',
        imageUrl: '',
        price: '',
        description: '',
        category: '',
        author: user._id,
    });

    const [toRedirect, setToRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onClickButton = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const checked = validateProduct(state);

        if (!checked.ok) {
            setIsLoading(false);
            return setError(checked.message);
        }

        createProductAsync(state, user.accessToken)
            .then(() => {
                setIsLoading(false);
                setToRedirect(true);
                setMessage('You created new product successfully!');
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message)
            });

    }

    if (toRedirect) {
        return <Redirect to={`/categories/${state.category}`} />
    }

    return (
        <form method="post">
            <h1>Create Product</h1>

            <Input
                id="title"
                type="text"
                name="title"
                title="Title:"
                onChange={onChangeInput}
            />

            <Select id="brand"
                name="brand"
                title="Brand:"
                onChange={onChangeInput}
            >
                {brands.map(brand => <option value={brand._id} key={brand._id}>{brand.name}</option>)}
            </Select>

            <Input
                id="imageUrl"
                type="text"
                name="imageUrl"
                title="Image URL:"
                onChange={onChangeInput}
            />

            <Select id="category"
                name="category"
                title="Category:"
                onChange={onChangeInput}
            >
                {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
            </Select>

            <Input
                id="price"
                type="number"
                name="price"
                title="Price:"
                onChange={onChangeInput}
            />

            <Textarea
                id="description"
                name="description"
                title="Description:"
                onChange={onChangeInput}
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
    categories: getCategoriesList(state),
    brands: getBrandsList(state),
})

const mapDispatchToProps = {
    createProductAsync,
    setMessage,
    setError,
    fetchAllCategoriesAsync,
    fetchAllBrandsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCreate);