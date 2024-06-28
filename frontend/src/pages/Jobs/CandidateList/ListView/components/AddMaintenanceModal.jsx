import { Link } from 'feather-icons-react/build/IconComponents';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Form, FormFeedback, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import ValidateInput from '../../../../../Components/Common/ValidateInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ValidateInputDate from '../../../../../Components/Common/ValidateInputDate';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { formdataToServer } from '../../../../../helpers/requests';

function AddMaintenanceModal({ open, handleClose, listingId }) {
	const [values, setValues] = useState({
		name: '',
		location: '',
		description: '',
		priority: '',
		dueDate: '',
		photos: []
	});

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		location: Yup.string().required('Location is required'),
		description: Yup.string().required('Description is required'),
		priority: Yup.string().required('Priority is required'),
		dueDate: Yup.string().required('Due date is required'),
		photos: Yup.array()
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
	});

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		setLoading(true);
		toast.info('Please wait while you maintenance request is being submitted');
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('location', values.location);
		formData.append('description', values.description);
		formData.append('priority', values.priority);
		formData.append('dueDate', values.dueDate);

		const files = {
			photos: values.photos
		};

		Object.keys(files).forEach((key) => {
			files[key].forEach((file) => {
				formData.append(key, file);
			});
		});

		const result = await formdataToServer(`maintenance-request/${listingId}`, 'POST', formData);
		if (result.status) {
			toast.success('Maintenance request submitted successfully');
			handleClose();
		} else {
			toast.error(result.message);
		}
		setLoading(false);
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: values,
		validationSchema: validationSchema,
		onSubmit: handleSubmit
	});

	const [selectedFiles, setselectedFiles] = useState([]);

	const handleAcceptedFiles = (files) => {
		const mappedFiles = files.map((file) => ({
			...file,
			name: file.name,
			preview: URL.createObjectURL(file),
			formattedSize: formatBytes(file.size)
		}));
		setselectedFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
		validation.setFieldValue('photos', [...validation.values.photos, ...files]);
	};

	const removeFile = (index) => {
		const newFiles = selectedFiles.filter((_, i) => i !== index);
		setselectedFiles(newFiles);

		// Update Formik's images field with the correct File objects
		const newFileObjects = newFiles.map((file) => file.originFileObj);
		validation.setFieldValue('photos', newFileObjects);
	};

	/**
	 * Formats the size
	 */
	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	return (
		<Modal
			id="signupModals"
			tabIndex="-1"
			isOpen={open}
			toggle={() => {
				handleClose();
			}}
			centered
		>
			<ModalHeader
				className="p-3"
				toggle={() => {
					handleClose();
				}}
			>
				Maintenance Request
			</ModalHeader>
			<Alert color="success" className="rounded-0 mb-0">
				<p className="mb-0">
					Add <span className="fw-semibold">Request</span> for maintenance here.
				</p>
			</Alert>
			<ModalBody>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
					action="#"
				>
					<div className="row g-3">
						<div className="col-12">
							<label>Upload photos (Optional)</label>
							<Input
								type="file"
								accept="image/*"
								className="d-none"
								name="photos"
								onChange={(e) => validation.setFieldValue('photos', e.target.files)}
								onBlur={validation.handleBlur}
								invalid={validation.touched.photos && validation.errors.photos ? true : false}
							/>
							<Dropzone
								onDrop={(acceptedFiles) => {
									handleAcceptedFiles(acceptedFiles);
								}}
								accept="image/*"
							>
								{({ getRootProps, getInputProps }) => (
									<div className="dropzone dz-clickable">
										<div className="dz-message needsclick" {...getRootProps()}>
											{/* <input {...getInputProps()} /> */}
											<div className="mb-3">
												<i className="display-4 text-muted ri-upload-cloud-2-fill" />
											</div>
											<h4>Drop files here or click to upload.</h4>
										</div>
									</div>
								)}
							</Dropzone>
							{validation.touched.photos && validation.errors.photos ? <FormFeedback>{validation.errors.photos}</FormFeedback> : null}
							<div className="list-unstyled mb-0" id="file-previews">
								{selectedFiles.map((f, i) => {
									return (
										<Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete" key={i + '-file'}>
											<div className="p-2">
												<Row className="align-items-center">
													<Col className="col-auto">
														<img data-dz-thumbnail="" height="80" className="avatar-sm rounded bg-light" alt={f.name} src={f.preview} />
													</Col>
													<Col>
														<span className="text-muted font-weight-bold">{f.name}</span>
														<p className="mb-0">
															<strong>{f.formattedSize}</strong>
														</p>
													</Col>
													<Col className="col-auto">
														<Button color="danger" onClick={() => removeFile(i)}>
															Remove
														</Button>
													</Col>
												</Row>
											</div>
										</Card>
									);
								})}
							</div>
						</div>
						<div className="col-12">
							<ValidateInput label={'Name'} validation={validation} name={'name'} placeholder={'Enter name'} />
						</div>
						<div className="col-12">
							<ValidateInput label={'Location'} validation={validation} name={'location'} placeholder={'Enter location'} />
						</div>
						<div className="col-md-6">
							<ValidateInput type="select" label={'Priority'} validation={validation} name={'priority'} placeholder={'Select Priority'}>
								<option value="Urgent">Urgent</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</ValidateInput>
						</div>
						<div className="col-md-6">
							<ValidateInputDate label={'Due date'} validation={validation} name={'dueDate'} placeholder={'Due date'} />
						</div>
						<div className="col-12">
							<label>Description</label>
							<textarea
								className={`form-control ${validation.touched.description && validation.errors.description ? 'is-invalid' : ''}`}
								placeholder="Description"
								name="description"
								onChange={validation.handleChange}
								onBlur={validation.handleBlur}
								value={validation.values.description || ''}
							></textarea>
							{validation.touched.description && validation.errors.description ? <FormFeedback>{validation.errors.description}</FormFeedback> : null}{' '}
						</div>

						<div className="col-12">
							<div className="hstack gap-2 justify-content-end">
								<Button color="light" onClick={handleClose}>
									Close
								</Button>
								<Button color="primary" type="submit">
									Submit
								</Button>
							</div>
						</div>
					</div>
				</Form>
			</ModalBody>
		</Modal>
	);
}

export default AddMaintenanceModal;
