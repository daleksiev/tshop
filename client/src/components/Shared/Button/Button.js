import './Button.scss';

const Button = ({
	name,
	onClick,
	children,
}) => (
	<button onClick={onClick} className="button">
		{children}
		{name}
	</button>
)

export default Button;