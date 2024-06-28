import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback, Card } from 'reactstrap';
import ValidateInput from '../../../Components/Common/ValidateInput';

const Step3 = ({ validation }) => {
	return (
		<>
			<h5 className={`mb-4 fs-2 fw-bold`}>Layout</h5>

			<Row>
				<Col lg={4}>
					<ValidateInput type="select" validation={validation} name={'bedrooms'} placeholder={'Bedrooms'}>
						<option className="text-muted">Bedrooms</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</ValidateInput>
				</Col>
				<Col lg={4}>
					<ValidateInput type="select" validation={validation} name={'bathrooms'} placeholder={'Bathrooms'}>
						<option className="text-muted">Bathrooms</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</ValidateInput>
				</Col>
			</Row>
			<Row className="mt-3">
				<Label className="form-label">What kind of space is available?</Label>
				<div className="d-flex gap-2 mt-2">
					{['Entire Place', 'Private Room', 'Shared Room']?.map((a, i) => {
						return (
							<span key={i} className={`btn ${validation.values.spaceKind == a ? 'btn-info' : 'btn-light'}`} onClick={() => validation.setFieldValue('spaceKind', a)}>
								{a}
							</span>
						);
					})}
				</div>
			</Row>
			<Row className="mt-3">
				<Label className="form-label">What kind of property is it?</Label>
				<div className="d-flex gap-2 mt-2">
					{['Apartment', 'House', 'Co-Living', 'Guest House', 'Condo', 'Town House', 'Basement']?.map((a, i) => {
						return (
							<span key={i} className={`btn ${validation.values.propertyKind == a ? 'btn-info' : 'btn-light'}`} onClick={() => validation.setFieldValue('propertyKind', a)}>
								{a}
							</span>
						);
					})}
				</div>
			</Row>
		</>
	);
};

export default Step3;
