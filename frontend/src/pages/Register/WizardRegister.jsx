import React, { useEffect, useRef, useState } from 'react';
import { Form, Card, CardBody, CardHeader, Container, Row, Col, Label, Input, FormFeedback, Spinner, Popover, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';

import AuthSlider from '../AuthenticationInner/authCarousel';

import * as Yup from 'yup';
//Import images
import { loadAnimation } from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { ProgressBar } from 'react-bootstrap';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import Role from './Steps/Role';
import { toast } from 'react-toastify';
import { formdataToServer, patchToServer, postToServerNoToken } from '../../helpers/requests';
import { localItems } from '../../helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataR } from '../../slices/store/userSlice';

// register lottie and define custom element
defineElement(loadAnimation);

function WizardRegister() {
	const user = useSelector((s) => s.user).data;

	const [passwordShow, setPasswordShow] = useState(false);
	const navigate = useNavigate();
	const [popoverOpen, setPopoverOpen] = useState(false);
	const dispatch = useDispatch();
	const [step, setStep] = useState(user?.isDocumentUploaded == false ? 5 : 1);

	// Handling step transition and validation
	const nextStep = () => setStep((prevStep) => prevStep + 1);
	const prevStep = () => setStep((prevStep) => prevStep - 1);

	const [values, setValues] = useState({
		role: user?.isDocumentUploaded == false ? (user?.isLandlord ? 'landlord' : 'renter') : '',
		moveWithoutID: false,

		// step 1
		firstName: '',
		middleName: '',
		title: 'Mr',
		businessName: '',
		lastName: '',
		email: '',
		password: '',
		birthday: '',
		phoneNumber: '',
		company: '',
		tenancies: '',
		landlordRole: 'Director/Owner',
		gender: 'Prefer not to say',

		// step 2
		address: '',
		employment: 'Employed',
		schoolName: '',
		schoolYear: '',

		// step 3
		isEmailVerified: false,
		isEmailSent: false,

		// step 4
		profileImage: '',
		intro: '',
		IDImage: ''
	});

	const stepValidationSchemas = [
		Yup.object().shape({
			role: Yup.string().required('Role is required to proceed')
		}),
		Yup.object().shape({
			firstName: Yup.string().required('First name is required'),
			lastName: Yup.string().required('Last name is required'),
			email: Yup.string().email('Email is not valid').required('Email is required'),
			password: Yup.string()
				.min(8, 'Password must be at least 8 characters')
				.matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
				.matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
				.matches(RegExp('(.*[0-9].*)'), 'At least one number')
				.required('This field is required'),
			birthday: Yup.string().required('Birthday is required'),
			phoneNumber: Yup.string().when('role', (role, schema) => {
				if (role == 'landlord') return schema.required('Phone number is required');
				return schema;
			}),
			company: Yup.string().when('role', (role, schema) => {
				if (role == 'landlord') return schema.required('Company is required');
				return schema;
			}),
			tenancies: Yup.string().when('role', (role, schema) => {
				if (role == 'landlord') return schema.required('Number of tenancies required');
				return schema;
			})

			// movingType: Yup.array()
			//   .of(Yup.string().required('Each moving type is required'))
			//   .min(1, 'At least one removal type is required')
			//   .required('Moving type is required')
		}),
		Yup.object().shape({
			address: Yup.string().required('Address is required'),
			// city: Yup.string().required('City is required'),
			// state: Yup.string().required('State is required'),
			// zipCode: Yup.string().required('Zip code is required'),
			// country: Yup.string().required('Country is required'),
			employment: Yup.string().required('Employment is required'),
			schoolName: Yup.string().when('employment', (employment, schema) => {
				if (employment == 'Student') return schema.required('School name is required');
				return schema;
			}),
			schoolYear: Yup.string().when('employment', (employment, schema) => {
				if (employment == 'Student') return schema.required('School year is required');
				return schema;
			})
		}),
		Yup.object().shape({
			isEmailVerified: Yup.boolean().oneOf([true], 'Please verify your email to continue')
		}),
		Yup.object().shape({
			profileImage: Yup.mixed().required('Profile image is required'),
			// IDImage: Yup.mixed().required('Profile image is required'),
			IDImage: Yup.string().when('role', (role, schema) => {
				if (role == 'landlord') return schema.required('ID is required');
				return schema;
			}),
			intro: Yup.string().required('Introduction is required')
		})
	];

	const currentValidationSchema = stepValidationSchemas[step - 1];

	const goBack = () => {
		console.log(step, validation.values.role);
		if (validation.values.role == 'landlord' && step == 4) {
			setStep(step - 2);
		} else {
			setStep(step - 1);
		}
		validation.setTouched({});
		validation.setSubmitting(false);
	};

	const [emailLoading, setEmailLoading] = useState();
	const getBody = async (values) => {
		const body = {
			type: values.role,
			userDetails: {
				firstName: values.firstName,
				middleName: values.middleName,
				lastName: values.lastName,
				email: values.email,
				password: values.password,
				confirmPassword: values.password,
				birthdate: values.birthday,
				gender: values.gender
			},
			details: {}
		};
		if (values.role == 'landlord') {
			body.details = {
				title: values.title,
				businessName: values.businessName,
				phoneNumber: values.phoneNumber,
				company: values.company,
				numberOfTenancies: values.tenancies,
				role: values.landlordRole
			};
		} else {
			body.details = {
				currentAddress: values.address,
				employmentStatus: values.employment,
				schoolName: values.schoolName,
				schoolYear: values.schoolYear
			};
		}
		return body;
	};

	const handleSubmit = async (values, actions) => {
		console.log(step, values.role);
		if (step == 2 && values.role == 'landlord') {
			setEmailLoading(true);
			const body = await getBody(values);
			const result = await postToServerNoToken(`user/signup`, body);
			if (result.status) {
				setEmailLoading(false);
				setStep(step + 2);
				actions.setTouched({});
				actions.setSubmitting(false);
				validation.setFieldValue('isEmailSent', true);
				toast.success('User registered! Please check your email for code.');
				dispatch(setUserDataR(result.data.user));
				localStorage.setItem(localItems['token'], result.data.access);
				// navigate('/register/listing');
			} else {
				toast.error(result.message);
			}
			setEmailLoading(false);
		} else if (step == 3 && values.role == 'renter') {
			setEmailLoading(true);
			const body = await getBody(values);
			console.log(body);
			const result = await postToServerNoToken(`user/signup`, body);
			if (result.status) {
				setEmailLoading(false);
				setStep(step + 1);
				actions.setTouched({});
				actions.setSubmitting(false);
				validation.setFieldValue('isEmailSent', true);
				toast.success('User registered! Please check your email for code.');
				dispatch(setUserDataR(result.data.user));
				localStorage.setItem(localItems['token'], result.data.access);
			} else {
				toast.error(result.message);
			}
			setEmailLoading(false);
		} else if (step < 4) {
			setStep(step + 1);
			actions.setTouched({});
			actions.setSubmitting(false);
		} else {
			// submitting final documents
			console.log('first', values.moveWithoutID);
			if (!values.moveWithoutID) {
				if (values.role == 'renter') {
					if (!values.IDImage) {
						setPopoverOpen(true);
						return;
					}
				}
			}
			setEmailLoading(true);
			const formData = new FormData();
			formData.append('profileImage', values.profileImage);
			formData.append('photoId', values.IDImage);
			formData.append('description', values.intro);
			toast.info('Please wait while we are uploading');
			const result = await formdataToServer('update-user', 'PATCH', formData);
			if (result.status) {
				toast.success('Files uploaded successfully');
				dispatch(setUserDataR(result.data));
				navigate('/register/listing');
			} else {
				toast.error(result.message);
			}
			setEmailLoading(false);
		}
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: values,
		validationSchema: currentValidationSchema,
		onSubmit: handleSubmit
	});

	const emailVerification = () => {
		setStep(step + 1);
		validation.setTouched({});
		validation.setSubmitting(false);
	};

	const ref = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setPopoverOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	document.title = 'Register';

	return (
		<React.Fragment>
			<div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
				<div className="bg-overlay"></div>
				<div className="auth-page-content overflow-hidden pt-lg-5">
					<Container>
						<Row>
							<Col lg={12}>
								<Card className="overflow-hidden m-0">
									<Row className="justify-content-center g-0">
										<AuthSlider />

										<Col lg={6}>
											<div className="p-lg-5 p-4">
												<div>
													<h5 className="text-primary">Register Account</h5>
													<p className="text-muted">Get your Free Casper account now.</p>
												</div>

												<Form
													className="mt-4"
													onSubmit={(e) => {
														e.preventDefault();
														validation.handleSubmit();
														return false;
													}}
													action="#"
												>
													{step == 1 && <Role validation={validation} />}
													{step == 2 && <Step1 validation={validation} />}
													{step == 3 && <Step2 validation={validation} />}
													{step == 4 && <Step3 validation={validation} emailVerification={emailVerification} />}
													{step == 5 && <Step4 validation={validation} />}

													<div className="d-flex gap-2">
														{user?.isVerified ||
															(!validation.values.isEmailSent && step > 1 && (
																<button type="button" onClick={goBack} className="btn btn-outline-success w-100 mt-4 fw-bold">
																	<FaArrowLeftLong className="me-1" /> Go back
																</button>
															))}
														<button id="PopoverTop" type="submit" disabled={emailLoading} className="btn d-flex gap-2 justify-content-center align-items-center btn-success w-100 mt-4 fw-bold">
															{emailLoading && <Spinner size="sm" />}
															{step === 5 ? 'Submit' : step == 3 || (step == 2 && validation.values.role == 'landlord') ? 'Register and verify' : 'Proceed to next step'}
															<FaArrowRightLong />
														</button>
														<div>
															<Popover placement="top" target="PopoverTop" isOpen={popoverOpen}>
																<PopoverHeader>Warning</PopoverHeader>
																<PopoverBody>
																	<b>Verify</b> your account to let others know you're serious about your housing search. Some renters prefer to talk to only verified users. Non-verified accounts will
																	not be able to create listings.
																	<p
																		className="text-primary text-decoration-underline cp mt-2"
																		ref={ref}
																		onClick={(e) => {
																			e.preventDefault();
																			e.stopPropagation();
																			validation.setFieldValue('moveWithoutID', true);
																			setPopoverOpen(false);
																		}}
																	>
																		I want to continue without uploading ID
																	</p>
																</PopoverBody>
															</Popover>
														</div>
													</div>
												</Form>

												<div className="mt-5 text-center">
													{user?.isVerified ? (
														<p className="mb-0 cp">
															<span className="fw-semibold text-primary text-decoration-underline"> Logout</span>{' '}
														</p>
													) : (
														<p className="mb-0">
															Already have an account ?{' '}
															<Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline">
																{' '}
																Signin
															</Link>{' '}
														</p>
													)}
												</div>
											</div>
										</Col>
									</Row>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>

				<footer className="footer">
					<Container>
						<div className="row">
							<div className="col-lg-12">
								<div className="text-center">
									<p className="mb-0">
										{new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
									</p>
								</div>
							</div>
						</div>
					</Container>
				</footer>
			</div>
		</React.Fragment>
	);
}

export default WizardRegister;
