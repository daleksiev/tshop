import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
    fetchOneProductAsync,
    updateProductAsync,
} from '../../../actions/productsActions'
import { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import { setError, setMessage } from '../../../actions/messageActions';
import validateProduct from '../../../utils/validateProduct';
import styles from './ProductsEdit.module.scss';
import emptyImageSrc from '../../../assets/empty.jpg';
import {
    getCurrentProduct,
    getUser,
    getCategoriesList,
    getBrandsList,
} from '../../../reducers';
import { fetchAllCategoriesAsync } from '../../../actions/categoriesActions';
import Select from '../../Shared/Select';
import { fetchAllBrandsAsync } from '../../../actions/brandsActions';

const ProductsEdit = ({
    product,
    match,
    fetchOneProductAsync,
    fetchAllCategoriesAsync,
    updateProductAsync,
    setError,
    setMessage,
    user,
    brands,
    fetchAllBrandsAsync,
    categories,
}) => {
    const { productId } = match.params;
    const [toRedirect, setToRedirect] = useState(false);
    const [didLoad, setDidLoad] = useState(false);
    const [state, onChangeInput, setState] = useForm({ ...product, brand: product.brand._id });

    useEffect(() => {
        fetchOneProductAsync(productId)
            .then(() => setState({ ...product, brand: product.brand._id }));

        if (!brands.length) {
            fetchAllBrandsAsync();
        }

        if (!categories.length) {
            fetchAllCategoriesAsync();
        }
    }, [fetchOneProductAsync, productId, setState, fetchAllCategoriesAsync, categories, fetchAllBrandsAsync, brands])

    const onClickButton = (e) => {
        e.preventDefault();

        const checked = validateProduct(state);

        if (!checked.ok) {
            return setError(checked.message);
        }

        updateProductAsync(productId, state, user.accessToken)
            .then(res => {
                setToRedirect(true);
                setMessage('You updated your product successfully!');
            })
            .catch(err => setError(err.message));
    }

    if (toRedirect) {
        return <Redirect to={`/products/${productId}`} />
    }

    return (
        <div className={styles['products-edit']}>
            <Link to={`/products/${productId}`} >Back to details</Link>

            <form method="post">
                <h1>Edit Product</h1>

                <img
                    style={didLoad ? {} : { 'visibility': 'hidden' }}
                    src={product.imageUrl}
                    onLoad={e => setDidLoad(true)}
                    onError={e => e.target.src = emptyImageSrc}
                    alt={product.title}

                />

                <Input
                    id="title"
                    type="text"
                    name="title"
                    title="Title:"
                    onChange={onChangeInput}
                    value={state.title || product.title}
                />

                <Select id="brand"
                    name="brand"
                    title="Brand:"
                    onChange={onChangeInput}
                    value={state?.brand || product?.brand}
                >
                    {brands.map(brand => <option value={brand?._id?.toString()} key={brand._id}>{brand.name}</option>)}
                </Select>

                <Input
                    id="imageUrl"
                    type="text"
                    name="imageUrl"
                    title="Image URL:"
                    onChange={onChangeInput}
                    value={state.imageUrl || product.imageUrl}
                />

                <Select id="category"
                    name="category"
                    title="Category:"
                    onChange={onChangeInput}
                    value={state.category || product.category}
                >
                    {categories.map(category =>
                        <option
                            value={category._id}
                            key={category._id}
                        >
                            {category.name}
                        </option>
                    )}
                </Select>

                <Input
                    id="price"
                    type="number"
                    name="price"
                    title="Price:"
                    onChange={onChangeInput}
                    value={state.price || product.price}
                />

                <Textarea
                    id="description"
                    name="description"
                    title="Description:"
                    onChange={onChangeInput}
                    value={state.description || product.description}
                />

                <Button name="Edit" onClick={onClickButton} />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: getCurrentProduct(state),
    user: getUser(state),
    categories: getCategoriesList(state),
    brands: getBrandsList(state),
})

const mapDispatchToProps = {
    fetchOneProductAsync,
    updateProductAsync,
    fetchAllCategoriesAsync,
    setError,
    setMessage,
    fetchAllBrandsAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsEdit);