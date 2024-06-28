import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LandlordMaintenance from './LandlordMaintenance';
import TenantMaintenance from './TenantMaintenance';

const CandidateList = () => {
	const user = useSelector((s) => s.user).data;

	document.title = 'Maintenance';
	return <>{user.isLandlord ? <LandlordMaintenance /> : <TenantMaintenance />}</>;
};

export default CandidateList;
