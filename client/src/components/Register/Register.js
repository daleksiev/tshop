import Button from '../Shared/Button';
import Input from '../Shared/Input';
import { useState } from 'react';
import firebaseService from '../../services/firebaseService';
import { Redirect } from 'react-router';
import useForm from '../../hooks/useForm';
import { setError, setMessage } from '../../actions/messageActions'
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const Register = ({
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
	}

	if (user.isLoggedIn || toRedirect) {
		return <Redirect to='login' />
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
				: <Button name="Sign Up" onClick={onClickSubmit} />
			}

		</form>
	)
}

const mapStateToProps = (state) => ({
	user: state.user,
})

const mapDispatchToProps = {
	setError,
	setMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);