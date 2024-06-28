import React, { useState } from 'react';
import { Badge, Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import { badgeSelection, downloadFile, formatDate } from '../../helpers/utils';
import { putToServer } from '../../helpers/requests';
import { toast } from 'react-toastify';

function TableRow({ row }) {
	const [show, setShow] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(row?.status);

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const handleSelect = async (status) => {
		setSelectedStatus(status);
		const result = await putToServer(`landlord/application/${row?._id}`, { status });
		if (result.status) {
			toast.success('Status updated');
		} else {
			toast.error(result.message);
		}
	};


	return (
		<>
			<tr>
				<td>
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0">
							<img src={row?.user?.profileImageUrl} alt="" className="avatar-sm image_src object-fit-cover" />
						</div>
						<div className="flex-grow-1 ms-2 ">
							{row?.user?.firstName} {row?.user?.lastName}
						</div>
					</div>
				</td>
				<td>{row?.user?.email}</td>
				<td>{row?.listing?.address}</td>
				<td>{formatDate(row?.moveInDate)}</td>
				<td>{formatDate(row?.moveOutDate)}</td>
				<td>${row?.monthlyIncome}</td>
				<td>
					<Dropdown isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle tag="button" className={`btn btn-sm btn-${badgeSelection(selectedStatus)}`} id="dropdownMenuButton">
							<div className="d-flex gap-1">
								{selectedStatus}
								<i className="mdi mdi-chevron-down"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={() => handleSelect('Sent')}>
								<h5>
									<Badge color="warning">Sent</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Unfinished')}>
								<h5>
									<Badge color="primary">Unfinished</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Processing')}>
								<h5>
									<Badge color="info">Processing</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Rejected')}>
								<h5>
									<Badge color="danger">Rejected</Badge>
								</h5>
							</DropdownItem>
							<DropdownItem onClick={() => handleSelect('Accepted')}>
								<h5>
									<Badge color="success">Accepted</Badge>
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
							<Col lg={4}>
								<h5>Listing details</h5>
								<Card className="mt-3">
									<span>
										<img src={row?.listing?.photos?.[0]} alt="" className="object-fit-cover card-img-top" height="180" />
									</span>
									<div className="card-body text-center">
										<div className="m-4">
											<p className="item__tag fs-5 fw-bold ">{row?.listing?.address}</p>
											<p className="fs-5">
												{row?.listing?.spaceType} - {row?.listing?.bedrooms}BD - {row?.listing?.bathrooms}BR - {row?.listing?.propertyType} <br />
												{row?.listing?.duration == 'Flexible'
													? formatDate(row?.listing?.moveOutDate)
													: row?.listing?.duration == 'Fixed'
													? formatDate(row?.listing?.startDate) - formatDate(row?.listing?.endDate)
													: formatDate(row?.listing?.commitmentDate)}
												{' - '}
												{row?.listing?.duration}{' '}
											</p>
											<p className="d-flex gap-2 justify-content-center">
												Status:{' '}
												<h5>
													<Badge>{row?.listing?.listingStatus}</Badge>
												</h5>
											</p>
											<p className="item__price fs-3">${row?.listing?.monthlyRent}/ mo</p>
										</div>
									</div>
								</Card>
							</Col>
							<Col lg={8}>
								<h5>Tenant Details</h5>

								<Card className="mt-3">
									<CardBody>
										<div className="d-flex align-items-center">
											<div className="flex-shrink-0">
												<img src={row?.user?.profileImageUrl} alt="" className="avatar-sm image_src object-fit-cover" />
											</div>
											<div className="flex-grow-1 ms-2 ">
												{row?.user?.firstName} {row?.user?.lastName} <br /> {row?.user?.email}
											</div>
										</div>
										<Row>
											<Col lg={6}>
												<table className="table mt-2">
													<tbody>
														<tr>
															<th>Move in Date</th>
															<td>{formatDate(row?.moveInDate)}</td>
														</tr>
														<tr>
															<th>Move out Date</th>
															<td>{formatDate(row?.moveOutDate)}</td>
														</tr>
														<tr>
															<th>Monthly Income</th>
															<td>${row?.monthlyIncome}</td>
														</tr>
														<tr>
															<td colSpan={2}>
																<h5>Last Landlord</h5>
															</td>
														</tr>
														<tr>
															<th>Name</th>
															<td>{row?.currentLandlord?.name}</td>
														</tr>
														<tr>
															<th>Phone / Email</th>
															<td>
																{row?.currentLandlord?.phone} / <br /> {row?.currentLandlord?.email}
															</td>
														</tr>
														{row?.coApplicant?.name?.trim() || row?.coApplicant?.phone?.trim() || row?.coApplicant?.email?.trim() ? (
															<>
																<tr>
																	<td colSpan={2}>
																		<h5>Co Applicant</h5>
																	</td>
																</tr>
																{row?.coApplicant?.name?.trim() && (
																	<tr>
																		<th>Name</th>
																		<td>{row?.coApplicant?.name}</td>
																	</tr>
																)}
																{row?.coApplicant?.phone?.trim() ||
																	(row?.coApplicant?.email?.trim() && (
																		<tr>
																			<th>Phone / Email</th>
																			<td>
																				{row?.coApplicant?.phone} / <br /> {row?.coApplicant?.email}
																			</td>
																		</tr>
																	))}
															</>
														) : (
															''
														)}
													</tbody>
												</table>
											</Col>
											<Col lg={6}>
												<h5>Documents</h5>
												<Card>
													<CardBody>
														<div className="d-flex justify-content-between">
															<span>Proof of earning</span>
															<span className="text-primary cp" onClick={() => row?.documents?.proofOfEarnings.forEach(downloadFile)}>
																Download (2) files
															</span>
														</div>
													</CardBody>
												</Card>
												<Card>
													<CardBody>
														<div className="d-flex justify-content-between">
															<span>Work Confirmation</span>
															<span className="text-primary cp" onClick={() => row?.documents?.workConfirmation.forEach(downloadFile)}>
																Download
															</span>
														</div>
													</CardBody>
												</Card>
												<Card>
													<CardBody>
														<div className="d-flex justify-content-between">
															<span>Reference Letter</span>
															<span className="text-primary cp" onClick={() => row?.documents?.referenceLetter.forEach(downloadFile)}>
																Download
															</span>
														</div>
													</CardBody>
												</Card>
												{row?.isStudent ? (
													<>
														<Card>
															<CardBody>
																<div className="d-flex justify-content-between">
																	<span>Uni confirmation</span>
																	<span className="text-primary cp" onClick={() => row?.documents?.studentDocuments?.uniConfirmation.forEach(downloadFile)}>
																		Download
																	</span>
																</div>
															</CardBody>
														</Card>
														<Card>
															<CardBody>
																<div className="d-flex justify-content-between">
																	<span>Guarantor Letter</span>
																	<span className="text-primary cp" onClick={() => row?.documents?.studentDocuments?.guarantorLetter.forEach(downloadFile)}>
																		Download
																	</span>
																</div>
															</CardBody>
														</Card>
													</>
												) : (
													''
												)}
											</Col>
										</Row>
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
