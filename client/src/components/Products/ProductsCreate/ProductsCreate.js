import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import { Redirect } from 'react-router';
import { useState } from 'react';
import useForm from '../../../hooks/useForm';
// import { setError } from '../../../actions/messageActions';
import { connect } from 'react-redux';
import { setError, setMessage } from '../../../actions/messageActions';
import { createProductAsync } from '../../../actions/productsActions';

const ProductsCreate = ({
    createProductAsync,
    user,
    setMessage,
    setError,
}) => {
    const [state, onChangeInput] = useForm({
        title: '',
        brand: '',
        imageUrl: '',
        price: '',
        description: '',
        author: user._id,
    });

    const [toRedirect, setToRedirect] = useState(false);

    const onClickButton = (e) => {
        e.preventDefault();
        createProductAsync(state)
            .then(res => {
                setToRedirect(true);
                setMessage('You created new product successfully!');
            })
            .catch(err => setError(err.message));
    }

    if (toRedirect) {
        return <Redirect to="/" />
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

            <Input
                id="brand"
                type="text"
                name="brand"
                title="Brand:"
                onChange={onChangeInput}
            />

            <Input
                id="imageUrl"
                type="text"
                name="imageUrl"
                title="Image URL:"
                onChange={onChangeInput}
            />

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

            <Button name="Create" onClick={onClickButton} />
        </form>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapDispatchToProps = {
    createProductAsync,
    setMessage,
    setError,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCreate);