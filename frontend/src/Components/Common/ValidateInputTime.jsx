import React from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

function ValidateInputTime({ className, label, validation, name, placeholder = '' }) {
	return (
		<div className={className}>
			{label && <Label className="form-label">{label}</Label>}
			<Flatpickr
				placeholder={placeholder}
				className={`form-control ${validation.touched[name] && validation.errors[name] ? 'is-invalid' : ''}`}
				options={{
					enableTime: true,
					noCalendar: true,
					dateFormat: 'h:i K', // Format for time input with AM/PM
					time_24hr: false, // 12-hour format with AM/PM
					altInput: true, // Use an alternate input for displaying the date
					altFormat: 'h:i K' // Alternate format for the displayed date with AM/PM
				}}
				name={name}
				// onChange={(date) => {
				// 	validation.setFieldValue(name, date[0]);
				// }}
				onChange={(date) => {
					const formattedTime = date[0].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
					validation.setFieldValue(name, formattedTime);
				  }}
				value={validation.values[name] || ''}
			/>
			{validation.touched[name] && validation.errors[name] ? <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback> : null}
		</div>
	);
}

export default ValidateInputTime;
