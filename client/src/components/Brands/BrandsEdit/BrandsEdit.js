import useForm from '../../../hooks/useForm';
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
import BrandsEditForm from './BrandsEditForm/BrandsEditForm';

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

    const onClickButtonSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        updateBrandAsync(brandId, state, user.accessToken)
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

    if (user?.role !== 'admin') {
        return <Redirect to="/" exact />
    }

    if (toRedirect) {
        return <Redirect to="/brands" exact />
    }

    return (
        <BrandsEditForm
            onChangeInput={onChangeInput}
            isLoading={isLoading}
            onImageUpload={onImageUpload}
            onSubmit={onClickButtonSubmit}
            brand={brand}
            state={state}
        />
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