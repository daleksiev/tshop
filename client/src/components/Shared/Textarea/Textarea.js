import './Textarea.scss';

const Textarea = ({
	id,
	name,
	title,
	value,
	onChange,
}) => (
	<div className="textarea-container input-container">
		<label htmlFor={id}>{title}</label>

		<textarea id={id} name={name} onChange={onChange} >{value}</textarea>
	</div>
)

export default Textarea;