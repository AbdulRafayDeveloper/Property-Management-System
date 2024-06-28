import React, { useState } from 'react';
import { Button, Card, Col, Form, FormFeedback, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import { Pagination, Navigation, Scrollbar, EffectFade, EffectCreative, Mousewheel, EffectFlip, EffectCoverflow, Autoplay } from 'swiper';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import ValidateInputDate from '../../../Components/Common/ValidateInputDate';
import ValidateInput from '../../../Components/Common/ValidateInput';
import Dropzone from 'react-dropzone';
import { formatBytes } from '../../../helpers/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formdataToServer } from '../../../helpers/requests';

function ApplicationModal({ data, open, handleClose }) {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		moveIn: '',
		moveOut: '',
		monthlyIncome: '',
		lastLandlordfirstName: '',
		lastLandlordlastName: '',
		lastLandlordemail: '',
		lastLandlordphone: '',
		coApplicantfirstName: '',
		coApplicantlastName: '',
		coApplicantemail: '',
		coApplicantphone: '',
		description: '',

		student: false,
		proofOfEarnings: [],
		workConfirmation: [],
		uniConfirmation: [],
		guarantorLetter: [],
		referenceLetter: []
	});

	const validationSchema = Yup.object().shape({
		moveIn: Yup.string().required('Move-in date is required'),
		moveOut: Yup.string().required('Move-out date is required'),
		monthlyIncome: Yup.number().required('Monthly income is required').positive('Must be a positive number'),
		lastLandlordfirstName: Yup.string().required('First name is required'),
		lastLandlordlastName: Yup.string().required('Last name is required'),
		lastLandlordemail: Yup.string().email('Invalid email').required('Email is required'),
		lastLandlordphone: Yup.string().required('Phone is required'),
		student: Yup.boolean().oneOf([true, false], ''),
		description: Yup.string().required('Description is required'),
		// files
		proofOfEarnings: Yup.array().min(2, 'Select at least two files'),
		workConfirmation: Yup.array().min(1, 'Select at least one file'),
		// uniConfirmation: Yup.array()
		// 	.when('student', (student, schema) => {
		// 		if (student) {
		// 			return schema.required('Select at least one file').min(1, 'Select at least one file');
		// 		}
		// 		return schema;
		// 	}),
		// guarantorLetter: Yup.array()
		// 	.when('student', (student, schema) => {
		// 		if (student) {
		// 			return schema.required('Select at least one file').min(1, 'Select at least one file');
		// 		}
		// 		return schema;
		// 	}),
		referenceLetter: Yup.array().min(1, 'Select at least one file')
	});

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		setLoading(true);
		toast.info('Please wait while you application is submitted');
		console.log(values);
		const formData = new FormData();
		formData.append('moveInDate', values.moveIn);
		formData.append('moveOutDate', values.moveOut);
		formData.append('monthlyIncome', values.monthlyIncome);
		formData.append(
			'currentLandlord',
			JSON.stringify({
				name: values.lastLandlordfirstName + ' ' + values.lastLandlordlastName,
				phone: values.lastLandlordphone,
				email: values.lastLandlordemail
			})
		);
		formData.append(
			'coApplicant',
			JSON.stringify({
				name: values.coApplicantfirstName + ' ' + values.coApplicantlastName,
				phone: values.coApplicantphone,
				email: values.coApplicantemail
			})
		);
		formData.append('introduction', values.description);
		formData.append('isStudent', values.student);
		formData.append('amenities', JSON.stringify(values.amenities));

		const files = {
			proofOfEarnings: values.proofOfEarnings,
			workConfirmation: values.workConfirmation,
			uniConfirmation: values.uniConfirmation,
			guarantorLetter: values.guarantorLetter,
			referenceLetter: values.referenceLetter
		};

		Object.keys(files).forEach((key) => {
			files[key].forEach((file) => {
				formData.append(key, file);
			});
		});

		const result = await formdataToServer(`submit-application/${data._id}`, 'POST', formData);
		if (result.status) {
			toast.success('Application submitted successfully');
			handleClose()
			// navigate('/application');
		} else {
			toast.error(result.message);
		}
		setLoading(false);

		// setTimeout(() => {
		// 	navigate('/application')
		// }, 4000);
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: values,
		validationSchema: validationSchema,
		onSubmit: handleSubmit
	});

	return (
		<div>
			<Modal
				isOpen={open}
				toggle={() => {
					handleClose();
				}}
			>
				<ModalHeader
					className="modal-title"
					toggle={() => {
						handleClose();
					}}
				>
					Application
				</ModalHeader>
				<ModalBody>
					<div>
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							pagination={{ clickable: true }}
							navigation={true}
							loop={true}
							autoplay={{ delay: 2500, disableOnInteraction: false }}
							className="mySwiper swiper navigation-swiper rounded"
						>
							<div className="swiper-wrapper">
								{data?.photos?.map((d) => {
									return (
										<SwiperSlide>
											<img src={d} alt="" className="object-fit-contain card-img-top" height="180" />
										</SwiperSlide>
									);
								})}
							</div>
						</Swiper>
					</div>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validation.handleSubmit();
							return false;
						}}
						action="#"
						className="mt-4"
					>
						<div className="row g-3">
							<Col xxl={6}>
								<ValidateInputDate label={'Move-in'} validation={validation} name={'moveIn'} placeholder={'Move-in date'} />
							</Col>
							<Col xxl={6}>
								<ValidateInputDate label={'Move-out'} validation={validation} name={'moveOut'} placeholder={'Move-out date'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput type="number" label={'Monthly Income'} validation={validation} name={'monthlyIncome'} placeholder={'$'} />
							</Col>
							<div>
								<h5>Last Landlord</h5>
							</div>
							<Col xxl={6}>
								<ValidateInput label={'First Name'} validation={validation} name={'lastLandlordfirstName'} placeholder={'Enter first name'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput label={'Last Name'} validation={validation} name={'lastLandlordlastName'} placeholder={'Enter last name'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput type="email" label={'Email'} validation={validation} name={'lastLandlordemail'} placeholder={'Enter email'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput label={'Phone'} validation={validation} name={'lastLandlordphone'} placeholder={'Enter phone'} />
							</Col>
							<div>
								<h5>Co Applicant (If applicable)</h5>
							</div>
							<Col xxl={6}>
								<ValidateInput label={'First Name'} validation={validation} name={'coApplicantfirstName'} placeholder={'Enter first name'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput label={'Last Name'} validation={validation} name={'coApplicantlastName'} placeholder={'Enter last name'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput type="email" label={'Email'} validation={validation} name={'coApplicantemail'} placeholder={'Enter email'} />
							</Col>
							<Col xxl={6}>
								<ValidateInput label={'Phone'} validation={validation} name={'coApplicantphone'} placeholder={'Enter phone'} />
							</Col>
							<Col xxl={12}>
								<label>Intro</label>
								<textarea
									className={`form-control ${validation.touched.description && validation.errors.description ? 'is-invalid' : ''}`}
									placeholder="Introduce yourself"
									name="description"
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									value={validation.values.description || ''}
								></textarea>
								{validation.touched.description && validation.errors.description ? <FormFeedback>{validation.errors.description}</FormFeedback> : null}{' '}
							</Col>
							<Col>
								<div className="d-flex gap-2">
									<Input
										name="student"
										type="checkbox"
										onChange={validation.handleChange}
										onBlur={validation.handleBlur}
										value={validation.values.student}
										invalid={validation.touched.student && validation.errors.student ? true : false}
									/>
									<label htmlFor="student">Are you a student?</label>
								</div>
							</Col>

							<Col xxl={12}>
								<h5>Upload</h5>

								<label>
									<>1. Proof of earning (The most recent 2 months pay slip)</>
								</label>
								<Input
									multiple
									name={'proofOfEarnings'}
									className="form-control"
									type={'file'}
									onChange={(event) => validation.setFieldValue('proofOfEarnings', Array.from(event.target.files))}
									onBlur={validation.handleBlur}
									invalid={validation.touched.proofOfEarnings && validation.errors.proofOfEarnings ? true : false}
								/>
								{validation.touched.proofOfEarnings && validation.errors.proofOfEarnings ? <FormFeedback type="invalid">{validation.errors.proofOfEarnings}</FormFeedback> : null}
							</Col>
							<Col xxl={12}>
								<label>
									<>2. Work confirmation / acceptance letter</>
								</label>
								<Input
									name={'workConfirmation'}
									className="form-control"
									type={'file'}
									onChange={(event) => validation.setFieldValue('workConfirmation', Array.from(event.target.files))}
									onBlur={validation.handleBlur}
									invalid={validation.touched.workConfirmation && validation.errors.workConfirmation ? true : false}
								/>
								{validation.touched.workConfirmation && validation.errors.workConfirmation ? <FormFeedback type="invalid">{validation.errors.workConfirmation}</FormFeedback> : null}
							</Col>
							<Col xxl={12}>
								<label>
									<>3. Reference letter from previous landlord / Proof of rental history</>
								</label>
								<Input
									name={'referenceLetter'}
									className="form-control"
									type={'file'}
									onChange={(event) => validation.setFieldValue('referenceLetter', Array.from(event.target.files))}
									onBlur={validation.handleBlur}
									invalid={validation.touched.referenceLetter && validation.errors.referenceLetter ? true : false}
								/>
								{validation.touched.referenceLetter && validation.errors.referenceLetter ? <FormFeedback type="invalid">{validation.errors.referenceLetter}</FormFeedback> : null}
							</Col>
							{validation.values.student && (
								<>
									<Col xxl={12}>
										<label>
											<>4. Uni acceptance or confirmation letter</>
										</label>
										<Input
											name={'uniConfirmation'}
											className="form-control"
											type={'file'}
											onChange={(event) => validation.setFieldValue('uniConfirmation', Array.from(event.target.files))}
											onBlur={validation.handleBlur}
											invalid={validation.touched.uniConfirmation && validation.errors.uniConfirmation ? true : false}
										/>
										{validation.touched.uniConfirmation && validation.errors.uniConfirmation ? <FormFeedback type="invalid">{validation.errors.uniConfirmation}</FormFeedback> : null}
									</Col>
									<Col xxl={12}>
										<label>
											<>5. Guarantor letter from their guardian</>
										</label>
										<Input
											name={'guarantorLetter'}
											className="form-control"
											type={'file'}
											onChange={(event) => validation.setFieldValue('guarantorLetter', Array.from(event.target.files))}
											onBlur={validation.handleBlur}
											invalid={validation.touched.guarantorLetter && validation.errors.guarantorLetter ? true : false}
										/>
										{validation.touched.guarantorLetter && validation.errors.guarantorLetter ? <FormFeedback type="invalid">{validation.errors.guarantorLetter}</FormFeedback> : null}
									</Col>
								</>
							)}
							<Col lg={12}>
								<div className="hstack gap-2 justify-content-end">
									<Button color="light" onClick={handleClose}>
										Close
									</Button>
									<Button color="primary" type="submit">
										Submit
									</Button>
								</div>
							</Col>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default ApplicationModal;
