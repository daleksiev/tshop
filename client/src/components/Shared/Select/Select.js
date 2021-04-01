import './Select.scss';

const Select = ({
	id,
	name,
	title,
	type,
	value,
	onChange,
	children,
}) => (
	<div className="input-container select-container">
		<label htmlFor={id}>{title}</label>
		<select id={id} type={type} name={name} value={value} onChange={onChange} >
			<option value="" >Please choose {name}</option>
			{children}
		</select>
	</div>
)

export default Select;