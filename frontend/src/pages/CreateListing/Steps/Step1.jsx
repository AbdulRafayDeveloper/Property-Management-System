import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Label, Input, FormFeedback, Card } from 'reactstrap';

function Step1({ validation }) {
	const user = useSelector((s) => s.user).data;
	return (
		<div>
			<h4 className="fw-bold mb-4 text-center">How can we help?</h4>
			<div className="d-xl-flex justify-content-evenly gap-3 cp blur">
				<Card className={`card-height-100 ${validation.values.type == 'create' ? 'shadow-lg' : ''}`} onClick={() => validation.setFieldValue('type', 'create')}>
					<div className="d-flex">
						<div className="flex-grow-1 p-3">
							<h5 className={`mb-3 fs-4 fw-bold ${validation.values.type == 'find' ? 'blur' : ''}`}>List my empty room</h5>
							<p className={`mb-0 text-muted fs-5 ${validation.values.type == 'find' ? 'blur' : ''}`}>I am listing an available room for rent</p>
						</div>
					</div>
				</Card>
				{user?.isrenter && <Card className={`card-height-100 ${validation.values.type == 'find' ? 'shadow-lg' : ''}`} onClick={() => validation.setFieldValue('type', 'find')}>
					<div className="d-flex">
						<div className="flex-grow-1 p-3">
							<h5 className={`mb-3 fs-4 fw-bold ${validation.values.type == 'create' ? 'blur' : ''}`}>Find a new place</h5>
							<p className={`mb-0 text-muted fs-5 ${validation.values.type == 'create' ? 'blur' : ''}`}>I am looking for somewhere to live</p>
						</div>
					</div>
				</Card>}
			</div>
		</div>
	);
}

export default Step1;
