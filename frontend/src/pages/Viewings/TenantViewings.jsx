import React, { useEffect, useState } from 'react';
import {
	Col,
	Container,
	Row,
	Card,
	CardHeader,
	CardBody,
	Input,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	FormFeedback,
	Table,
	ButtonGroup,
	UncontrolledButtonDropdown,
	Button,
	Badge
} from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { useFilterQuery } from '../../helpers/FilterQuery';
import { getFromServer } from '../../helpers/requests';
import { formatDate, viewingBadge } from '../../helpers/utils';

const TenantViewings = () => {
	const { updateFilter, buildQuery, filters } = useFilterQuery();
	const [data, setData] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [entries, setEntries] = useState(null);
	const [loading, setLoading] = useState(true);

	const init = async () => {
		// const query = buildQuery();
		const result = await getFromServer('tenant/viewings');
		console.log(result);
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

	return (
		<Row>
			<Col lg={12}>
				<Card id="leadsList">
					<CardHeader className="border-0">
						<Row className="g-4 align-items-center">
							<Col sm={3}>
								<div className="search-box">
									<Input type="text" className="form-control search" placeholder="Search for..." />
									<i className="ri-search-line search-icon"></i>
								</div>
							</Col>
						</Row>
					</CardHeader>
					<CardBody className="pt-0">
						<div className="table-responsive">
							<Table className="table-striped table-nowrap align-middle mb-0">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Listing</th>
										<th scope="col">Name</th>
										<th scope="col">Contact</th>
										<th scope="col">Viewing Date</th>
										<th scope="col">Status</th>
										<th>Rescheduled</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((d, index) => {
										return (
											<tr>
												<td className="fw-medium">{index + 1}</td>
												<td>
													<div className="d-flex align-items-center">
														<div className="flex-shrink-0">
															<img src={d?.listingId?.photos?.[0]} alt="" className="avatar-sm image_src object-fit-cover" />
														</div>
														<div className="flex-grow-1 ms-2 ">{d?.listingId?.address}</div>
													</div>
												</td>
												<td>
													{d?.landlordId?.firstName} {d?.landlordId?.lastName}
												</td>
												<td>{d?.landlordId?.email}</td>
												<td>
													{formatDate(d?.date)} {d?.time}
												</td>
												<td>
													<Badge color={viewingBadge(d?.status)}>{d?.status}</Badge>
												</td>
												<td>
													{d?.status == 'Rescheduled' ? (
														<span>
															{formatDate(d?.rescheduledDate)} {d?.rescheduledTime}
														</span>
													) : (
														''
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default TenantViewings;
