import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../../hooks/useForm';

const Register = () => {
	const [state, onChangeInput] = useForm({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [message, setMessage] = useState('');
	const [toRedirect, setToRedirect] = useState(false);

	const onClickSubmit = (e) => {
		e.preventDefault();

		if (state.password !== state.repeatPassword) {
			return setMessage('The passwords do not match.');
		}

		firebaseService
			.signup(state.email, state.password)
			.then(res => setToRedirect(true))
			.catch(err => setMessage(err.message));
	}

	if (toRedirect) {
		return <Redirect to='login' />
	}

	return (
		<form method="post">
			<h1>Register</h1>

			<p>{message}</p>

			<Input
				id="email"
				type="text"
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

			<Input
				id="repeatPassword"
				type="password"
				name="repeatPassword"
				title="Repeat Password:"
				onChange={onChangeInput}
			/>

			<Button name="Sign Up" onClick={onClickSubmit} />
		</form>
	)
}

export default Register;