import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';

const Register = () => {
	const [state, setState] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [message, setMessage] = useState('');
	const [isOk, setIsOk] = useState(false);

	const onChangeInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

	const onClickButton = (e) => {
		e.preventDefault();
		
		if(state.password !== state.repeatPassword)  {
			return setMessage('The passwords do not match.');
		}

		firebaseService
			.signup(state.email, state.password)
			.then(res => setIsOk(true))
			.catch(err => setMessage(err.message));
	}

	if(isOk) {
		return <Redirect to='login'/>
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

			<Button name="Sign Up" onClick={onClickButton}/>
		</form>
	)
}

export default Register;