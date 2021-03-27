import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import { connect } from 'react-redux';
import {
    fetchOneProductAsync,
} from '../../../actions/productsActions'
import { useEffect } from 'react';
import useForm from '../../../hooks/useForm';

const ProductsEdit = ({
    product,
    match,
}) => {
    const [state, onChangeInput] = useForm({
        title: product.title,
        brand: product.brand,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
    });

    const { productId } = match.params;

    useEffect(() => fetchOneProductAsync(productId))

    const onClickButton = (e) => {
        e.preventDefault();
    }

    return (
        <form method="post">
            <h1>Edit Product</h1>

            <Input
                id="title"
                type="text"
                name="title"
                title="Title:"
                onChange={onChangeInput}
                value={state.title}
            />

            <Input
                id="brand"
                type="text"
                name="brand"
                title="Brand:"
                onChange={onChangeInput}
                value={state.brand}
            />

            <Input
                id="imageUrl"
                type="text"
                name="imageUrl"
                title="Image URL:"
                onChange={onChangeInput}
                value={state.imageUrl}
            />

            <Input
                id="price"
                type="number"
                name="price"
                title="Price:"
                onChange={onChangeInput}
                value={state.price}
            />

            <Textarea
                id="description"
                name="description"
                title="Description:"
                onChange={onChangeInput}
                value={state.description}
            />

            <Button name="Edit" onClick={onClickButton} />
        </form>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsEdit);