import { Link } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback, Card, CardHeader } from 'reactstrap';
import './steps.scss';

const Role = ({ validation }) => {
	return (
		<Row>
			<h3 className="text-center mb-4">What is your Role?</h3>
			<Col lg={6}>
				<Card className={`card-overlay cp ${validation.values.role == 'landlord' ? 'role__active' : ''}`} onClick={() => validation.setFieldValue('role', 'landlord')}>
					<img className="card-img img-fluid" src={'https://www.theguarantors.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsign-up-operator.e4090c42.webp&w=828&q=70'} alt="Card" />
					<div className="bg-overlay"></div>
					<div className="card-img-overlay p-0 d-flex flex-column">
						<div className="card-footer d-flex h-100 justify-content-center align-items-end bg-transparent text-center">
							<h1 className="text-white fs-bold fs-1">Landlord</h1>
						</div>
					</div>
				</Card>
			</Col>
			<Col lg={6}>
				<Card className={`card-overlay cp ${validation.values.role == 'renter' ? 'role__active' : ''}`} onClick={() => validation.setFieldValue('role', 'renter')}>
					<img className="card-img img-fluid" src={'https://www.theguarantors.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsign-up-renter.dd173568.webp&w=1920&q=70'} alt="Card" />
					<div className="bg-overlay"></div>
					<div className="card-img-overlay p-0 d-flex flex-column">
						<div className="card-footer d-flex h-100 justify-content-center align-items-end bg-transparent text-center">
							<h1 className="text-white fs-bold fs-1">Renter</h1>
						</div>
					</div>
				</Card>
			</Col>
			{validation.touched.role && validation.errors.role ? <span className="text-danger fs-5">{validation.errors.role}</span> : null}
		</Row>
	);
};

export default Role;
