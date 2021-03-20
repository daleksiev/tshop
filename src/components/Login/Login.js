import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../../hooks/useForm';

const Login = () => {
	const [state, onChangeInput] = useForm({
		email: '',
		password: '',
	});

	const [message, setMessage] = useState('');
	const [toRedirect, setToRedirect] = useState(false);

	const onClickButton = (e) => {
		e.preventDefault();

		firebaseService
			.login(state.email, state.password)
			.then(res => setToRedirect(true))
			.catch(err => setMessage(err.message));
	}

	if (toRedirect) {
		return <Redirect to='/' />
	}

	return (
		<form method="post">
			<h1>Login</h1>

			<p>{message}</p>

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

export default Login;