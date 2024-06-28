import React, { useEffect, useState } from 'react';
import { Badge, Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';

import { creatorsData, creatorsListData } from '../../common/data/index';

import { getFromServer } from '../../helpers/requests';
import { useDispatch } from 'react-redux';
import { useFilterQuery } from '../../helpers/FilterQuery';
import Pagination from '../../helpers/Pagination';
import { formatDate } from '../../helpers/utils';
import ApplicationModal from './modal/ApplicationModal';
import ViewingModal from './modal/ViewingModal';

const SavedProperties = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [completeData, setCompleteData] = useState({});
	const [data, setData] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [entries, setEntries] = useState(null);
	const [limit, setLimit] = useState(10);
	const [loading, setLoading] = useState(true);
	const { updateFilter, buildQuery, filters } = useFilterQuery();

	const init = async () => {
		const query = buildQuery();
		const result = await getFromServer(`saveListing?${query}`);
		console.log(result);
		if (result.status) {
			setData(result.data);
			setEntries(result.pagination.totalItems);
			setTotalPage(result.pagination.totalPages);
		}
	};

	useEffect(() => {
		init();
	}, [filters]);

	const [temp, setTemp] = useState()
	const [showModal, setShowModal] = useState(false)
	const modalHandler = (listing) => {
		setShowModal(true)
		setTemp(listing)
	}

	const [viewingModal, setViewingModal] = useState(false)
	const viewingModalHandler = (listing) => {
		setViewingModal(true)
		setTemp(listing)
	}

	document.title = 'Properties';
	return (
		<React.Fragment>
			{showModal && <ApplicationModal data={temp} open={showModal} handleClose={()=>setShowModal(false)} />}
			{viewingModal && <ViewingModal data={temp} open={viewingModal} handleClose={()=>setViewingModal(false)} />}
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Properties" pageTitle="" />
					<Row className="g-4 mb-3">
						<Col className="col-sm">
							<div className="d-flex justify-content-sm-end gap-2">
								<div className="search-box ms-2">
									<input type="text" className="form-control" placeholder="Search..." />
									<i className="ri-search-line search-icon"></i>
								</div>
								<div className="choices">
									<select className="form-control w-md" data-choices data-choices-search-false>
										<option value="All">All</option>
										<option value="Today">Today</option>
										<option value="Yesterday" defaultValue>
											Yesterday
										</option>
										<option value="Last 7 Days">Last 7 Days</option>
										<option value="Last 30 Days">Last 30 Days</option>
										<option value="This Month">This Month</option>
										<option value="Last Year">Last Year</option>
									</select>
								</div>
							</div>
						</Col>
					</Row>

					<Row className="row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">
						{data.map((d, key) => {
							const item = d?.listing
							return (
								<Col key={key}>
								<Card>
									{/* <Swiper
										modules={[Navigation, Pagination, Autoplay]}
										pagination={{ clickable: true }}
										navigation={true}
										loop={true}
										autoplay={{ delay: 2500, disableOnInteraction: false }}
										className="mySwiper swiper navigation-swiper rounded"
									>
										<div className="swiper-wrapper">
											<SwiperSlide>
												<img src={item.cardImg} alt="" className="object-fit-cover card-img-top" height="120"  />
											</SwiperSlide>
											<SwiperSlide>
												<img src={item.cardImg} alt="" className="object-fit-cover card-img-top" height="120"  />
											</SwiperSlide>
											<SwiperSlide>
												<img src={item.cardImg} alt="" className="object-fit-cover card-img-top" height="120"  />
											</SwiperSlide>
										</div>
									</Swiper> */}
									<Link to={'/pages-profile'}>
										<img src={item.photos?.[0]} alt="" className="object-fit-cover card-img-top" height="180" />
									</Link>
									<div className="card-body text-center">
										<div className="m-4">
											<p className="item__tag fs-5 fw-bold ">{item?.address}</p>
											<p className=" fs-5">
												{item?.propertyType} - {item?.bedrooms}BD - {item?.bathrooms}BR - {item?.spaceType}{' '}
												{item?.duration == 'Flexible'
													? formatDate(item?.moveOutDate)
													: item?.duration == 'Fixed'
													? formatDate(item?.startDate) - formatDate(item?.endDate)
													: formatDate(item?.commitmentDate)}
												- {item?.duration}
											</p>
											<p className="d-flex gap-2 justify-content-center">
												Status:{' '}
												<h5>
													<Badge>Active listing</Badge>
												</h5>
											</p>
											<p className="item__price fs-3">${item?.monthlyRent} / mo</p>
										</div>
										{/* <button className={item.isFollowBtn ? 'btn btn-success w-100' : 'btn btn-soft-success w-100'}>{item.isFollowBtn ? 'View details' : 'View details'}</button> */}
										<div className='d-flex gap-3'>
										<button className='btn btn-soft-primary w-100' onClick={()=>viewingModalHandler(item)}>Book Viewing</button>
										<button className='btn btn-soft-success w-100' onClick={()=>modalHandler(item)}>Apply</button>
										</div>
									</div>
								</Card>
							</Col>
							)
						})}
					</Row>

					<div className="">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPage}
							onPageChange={(page) => {
								setCurrentPage(page);
								updateFilter('page', page);
								window.scrollTo(0, 0);
							}}
						/>
					</div>

					{/* <Row className="g-0 text-center text-sm-start align-items-center mb-4">
						<Col sm={6}>
							<div>
								<p className="mb-sm-0 text-muted">
									Showing <span className="fw-semibold">1</span> to <span className="fw-semibold">10</span> of <span className="fw-semibold text-decoration-underline">12</span> entries
								</p>
							</div>
						</Col>

						<Col sm={6}>
							<ul className="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
								<li className="page-item disabled">
									<Link to="#" className="page-link">
										Previous
									</Link>
								</li>
								<li className="page-item active">
									<Link to="#" className="page-link">
										1
									</Link>
								</li>
								<li className="page-item ">
									<Link to="#" className="page-link">
										2
									</Link>
								</li>
								<li className="page-item">
									<Link to="#" className="page-link">
										3
									</Link>
								</li>
								<li className="page-item">
									<Link to="#" className="page-link">
										4
									</Link>
								</li>
								<li className="page-item">
									<Link to="#" className="page-link">
										5
									</Link>
								</li>
								<li className="page-item">
									<Link to="#" className="page-link">
										Next
									</Link>
								</li>
							</ul>
						</Col>
					</Row> */}
				</Container>
			</div>
		</React.Fragment>
	);
};

export default SavedProperties;
