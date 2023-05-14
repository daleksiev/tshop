import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';

import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../../hooks/useForm';
import { setError, setMessage } from '../../actions/messageActions';
import { setUserAuth } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Login = ({
  setError,
  setMessage,
  setUserAuth,
  user,
}) => {
  const [state, onChangeInput] = useForm({
    email: '',
    password: '',
  });

  const [toRedirect, setToRedirect] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onClickButton = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (state.email && state.password) {
      firebaseService
        .login(state.email, state.password)
        .then(userInfo => {
          setUserAuth(userInfo);
          setToRedirect(true);
          setIsLoading(false);
          setMessage('You logged in successfully!');
        })
        .catch(err => {
          setIsLoading(false);
          setError(err.message);
        });
    } else {
      setIsLoading(false);
      setError('Email and password fields are required!');
    }
  }

  if (user?.isLoggedIn || toRedirect) {
    return <Redirect to='/' />
  }

  return (
    <form method="post">
      <h1>Login</h1>

      <Input
        id="email"
        type="email"
        name="email"
        title="Email:"
        onChange={onChangeInput}
      />

      <Input
        id="password"
        type="password"
        name="password"
        title="Password:"
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
        : <Button name="Login" onClick={onClickButton} />}

    </form>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  setError,
  setUserAuth,
  setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export const TestLogin = Login;
