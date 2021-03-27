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
import styles from './ProductsEdit.module.scss';

const ProductsEdit = ({
    product,
    match,
    fetchOneProductAsync,
    updateProductAsync,
}) => {
    const [toRedirect, setToRedirect] = useState(false);

    const [state, onChangeInput] = useForm({
        title: product.title,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
    });

    const { productId } = match.params;

    useEffect(() => {
        fetchOneProductAsync(productId)
    }, [fetchOneProductAsync, productId])

    const onClickButton = (e) => {
        e.preventDefault();
        updateProductAsync(productId, state)
        setToRedirect(true);
    }

    if (toRedirect) {
        return <Redirect to={`/products/${productId}`} />
    }

    return (
        <div className={styles['products-edit']}>
            <Link to={`/products/${productId}`} >Back to details</Link>

            <form method="post">
                <h1>Edit Product</h1>

                <img src={product.imageUrl} alt={product.title} />

                <Input
                    id="title"
                    type="text"
                    name="title"
                    title="Title:"
                    onChange={onChangeInput}
                    value={product.title}
                />

                <Input
                    id="brand"
                    type="text"
                    name="brand"
                    title="Brand:"
                    onChange={onChangeInput}
                    value={product.brand}
                />

                <Input
                    id="imageUrl"
                    type="text"
                    name="imageUrl"
                    title="Image URL:"
                    onChange={onChangeInput}
                    value={product.imageUrl}
                />

                <Input
                    id="price"
                    type="number"
                    name="price"
                    title="Price:"
                    onChange={onChangeInput}
                    value={product.price}
                />

                <Textarea
                    id="description"
                    name="description"
                    title="Description:"
                    onChange={onChangeInput}
                    value={product.description}
                />

                <Button name="Edit" onClick={onClickButton} />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
})

const mapDispatchToProps = {
    fetchOneProductAsync,
    updateProductAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsEdit);