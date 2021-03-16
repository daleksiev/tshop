import './Button.scss';

const Button = ({
	name,
	onClick,
}) => (
	<button onClick={onClick} className="button">
		{name}
	</button>
)

export default Button;