import useForm from '../../../hooks/useForm';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage, setError } from '../../../actions/messageActions';
import { createBrandAsync } from '../../../actions/brandsActions';
import { getUser } from '../../../reducers';

const BrandsCreate = ({
    setMessage,
    setError,
    user,
    createBrandAsync,
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

        createBrandAsync(state, user.accessToken)
            .then(() => {
                setIsLoading(false);
                setToRedirect(true);
                setMessage('You created new brand successfully!');
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
            <h1>Create Brand</h1>

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
    createBrandAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandsCreate);