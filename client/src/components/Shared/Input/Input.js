import './Input.scss';

const Input = ({
	id,
	name,
	title,
	type,
	value,
	onChange,
}) => (
	<div className="input-container">
		<label htmlFor={id}>{title}</label>
		<input id={id} type={type} name={name} value={value} onChange={onChange} />
	</div>
)

export default Input;