import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

function Step1({ validation }) {
	return (
		<Row>
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-email-input">
						First Name
					</Label>
					<Input
						name="firstName"
						className="form-control"
						placeholder="Enter first name"
						type="text"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.firstName || ''}
						invalid={validation.touched.firstName && validation.errors.firstName ? true : false}
					/>
					{validation.touched.firstName && validation.errors.firstName ? <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback> : null}
				</div>
			</Col>
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-username-input">
						Middle Name
					</Label>
					<Input
						name="middleName"
						className="form-control"
						placeholder="Enter middle name (Otional)"
						type="text"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.middleName || ''}
					/>
				</div>
			</Col>
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-username-input">
						Last Name
					</Label>
					<Input
						name="lastName"
						className="form-control"
						placeholder="Enter last name"
						type="text"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.lastName || ''}
						invalid={validation.touched.lastName && validation.errors.lastName ? true : false}
					/>
					{validation.touched.lastName && validation.errors.lastName ? <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback> : null}{' '}
				</div>
			</Col>
			{validation.values.role == 'landlord' ? (
				<>
					<Col lg={6}>
						<div className="mb-3">
							<Label className="form-label">Title</Label>
							<Input
								name="title"
								className="form-control"
								placeholder="Enter last name"
								type="select"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.title || ''}
								invalid={validation.touched.title && validation.errors.title ? true : false}
							>
								<option value="Mr">Mr</option>
								<option value="Ms">Ms</option>
								<option value="Mrs">Mrs</option>
							</Input>
							{validation.touched.title && validation.errors.title ? <FormFeedback type="invalid">{validation.errors.title}</FormFeedback> : null}{' '}
						</div>
					</Col>
					<Col lg={6}>
						<div className="mb-3">
							<Label className="form-label">Business Name</Label>
							<Input
								name="businessName"
								className="form-control"
								placeholder="Business Name (Optional)"
								type="text"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.businessName || ''}
								invalid={validation.touched.businessName && validation.errors.businessName ? true : false}
							/>
							{validation.touched.businessName && validation.errors.businessName ? <FormFeedback type="invalid">{validation.errors.businessName}</FormFeedback> : null}{' '}
						</div>
					</Col>
				</>
			) : (
				''
			)}
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-email-input">
						Email
					</Label>
					<Input
						name="email"
						className="form-control"
						placeholder="Enter email"
						type="email"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.email || ''}
						invalid={validation.touched.email && validation.errors.email ? true : false}
					/>
					{validation.touched.email && validation.errors.email ? <FormFeedback type="invalid">{validation.errors.email}</FormFeedback> : null}
				</div>
			</Col>
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-password-input">
						Create a Password
					</Label>
					<Input
						name="password"
						className="form-control"
						placeholder="Enter password"
						type="password"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.password || ''}
						invalid={validation.touched.password && validation.errors.password ? true : false}
					/>
					{validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
				</div>
			</Col>
			<Col lg={6}>
				<div className="mb-3">
					<Label className="form-label" htmlFor="gen-info-email-input">
						Birthday
					</Label>
					<Input
						name="birthday"
						className="form-control"
						type="date"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						value={validation.values.birthday || ''}
						invalid={validation.touched.birthday && validation.errors.birthday ? true : false}
					/>
					{validation.touched.birthday && validation.errors.birthday ? <FormFeedback type="invalid">{validation.errors.birthday}</FormFeedback> : null}{' '}
				</div>
			</Col>
			{validation.values.role == 'landlord' ? (
				<>
					<Col lg={6}>
						<div className="mb-3">
							<Label className="form-label">
								Phone number
							</Label>
							<Input
								name="phoneNumber"
								className="form-control"
								placeholder="Enter phone number"
								type="text"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.phoneNumber || ''}
								invalid={validation.touched.phoneNumber && validation.errors.phoneNumber ? true : false}
							/>
							{validation.touched.phoneNumber && validation.errors.phoneNumber ? <FormFeedback type="invalid">{validation.errors.phoneNumber}</FormFeedback> : null}
						</div>
					</Col>
          <Col lg={6}>
						<div className="mb-3">
							<Label className="form-label">
								Company
							</Label>
							<Input
								name="company"
								className="form-control"
								placeholder="Enter company"
								type="text"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.company || ''}
								invalid={validation.touched.company && validation.errors.company ? true : false}
							/>
							{validation.touched.company && validation.errors.company ? <FormFeedback type="invalid">{validation.errors.company}</FormFeedback> : null}
						</div>
					</Col>
          <Col lg={6}>
						<div className="mb-3">
							<Label className="form-label">
								Number of tenancies
							</Label>
							<Input
								name="tenancies"
								className="form-control"
								placeholder="Enter no. of tenancies"
								type="number"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.tenancies || ''}
								invalid={validation.touched.tenancies && validation.errors.tenancies ? true : false}
							/>
							{validation.touched.tenancies && validation.errors.tenancies ? <FormFeedback type="invalid">{validation.errors.tenancies}</FormFeedback> : null}
						</div>
					</Col>
          <Col lg={6}>
					<div className="mb-3">
						<Label className="form-label">Role</Label>
						<Input
							type="select"
							className="form-control"
							name="landlordRole"
							value={validation.values.landlordRole}
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							invalid={validation.touched.landlordRole && !!validation.errors.landlordRole}
						>
							<option value="Director">Director</option>
							<option value="Owner">Owner</option>
							<option value="Property Manager">Property manager</option>
							<option value="Lettings Manager">Lettings manager</option>
							<option value="Finance">Finance</option>
							<option value="Other">Other</option>
						</Input>
						{validation.touched.landlordRole && validation.errors.landlordRole ? <FormFeedback type="invalid">{validation.errors.landlordRole}</FormFeedback> : null}
					</div>
				</Col>
				</>
			) : (
				<Col lg={6}>
					<div className="mb-3">
						<Label className="form-label">Gender</Label>
						<Input
							type="select"
							className="form-control"
							name="gender"
							value={validation.values.gender}
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							invalid={validation.touched.gender && !!validation.errors.gender}
						>
							<option value="Prefer not to say">Prefer not to say</option>
							<option value="Non-Binary">Non-Binary</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</Input>
						{validation.touched.gender && validation.errors.gender ? <FormFeedback type="invalid">{validation.errors.gender}</FormFeedback> : null}
					</div>
				</Col>
			)}
		</Row>
	);
}

export default Step1;
