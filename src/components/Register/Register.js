import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';

const Register = () => {
	const [state, setState] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const onChangeInput = (e) => setState({ ...state, [e.target.name]: e.target.value });

	const onClickButton = (e) => {
		e.preventDefault();
		
		if(state.password !== state.repeatPassword)  {
			return false;
		}

		firebaseService
			.signup(state.email, state.password)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}

	return (
		<form method="post">
			<h1>Register</h1>

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