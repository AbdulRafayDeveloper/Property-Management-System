import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Input, DropdownToggle, DropdownMenu, DropdownItem, FormFeedback, Table, ButtonGroup, UncontrolledButtonDropdown, Button } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { useFilterQuery } from '../../helpers/FilterQuery';
import { getFromServer } from '../../helpers/requests';
import TableRow from './components/TableRow';

const LandlordViewings = () => {
	const { updateFilter, buildQuery, filters } = useFilterQuery();
	const [data, setData] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [entries, setEntries] = useState(null);
	const [loading, setLoading] = useState(true);

	const init = async () => {
		// const query = buildQuery();
		const result = await getFromServer('landlord/viewings');
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
						<div className="">
							<Table className="table-striped table-nowrap align-middle mb-0">
								<thead>
									<tr>
										<th scope="col">Tenant</th>
										<th scope="col">Contact</th>
										<th scope="col">Date</th>
										<th scope="col">Status</th>
										<th scope="col">Sent at</th>
										<th scope="col">Details</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((d) => {
										return <TableRow data={d} />;
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

export default LandlordViewings;
