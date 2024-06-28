import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback, Card } from 'reactstrap';
import ValidateInput from '../../../Components/Common/ValidateInput';
import Flatpickr from 'react-flatpickr';
import ValidateInputDate from '../../../Components/Common/ValidateInputDate';

const Step2 = ({ validation }) => {
	return (
		<>
			<h5 className={`mb-4 fs-2 fw-bold`}>Listing Basics</h5>

			<Row>
				<Col lg={8}>
					<ValidateInput label={'Address'} validation={validation} name={'address'} placeholder={'Type the address'} />
				</Col>
			</Row>
			<Row>
				<Col lg={4}>
					<ValidateInput type="number" className={'mt-3'} label={'Monthly Rent'} validation={validation} name={'monthlyRent'} placeholder={'$'} />
				</Col>
				<Col lg={4}>
					<ValidateInput type="number" className={'mt-3'} label={'Deposit'} validation={validation} name={'deposit'} placeholder={'$ Optional'} />
				</Col>
			</Row>
			<Row className="mt-3">
				<Label className="form-label">Duration</Label>
				<Col lg={4}>
					<Card className={`card-height-100 cp ${validation.values.duration == 'Flexible' ? 'shadow-lg' : ''}`} onClick={() => validation.setFieldValue('duration', 'Flexible')}>
						<div className="d-flex">
							<div className="flex-grow-1 p-3">
								<h5 className={`mb-3 fs-4 fw-bold ${validation.values.duration != 'Flexible' ? 'blur' : ''}`}>Flexible</h5>
								<p className={`mb-0 text-muted fs-5 ${validation.values.duration != 'Flexible' ? 'blur' : ''}`}>Keep the move-out date open for now</p>
							</div>
						</div>
					</Card>
				</Col>
				<Col lg={4}>
					<Card className={`card-height-100 cp ${validation.values.duration == 'Fixed' ? 'shadow-lg' : ''}`} onClick={() => validation.setFieldValue('duration', 'Fixed')}>
						<div className="d-flex">
							<div className="flex-grow-1 p-3">
								<h5 className={`mb-3 fs-4 fw-bold ${validation.values.duration != 'Fixed' ? 'blur' : ''}`}>Fixed</h5>
								<p className={`mb-0 text-muted fs-5 ${validation.values.duration != 'Fixed' ? 'blur' : ''}`}>Only available between specific dates</p>
							</div>
						</div>
					</Card>
				</Col>
				<Col lg={4}>
					<Card className={`card-height-100 cp ${validation.values.duration == 'Annual' ? 'shadow-lg' : ''}`} onClick={() => validation.setFieldValue('duration', 'Annual')}>
						<div className="d-flex">
							<div className="flex-grow-1 p-3">
								<h5 className={`mb-3 fs-4 fw-bold ${validation.values.duration != 'Annual' ? 'blur' : ''}`}>12 Months</h5>
								<p className={`mb-0 text-muted fs-5 ${validation.values.duration != 'Annual' ? 'blur' : ''}`}>An annual commitment is required</p>
							</div>
						</div>
					</Card>
				</Col>
				{validation.errors.duration ? <FormFeedback type="invalid">{validation.errors.duration}</FormFeedback> : null}
				<FormFeedback type="invalid">{validation.errors.duration}</FormFeedback>
			</Row>
			{validation.values.duration && (
				<Row>
					{validation.values.duration == 'Flexible' ? (
						<Col lg={4}>
							<ValidateInputDate label="Move in Date" validation={validation} name="moveOutDate" placeholder="Select move in date" />
						</Col>
					) : validation.values.duration == 'Fixed' ? (
						<>
							<Col lg={4}>
								<ValidateInputDate label="Start Date" validation={validation} name="startDate" placeholder="Select start date" />
							</Col>
							<Col lg={4}>
								<ValidateInputDate label="End Date" validation={validation} name="endDate" placeholder="Select end date" />
							</Col>
						</>
					) : (
						<Col lg={4}>
							<ValidateInputDate label="Commitment Date" validation={validation} name="commitmentDate" placeholder="Select commitment date" />
						</Col>
					)}
				</Row>
			)}
			<Row className="mt-3">
				<Col lg={8}>
					<ValidateInputDate label="Available Date" validation={validation} name="availableDate" placeholder="Select date" />
				</Col>
			</Row>
		</>
	);
};

export default Step2;
