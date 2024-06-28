import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback, Card, Button } from 'reactstrap';
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';

function Step5({ validation }) {
	const user = useSelector((s) => s.user).data;

	const [selectedFiles, setselectedFiles] = useState([]);

	const handleAcceptedFiles = (files) => {
		const mappedFiles = files.map((file) => ({
			...file,
            name: file.name,
			preview: URL.createObjectURL(file),
			formattedSize: formatBytes(file.size)
		}));
		setselectedFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
		validation.setFieldValue('images', [...validation.values.images, ...files]);
	};

	const removeFile = (index) => {
		const newFiles = selectedFiles.filter((_, i) => i !== index);
		setselectedFiles(newFiles);

		// Update Formik's images field with the correct File objects
		const newFileObjects = newFiles.map((file) => file.originFileObj);
		validation.setFieldValue('images', newFileObjects);
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
		<div>
			<h5 className={`mb-4 fs-2 fw-bold`}>Listing description</h5>
			<div>
				<span className="text-muted">What re you looking for?</span> <br />
				<span className="text-muted">What's a typical day like living here?</span>
				<textarea
					className={`form-control mt-3 ${validation.touched.description && validation.errors.description ? 'is-invalid' : ''}`}
					placeholder="Description"
					name="description"
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					value={validation.values.description || ''}
				></textarea>
				{validation.touched.description && validation.errors.description ? <FormFeedback>{validation.errors.description}</FormFeedback> : null}
			</div>
			{user?.isLandlord && (
				<div className="mt-4">
					<div class="form-check">
						<label class="form-check-label">
							<input type="checkbox" class="form-check-input" name="openListing" checked={validation.values.openListing} onChange={(e)=>validation.setFieldValue('openListing', e.target.checked)} />
							Open this listing also for users without ID verification?
						</label>
					</div>
				</div>
			)}
			<div>
				<h5 className={`mb-1 mt-5 fs-2 fw-bold`}>Show off your place</h5>
				<div>
					<p className="text-muted">Include atleast three photos</p>

					<Input
						type="file"
						accept="image/*"
						className="d-none"
						name="images"
						onChange={(e) => validation.setFieldValue('images', e.target.files)}
						onBlur={validation.handleBlur}
						invalid={validation.touched.images && validation.errors.images ? true : false}
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
					{validation.touched.images && validation.errors.images ? <FormFeedback>{validation.errors.images}</FormFeedback> : null}
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
			</div>
		</div>
	);
}

export default Step5;
