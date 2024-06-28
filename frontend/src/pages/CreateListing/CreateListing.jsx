import React, { useState } from 'react';
import { Form, Card, CardBody, CardHeader, Container, Row, Col, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';

import AuthSlider from '../AuthenticationInner/authCarousel';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';
import logoLight from '../../assets/images/logoBlue.png';

import * as Yup from 'yup';
//Import images
import { loadAnimation } from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { ProgressBar } from 'react-bootstrap';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Step5 from './Steps/Step5';
import { useSelector } from 'react-redux';
import { formdataToServer } from '../../helpers/requests';
import { toast } from 'react-toastify';

// register lottie and define custom element
defineElement(loadAnimation);

function CreateListing() {
	const [passwordShow, setPasswordShow] = useState(false);
	const user = useSelector((s) => s.user).data;
	const navigate = useNavigate();

	const [step, setStep] = useState(1);

	// Handling step transition and validation
	const nextStep = () => setStep((prevStep) => prevStep + 1);
	const prevStep = () => setStep((prevStep) => prevStep - 1);

	const [values, setValues] = useState({
		// step 1
		type: 'create', // find or create

		// step 2
		address: '',
		monthlyRent: '',
		deposit: '',
		duration: 'Flexible',
		availableDate: '',
		// duratiion change inputs
		moveOutDate: '',
		startDate: '',
		endDate: '',
		commitmentDate: '',

		// step 3
		bedrooms: '',
		bathrooms: '',
		spaceKind: 'Entire Place',
		propertyKind: 'House',

		// step 4
		amenities: { inTheHome: [], onTheProperty: [], safety: [] },

		// step 5
		description: '',
		openListing: true,
		images: []
	});

	const amenitiesSchema = Yup.object()
		.shape({
			inTheHome: Yup.array().of(Yup.string()),
			onTheProperty: Yup.array().of(Yup.string()),
			safety: Yup.array().of(Yup.string())
		})
		.test('at-least-one', 'At least one amenity must be selected from any of the categories', (amenities) => {
			return (
				(amenities['inTheHome'] && amenities['inTheHome'].length > 0) || (amenities['onTheProperty'] && amenities['onTheProperty'].length > 0) || (amenities.safety && amenities.safety.length > 0)
			);
		});

	const stepValidationSchemas = [
		Yup.object().shape({
			type: Yup.string().required('Type is required')
		}),
		Yup.object().shape({
			address: Yup.string().required('Address is required'),
			monthlyRent: Yup.string().required('Monthly rent is required'),
			duration: Yup.string().required('Duration is required'),
			moveOutDate: Yup.string().when('duration', (duration, schema) => {
				if (duration == 'flexible') {
					return schema.required('Move-out date is required');
				}
				return schema;
			}),
			startDate: Yup.string().when('duration', (duration, schema) => {
				if (duration == 'fixed') {
					return schema.required('Start date is required');
				}
				return schema;
			}),
			endDate: Yup.string().when('duration', (duration, schema) => {
				if (duration == 'fixed') {
					return schema.required('End date is required');
				}
				return schema;
			}),
			commitmentDate: Yup.string().when('duration', (duration, schema) => {
				if (duration == '12Months') {
					return schema.required('Commitment date is required');
				}
				return schema;
			}),
			availableDate: Yup.string().required('Available date is required')
		}),
		Yup.object().shape({
			bedrooms: Yup.string().required('Bedroom is required'),
			bathrooms: Yup.string().required('Bathroom is required')
		}),
		Yup.object().shape({
			amenities: amenitiesSchema
		}),
		Yup.object().shape({
			description: Yup.string().required('Description is required'),
			images: Yup.array()
				.of(
					Yup.mixed().test('fileType', 'Only image files are allowed', function (value) {
						if (!value) return true; // Allow empty values (optional images)

						if (Array.isArray(value)) {
							// Handle array of files (e.g., from multiple file inputs)
							return value.every((file) => file && file.type && file.type.startsWith('image/'));
						} else {
							// Handle single file
							return value.type && value.type.startsWith('image/');
						}
					})
				)
				.min(3, 'At least 3 images are required')
		})
	];

	const currentValidationSchema = stepValidationSchemas[step - 1];

	const goBack = () => {
		setStep(step - 1);
		validation.setTouched({});
		validation.setSubmitting(false);
	};

	const [emailLoading, setEmailLoading] = useState();
	const handleVerifyEmail = async (actions) => {
		setEmailLoading(true);
		// call api
		setTimeout(() => {
			setEmailLoading(false);
			setStep(step + 1);
			actions.setTouched({});
			actions.setSubmitting(false);
		}, 2000);
	};

	const handleSubmit = async (values, actions) => {
		if (!user?.isIdUploaded) {
			toast.error(
				<div>
					Go to{' '}
					<a href="/settings" style={{ textDecoration: 'underline' }} rel="noopener noreferrer">
						settings
					</a>
					. and upload your ID first to start creating listings
				</div>
			);
			return;
		}
		if (step < 5) {
			setStep(step + 1);
			actions.setTouched({});
			actions.setSubmitting(false);
		} else {
			setEmailLoading(true);

			const formData = new FormData();
			formData.append('address', values.address);
			formData.append('monthlyRent', values.monthlyRent);
			formData.append('deposit', values.deposit);
			formData.append('duration', values.duration);
			formData.append('availableDate', values.availableDate);
			formData.append('moveOutDate', values.moveOutDate);
			formData.append('startDate', values.startDate);
			formData.append('endDate', values.endDate);
			formData.append('commitmentDate', values.commitmentDate);
			formData.append('bedrooms', values.bedrooms);
			formData.append('bathrooms', values.bathrooms);
			formData.append('spaceType', values.spaceKind);
			formData.append('propertyType', values.propertyKind);
			formData.append('amenities', JSON.stringify(values.amenities));
			formData.append('description', values.description);
			formData.append('openListing', values.openListing);
			
			for (let i = 0; i < values.images.length; i++) {
				formData.append('photos', values.images[i]);
			}
			toast.info('Please wait while we are creating your lising.');
			const result = await formdataToServer('create-listing', 'POST', formData);
			if (result.status) {
				toast.success('Listing created successfully');
				navigate('/dashboard');
			} else {
				toast.error(result.message);
			}

			// setTimeout(() => {
			// 	setEmailLoading(false);
			// 	navigate('/properties');
			// }, 2000);
		}
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: values,
		validationSchema: currentValidationSchema,
		onSubmit: handleSubmit
	});

	document.title = 'Wizard';

	return (
		<React.Fragment>
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mt-sm-5 mb-4 text-white-50">
									<div>
										<Link to="/" className="d-inline-block auth-logo">
											<img src={logoLight} alt="" height="100" />
										</Link>
									</div>
								</div>
							</Col>
						</Row>

						<Row>
							<Col md={2} lg={6} xl={2}></Col>
							<Col md={8} lg={6} xl={8}>
								<Card className="mt-4">
									<CardBody className="p-4">
										<Form
											className="mt-4"
											onSubmit={(e) => {
												e.preventDefault();
												validation.handleSubmit();
												return false;
											}}
											action="#"
										>
											{step == 1 && <Step1 validation={validation} />}
											{step == 2 && <Step2 validation={validation} />}
											{step == 3 && <Step3 validation={validation} />}
											{step == 4 && <Step4 validation={validation} />}
											{step == 5 && <Step5 validation={validation} />}

											<div className="d-flex gap-2">
												{!validation.values.isEmailVerified && step > 1 && (
													<button type="button" onClick={goBack} className="btn btn-outline-success w-100 mt-4 fw-bold">
														<FaArrowLeftLong className="me-1" /> Go back
													</button>
												)}

												<button type="submit" disabled={emailLoading} className="btn d-flex gap-2 justify-content-center align-items-center btn-success w-100 mt-4 fw-bold">
													{emailLoading && <Spinner size="sm" />}
													{step === 5 ? 'Submit' : 'Proceed to next step'}
													<FaArrowRightLong />
												</button>
											</div>
										</Form>
									</CardBody>
								</Card>
							</Col>
							<Col md={2} lg={6} xl={2}></Col>
						</Row>
					</Container>
				</div>
			</ParticlesAuth>
		</React.Fragment>
	);
}

export default CreateListing;
