import useForm from '../../../hooks/useForm';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setMessage, setError } from '../../../actions/messageActions';
import {
    updateBrandAsync,
    fetchOneBrandAsync,
} from '../../../actions/brandsActions';
import {
    getUser,
    getCurrentBrand,
} from '../../../reducers';

const BrandsEdit = ({
    setMessage,
    setError,
    user,
    updateBrandAsync,
    fetchOneBrandAsync,
    brand,
    match,
}) => {
    const { brandId } = match.params;
    const [didLoaded, setDidLoad] = useState(false);
    const [state, onChangeInput, setState] = useForm({
        name: brand.name,
        image: brand.image || '',
    });

    useEffect(() => {
        fetchOneBrandAsync(brandId)
            .then(brand => setState({ ...brand }));
    }, [fetchOneBrandAsync, brandId, setState]);

    const [isLoading, setIsLoading] = useState(false);
    const [toRedirect, setToRedirect] = useState(false);

    const onImageUpload = (e) => setState({ ...state, image: e.target.files[0] });

    const onClickButton = (e) => {
        e.preventDefault();
        setIsLoading(true);

        updateBrandAsync(state, user.accessToken)
            .then(() => {
                setIsLoading(false);
                setToRedirect(true);
                setMessage('You updated new brand successfully!');
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
            <h1>Update Brand</h1>

            <Spinner style={!didLoaded ? {} : { 'display': 'none' }} animation="border" variant="primary" />

            <img
                alt={brand.name}
                style={didLoaded ? {} : { 'display': 'none' }}
                src={brand.imageUrl}
                onLoad={e => setDidLoad(true)}
                onError={e => setDidLoad(false)}
            />

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
    brand: getCurrentBrand(state),
})

const mapDispatchToProps = {
    setMessage,
    setError,
    fetchOneBrandAsync,
    updateBrandAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandsEdit);