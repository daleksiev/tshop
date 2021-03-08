import './Input.scss';

const Input = ({
	id,
	name,
	title,
	type,
	value,
}) => (
	<div className="input-container">
		<label htmlFor={id}>{title}</label>
		<input id={id} type={type} name={name} defaultValue={value} />
	</div>
)

export default Input;