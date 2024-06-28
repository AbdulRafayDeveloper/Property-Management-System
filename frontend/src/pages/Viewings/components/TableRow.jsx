import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Row, UncontrolledDropdown } from 'reactstrap';
import { viewingBadge, downloadFile, formatDate } from '../../../helpers/utils';
import { patchToServer, putToServer } from '../../../helpers/requests';
import { toast } from 'react-toastify';
import ValidateInputDate from '../../../Components/Common/ValidateInputDate';
import ValidateInputTime from '../../../Components/Common/ValidateInputTime';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function TableRow({ data }) {
	const [row, setRow] = useState({ ...data });
	const [show, setShow] = useState(false);
	const [reshedule, setReshedule] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(row?.status);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const handleSelect = async (status) => {
		if (status == 'Rescheduled') {
			setReshedule(true)
			setShow(true)
			toast.info('Please enter date and time below')
		} else {
			setSelectedStatus(status);
			const result = await patchToServer(`viewings/${row?._id}`, { action: status });
			if (result.status) {
				toast.success('Status updated');
			} else {
				toast.error(result.message);
			}
		}
	};

	const [values, setValues] = useState({
		date: '',
		time: ''
	});

	const validationSchema = Yup.object().shape({
		date: Yup.string().required('Date is required'),
		time: Yup.string().required('Time is required')
	});

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		setLoading(true);
		const result = await patchToServer(`tenant-reschedule/${row._id}`, { rescheduledDate: values.date, rescheduledTime: values.time });
		if (result.status) {
			toast.success('Viewing rescheduled successfully');
			setReshedule(false);
			// setRow({ ...row, status: result.data.status });
			setSelectedStatus(result.data.status)
			setValues({
				date: '',
				time: ''
			});
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

	return (
		<>
			<tr>
				<td>
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0">
							<img src={row?.tenantId?.profileImageUrl} alt="" className="avatar-sm image_src object-fit-cover" />
						</div>
						<div className="flex-grow-1 ms-2 ">
							{row?.tenantId?.firstName} {row?.tenantId?.lastName}
						</div>
					</div>
				</td>
				<td>{row?.tenantId?.email}</td>
				<td>
					{formatDate(row?.date)} {row?.time}
				</td>
				<td>
					<Dropdown isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle tag="button" className={`btn btn-sm btn-${viewingBadge(selectedStatus)}`} id="dropdownMenuButton">
							<div className="d-flex gap-1">
								{selectedStatus}
								<i className="mdi mdi-chevron-down"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={() => handleSelect('Pending')}>
								<h5>
									<Badge color="primary">Pending</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Accepted')}>
								<h5>
									<Badge color="success">Accepted</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Declined')}>
								<h5>
									<Badge color="danger">Declined</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Rescheduled')}>
								<h5>
									<Badge color="info">Rescheduled</Badge>
								</h5>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</td>
				<td>{formatDate(row?.createdAt)}</td>
				<td>
					<button className="btn btn-success btn-sm" onClick={() => setShow(!show)}>
						Details
					</button>
				</td>
			</tr>
			{show && (
				<tr>
					<td colSpan={9}>
						<Row>
							<Col lg={6}>
								<h5>Listing details</h5>
								<Card className="mt-3">
									<span>
										<img src={row?.listingId?.photos?.[0]} alt="" className="object-fit-cover card-img-top" height="180" />
									</span>
									<div className="card-body text-center">
										<div className="m-4">
											<p className="item__tag fs-5 fw-bold ">{row?.listingId?.address}</p>
											<p className="fs-5">
												{row?.listingId?.spaceType} - {row?.listingId?.bedrooms}BD - {row?.listingId?.bathrooms}BR - {row?.listingId?.propertyType} <br />
												{row?.listingId?.duration == 'Flexible'
													? formatDate(row?.listingId?.moveOutDate)
													: row?.listingId?.duration == 'Fixed'
													? formatDate(row?.listingId?.startDate) - formatDate(row?.listingId?.endDate)
													: formatDate(row?.listingId?.commitmentDate)}
												{' - '}
												{row?.listingId?.duration}{' '}
											</p>
											<p className="d-flex gap-2 justify-content-center">
												Status:{' '}
												<h5>
													<Badge>{row?.listingId?.listingStatus}</Badge>
												</h5>
											</p>
											<p className="item__price fs-3">${row?.listingId?.monthlyRent}/ mo</p>
										</div>
									</div>
								</Card>
							</Col>
							<Col lg={6}>
								<h5>Tenant Details</h5>

								<Card className="mt-3">
									<CardBody>
										<div className="d-flex align-items-center">
											<div className="flex-shrink-0">
												<img src={row?.tenantId?.profileImageUrl} alt="" className="avatar-sm image_src object-fit-cover" />
											</div>
											<div className="flex-grow-1 ms-2 ">
												{row?.tenantId?.firstName} {row?.tenantId?.lastName} <br /> {row?.tenantId?.email}
											</div>
										</div>
										<button className="btn btn-primary mt-3" onClick={() => setReshedule(!reshedule)}>
											Reschedule?
										</button>
										{reshedule && (
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
													<Col>
														<ValidateInputDate label={'Date'} validation={validation} name={'date'} placeholder={'Date'} />
													</Col>
													<Col>
														<ValidateInputTime label={'Time'} validation={validation} name={'time'} placeholder={'Time'} />
													</Col>
													<Col lg={12}>
														<div className="hstack gap-2 justify-content-end">
															<Button disabled={loading} color="primary" type="submit">
																Submit
															</Button>
														</div>
													</Col>
												</div>
											</Form>
										)}
										{/* <Button outline color="dark">
											Reject
										</Button>
										<button className="btn btn-success ms-3">Accept</button> */}
									</CardBody>
								</Card>
							</Col>
						</Row>
					</td>
				</tr>
			)}
		</>
	);
}

export default TableRow;
