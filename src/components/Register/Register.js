import Button from '../Shared/Button/Button';
import Input from '../Shared/Input';
import './Register.scss'

const Register = () => (
	<form method="post" className="register-form">
		<h1>Register</h1>

		<Input
			id="email"
			type="email"
			name="email"
			title="Email:"
		/>

		<Input
			id="password"
			type="password"
			name="password"
			title="Password:"
		/>

		<Input
			id="repeatPassword"
			type="password"
			name="repeatPassword"
			title="Repeat Password:"
		/>

		<Button name="Sign Up" />
	</form>
)

export default Register;