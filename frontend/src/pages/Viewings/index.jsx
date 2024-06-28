import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Input, DropdownToggle, DropdownMenu, DropdownItem, FormFeedback, Table, ButtonGroup, UncontrolledButtonDropdown, Button } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { useSelector } from 'react-redux';
import LandlordViewings from './LandlordViewings';
import TenantViewings from './TenantViewings';

const CrmLeads = () => {
  const user = useSelector((s) => s.user);
  console.log(user?.isLogggedIn , user?.data?.isLandlord)
	document.title = 'Viewings';

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Viewings" pageTitle="" />
					{user?.isLogggedIn ? user?.data?.isLandlord ? <LandlordViewings /> : <TenantViewings /> : ''}
				</Container>
			</div>
		</React.Fragment>
	);
};

export default CrmLeads;
