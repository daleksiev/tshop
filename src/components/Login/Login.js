import Button from '../Shared/Button';
import Input from '../Shared/Input';

const Login = () => (
	<form method="post">
		<h1>Login</h1>

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

		<Button name="Login" />
	</form>
)

export default Login;