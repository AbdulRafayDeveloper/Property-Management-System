import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import Select from 'react-select';
import { jobCandidatesList } from '../../../../common/data/appsJobs';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import Pagination from '../../../../Components/Common/Pagination';
import { getFromServer } from '../../../../helpers/requests';
import { useFilterQuery } from '../../../../helpers/FilterQuery';
import AddMaintenanceModal from './components/AddMaintenanceModal';
import AddNotesModal from './components/AddNotesModal';
import { maintenanceBadge } from '../../../../helpers/utils';

function LandlordMaintenance() {
	const [isBookmarkClick, setIsBookmarkClick] = useState(false);

	const [candidateData, setCandidateData] = useState();
	const [currentPage, setCurrentPage] = useState(1);

	//pagination
	const perPageData = 8;
	const indexOfLast = currentPage * perPageData;
	const indexOfFirst = indexOfLast - perPageData;
	const currentdata = useMemo(() => jobCandidatesList?.slice(indexOfFirst, indexOfLast), [indexOfFirst, indexOfLast]);

	const OnchangeHandler = (e) => {
		let search = e.target.value;
		if (search) {
			setCandidateData(jobCandidatesList.filter((data) => Object.values(data).some((field) => typeof field === 'string' && field.toLowerCase().includes(search?.toLowerCase()))));
		} else {
			setCandidateData(currentdata);
		}
	};

	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('Pending');
	const handleSelect = async (status) => {
		setSelectedStatus(status);
		// const result = await putToServer(`landlord/application/${row?._id}`, { status });
		// if (result.status) {
		// 	toast.success('Status updated');
		// } else {
		// 	toast.error(result.message);
		// }
	};

	const [completeData, setCompleteData] = useState({});
	const [data, setData] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [entries, setEntries] = useState(null);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(true);
	const { updateFilter, buildQuery, filters } = useFilterQuery();

	const init = async () => {
		// const query = buildQuery();
		const result = await getFromServer(`maintenance-requests`);
		if (result.status) {
			setData(result.data);
			// setEntries(result.pagination.totalItems);
			// setTotalPage(result.pagination.totalPages);
		}
		setLoading(false);
	};

	useEffect(() => {
		init();
	}, [filters]);

	const [open, setOpen] = useState(false);
	const [showNotes, setShowNotes] = useState(false);
	const [notesModal, setNotesModal] = useState(false);

	return (
		<React.Fragment>
			{open && <AddMaintenanceModal open={open} handleClose={() => setOpen(false)} />}
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="List View" pageTitle="Candidates Lists" />

					<Row>
						<Col xl={3} md={4}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center align-items-end gap-1">
										<span className="fw-bold fs-1">1</span>
										<span className="fw-bold fs-4 mb-1">Total Requests</span>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col xl={3} md={4}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center align-items-end gap-1">
										<span className="fw-bold fs-1">1</span>
										<span className="fw-bold fs-4 mb-1">Ongoing</span>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col xl={3} md={4}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center align-items-end gap-1">
										<span className="fw-bold fs-1">1</span>
										<span className="fw-bold fs-4 mb-1">Due</span>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col xl={3} md={4}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center align-items-end gap-1">
										<span className="fw-bold fs-1">0</span>
										<span className="fw-bold fs-4 mb-1">Expired</span>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>

					<Row className="g-4 mb-4">
						<Col className="col-sm">
							<div className="d-md-flex justify-content-sm-end gap-2">
								<div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
									<Input type="text" className="form-control" id="searchJob" autoComplete="off" placeholder="Search for maintenance" onChange={(e) => OnchangeHandler(e)} />
									<i className="ri-search-line search-icon"></i>
								</div>
							</div>
						</Col>
					</Row>

					<Row className="gy-2 mb-2" id="candidate-list">
						<Col lg={12}>
							<Card className="mb-0">
								<CardBody>
									<div className="d-lg-flex align-items-center">
										<div className="flex-shrink-0">
											<div className="avatar-sm rounded">
												<img src={'https://diycabinetsandgranite.com/wp-content/uploads/2020/05/sinks.jpg'} alt="as" className="member-img img-fluid d-block rounded"></img>
											</div>
										</div>
										<div className="ms-3">
											<Link to="/pages-profile">
												<h5 className="fs-16 mb-2">Sink stucks</h5>
											</Link>
											<p className="text-muted mb-0">20 June</p>
										</div>
										<div className="d-flex gap-4 mt-0 text-muted mx-auto">
											<div>
												<i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i> Nishatabad 15 ES min
											</div>
											<div>
												<Dropdown isOpen={dropdownOpen} toggle={toggle}>
													<DropdownToggle tag="button" className={`btn btn-sm btn-${maintenanceBadge(selectedStatus)}`} id="dropdownMenuButton">
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
														<DropdownItem onClick={() => handleSelect('In Progress')}>
															<h5>
																<Badge color="info">In Progress</Badge>
															</h5>
														</DropdownItem>
														<DropdownItem onClick={() => handleSelect('Completed')}>
															<h5>
																<Badge color="success">Completed</Badge>
															</h5>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</div>
										</div>
										<div className="d-flex flex-wrap gap-2 align-items-center mx-auto">
											{/* <div className="badge text-bg-success">
                          <i className="mdi mdi-star me-1"></i>
                         10
                        </div>
                        <div className="text-muted">12</div> */}
											<div>
												<i className="ri-time-line text-primary me-1 align-bottom"></i>{' '}
												{/* {item.type === "Part Time" ? (
                            <span className="badge bg-danger-subtle text-danger">
                              {item.type}
                            </span>
                          ) : item.type === "Full Time" ? (
                            <span className="badge bg-success-subtle text-success">
                              {item.type}
                            </span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-secondary">
                              {item.type}
                            </span>
                          )} */}
												<span className="badge bg-danger-subtle text-danger">Urgent</span>
											</div>
										</div>
										<div>
											<Link to="#!" onClick={() => setShowNotes(!showNotes)} className="btn btn-soft-success me-1">
												View Notes
											</Link>
											{/* <Link
                          to="#!"
                          onClick={(e) => {
                            e.preventDefault();

                            setIsBookmarkClick(!isBookmarkClick);
                          }}
                          className={
                            isBookmarkClick
                              ? "btn btn-ghost-danger btn-icon custom-toggle active"
                              : "btn btn-ghost-danger btn-icon custom-toggle"
                          }
                          data-bs-toggle="button"
                        >
                          {!isBookmarkClick ? (
                            <span className="icon-on">
                              <i className="ri-bookmark-line align-bottom"></i>
                            </span>
                          ) : (
                            <span className="icon-off">
                              <i className="ri-bookmark-3-fill align-bottom"></i>
                            </span>
                          )}
                        </Link> */}
										</div>
									</div>
									{showNotes && (
										<div className="mt-3">
											<button className="btn btn-sm mb-3 btn-soft-primary" onClick={() => setNotesModal(!notesModal)}>
												Add Notes
											</button>
											<h5>Notes</h5>
											<ul>
												<li>Notes Testing</li>
												<li>Notes Testing working</li>
											</ul>
										</div>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			{notesModal && <AddNotesModal open={notesModal} handleClose={() => setNotesModal(false)} />}
		</React.Fragment>
	);
}

export default LandlordMaintenance;
