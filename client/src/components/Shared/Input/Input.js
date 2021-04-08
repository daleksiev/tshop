import './Input.scss';

const Input = ({
	id,
	name,
	title,
	type,
	value,
	placeholder,
	onChange,
	checked,
	fileName,
	fileTitle = "Click here to choose file or Drag and drop your file here",
	children,
}) => (
	<div className={"input-container " + type + ' type-' + type}>
		<label
			className={fileTitle === "" ? 'hidden' : ''}
			htmlFor={id}
			title={fileTitle}
		>
			{title}
			{children}
		</label>

		{fileName &&
			<p>
				{fileName} is loaded.
			</p>
		}

		<input
			checked={checked}
			id={id}
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	</div>
)

export default Input;