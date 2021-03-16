import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';

const Login = () => {
	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const [message, setMessage] = useState('');
	const [isOk, setIsOk] = useState(false);

	const onChangeInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

	const onClickButton = (e) => {
		e.preventDefault();

		firebaseService
			.login(state.email, state.password)
			.then(res => setIsOk(true))
			.catch(err => setMessage(err.message));
	}

	if (isOk) {
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

			<Button name="Login" onClick={onClickButton}/>
		</form>
	)
}

export default Login;