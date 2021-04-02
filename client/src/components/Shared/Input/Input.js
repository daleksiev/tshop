import './Input.scss';

const Input = ({
	id,
	name,
	title,
	type,
	value,
	placeholder,
	onChange,
}) => (
	<div className={"input-container " + type + ' type-' + type}>
		<label htmlFor={id}>{title}</label>
		<input id={id} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
	</div>
)

export default Input;