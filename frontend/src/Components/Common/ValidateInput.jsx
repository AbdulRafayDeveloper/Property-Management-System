import React from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';

function ValidateInput({ className, label, children, validation, name, placeholder = '', type = 'text' }) {
	return (
		<div className={className}>
			{label && <Label className="form-label">{label}</Label>}
			{children ? (
				<Input
					name={name}
					className="form-control"
					placeholder={placeholder}
					type={type}
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					value={validation.values[name] || ''}
					invalid={validation.touched[name] && validation.errors[name] ? true : false}
				>
					{children}
				</Input>
			) : (
				<Input
					name={name}
					className="form-control"
					placeholder={placeholder}
					type={type}
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					value={validation.values[name] || ''}
					invalid={validation.touched[name] && validation.errors[name] ? true : false}
				/>
			)}
			{validation.touched[name] && validation.errors[name] ? <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback> : null}
		</div>
	);
}

export default ValidateInput;
