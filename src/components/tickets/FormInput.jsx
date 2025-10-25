export const FormInput = ({
	label,
	id,
	name,
	value,
	onChange,
	error,
	required,
	placeholder,
	type = "text",
}) => (
	<div>
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 mb-2"
		>
			{label}{" "}
			{required && (
				<span className="text-red-500" aria-label="required">
					*
				</span>
			)}
		</label>
		<input
			type={type}
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			aria-required={required}
			aria-invalid={error ? "true" : "false"}
			aria-describedby={error ? `${id}-error` : undefined}
			className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				error ? "border-red-500" : "border-gray-300"
			}`}
			placeholder={placeholder}
		/>
		{error && (
			<p
				id={`${id}-error`}
				role="alert"
				className="mt-1 text-sm text-red-600 flex items-center"
			>
				<AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
				{error}
			</p>
		)}
	</div>
);

export const FormTextarea = ({
	label,
	id,
	name,
	value,
	onChange,
	error,
	placeholder,
	rows = 4,
}) => (
	<div>
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 mb-2"
		>
			{label}
		</label>
		<textarea
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			aria-invalid={error ? "true" : "false"}
			aria-describedby={error ? `${id}-error` : undefined}
			rows={rows}
			className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				error ? "border-red-500" : "border-gray-300"
			}`}
			placeholder={placeholder}
		/>
		{error && (
			<p
				id={`${id}-error`}
				role="alert"
				className="mt-1 text-sm text-red-600 flex items-center"
			>
				<AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
				{error}
			</p>
		)}
	</div>
);


export const FormSelect = ({
	label,
	id,
	name,
	value,
	onChange,
	error,
	required,
	options,
}) => (
	<div>
		<label
			htmlFor={id}
			className="block text-sm font-medium text-gray-700 mb-2"
		>
			{label}{" "}
			{required && (
				<span className="text-red-500" aria-label="required">
					*
				</span>
			)}
		</label>
		<select
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			aria-required={required}
			aria-invalid={error ? "true" : "false"}
			aria-describedby={error ? `${id}-error` : undefined}
			className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				error ? "border-red-500" : "border-gray-300"
			}`}
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
		{error && (
			<p
				id={`${id}-error`}
				role="alert"
				className="mt-1 text-sm text-red-600 flex items-center"
			>
				<AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
				{error}
			</p>
		)}
	</div>
);

