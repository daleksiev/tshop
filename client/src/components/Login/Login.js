import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../../hooks/useForm';
import { setError } from '../../actions/messageActions';
import { setUserAuth } from '../../actions/userActions';
import { connect } from 'react-redux';

const Login = ({
	setError,
	setUserAuth,
}) => {
	const [state, onChangeInput] = useForm({
		email: '',
		password: '',
	});

	const [toRedirect, setToRedirect] = useState(false);

	const onClickButton = (e) => {
		e.preventDefault();

		firebaseService
			.login(state.email, state.password)
			.then(userInfo => {
				setUserAuth(userInfo);
				setToRedirect(true)
			})
			.catch(err => setError(err.message));
	}

	if (toRedirect) {
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

			<Button name="Login" onClick={onClickButton} />
		</form>
	)
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
	setError,
	setUserAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);