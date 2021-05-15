import { useState } from 'react';
import firebaseService from '../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../hooks/useForm';


const registerLogic = (Component) => ({
    setError,
    setMessage,
    user,
}) => {
    const [state, onChangeInput] = useForm({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [toRedirect, setToRedirect] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onClickSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (state.password !== state.repeatPassword) {
            setIsLoading(false);
            return setError('The passwords do not match.');
        }
        if (state.email && state.password) {
            firebaseService
                .signup(state.email, state.password)
                .then(res => {
                    setToRedirect(true);
                    setMessage('You registered successfully!');
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setError('Email, password and repeat password fields are required!');
        }
    }

    if (user.isLoggedIn || toRedirect) {
        return <Redirect to='login' />
    }

    return <Component
        onChangeInput={onChangeInput}
        isLoading={isLoading}
        onClickSubmit={onClickSubmit}
    />
}

export default registerLogic;