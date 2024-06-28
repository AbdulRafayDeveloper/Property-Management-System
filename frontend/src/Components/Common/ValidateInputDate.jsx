import React from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

function ValidateInputDate({ className, label, validation, name, placeholder = '' }) {
	return (
		<div className={className}>
			{label && <Label className="form-label">{label}</Label>}
			<Flatpickr
				placeholder={placeholder}
				className={`form-control ${validation.touched[name] && validation.errors[name] ? 'is-invalid' : ''}`}
				options={{
					dateFormat: 'd M, Y'
				}}
				name={name}
				onChange={(date) => {
					validation.setFieldValue(name, date[0]);
				}}
				value={validation.values[name] || ''}
			/>
			{validation.touched[name] && validation.errors[name] ? <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback> : null}
		</div>
	);
}

export default ValidateInputDate;
