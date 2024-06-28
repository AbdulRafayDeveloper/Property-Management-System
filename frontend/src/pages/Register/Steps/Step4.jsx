import React, { useState } from 'react';
import { Label, Input, Row, Col, FormFeedback, Alert } from 'reactstrap';

const Step4 = ({ validation }) => {
	// State to hold the current image URLs for display
	const [imageSrc1, setImageSrc1] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');

	// Handler function for when a new image is uploaded for the first image
	const handleImageChange1 = (event) => {
		if (event.target.files && event.target.files[0]) {
			validation.setFieldValue('profileImage', event.target.files[0]);
			const reader = new FileReader();

			reader.onload = function (e) {
				setImageSrc1(e.target.result); // Set the loaded file as imageSrc1
			};

			reader.readAsDataURL(event.target.files[0]);
		}
	};

	return (
		<>
			<div>
				<Alert>Please upload following, So we can verify your presence</Alert>
			</div>
			<Row>
				<Col lg={3}>
					<div className="profile-user position-relative d-inline-block mx-auto mb-4">
						<img src={imageSrc1} className="rounded-circle avatar-lg img-thumbnail user-profile-image" alt="user-profile" />
						<div className="avatar-xs p-0 rounded-circle profile-photo-edit">
							<Input id="profile-img-file-input-1" type="file" className="profile-img-file-input" onChange={handleImageChange1} />
							<Label htmlFor="profile-img-file-input-1" className="profile-photo-edit avatar-xs">
								<span className="avatar-title rounded-circle bg-light text-body">
									<i className="ri-camera-fill"></i>
								</span>
							</Label>
						</div>
					</div>
				</Col>
				<Col lg={8}>
					<textarea
						name="intro"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.intro || ''}
						rows={4}
						placeholder="Introduce yourself: Briefly describe your situation and who you are "
						className="form-control mt-1"
					></textarea>
				</Col>
			</Row>

			<Label className="form-label">Upload ID</Label>
			<Input
				type="file"
				className="form-control"
				name="IDImage"
				onChange={(e) => validation.setFieldValue('IDImage', e.target.files[0])}
				onBlur={validation.handleBlur}
				invalid={validation.touched.IDImage && validation.errors.IDImage ? true : false}
			/>
      <div className='mt-2'>
			{validation.touched.IDImage && validation.errors.IDImage ? <><span className="text-danger">{validation.errors.IDImage}</span><br/></> : null}
			{validation.touched.profileImage && validation.errors.profileImage ? <><span className="text-danger">{validation.errors.profileImage}</span><br/></> : null}
			{validation.touched.intro && validation.errors.intro ? <span className="text-danger">{validation.errors.intro}</span> : null}
      </div>
		</>
	);
};

export default Step4;
