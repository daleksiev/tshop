import './Button.scss';

const Button = ({
	name,
	onClick,
	children,
	className,
}) => (
	<button onClick={onClick} className={"button " + className}>
		{children}
		{name}
	</button>
)

export default Button;