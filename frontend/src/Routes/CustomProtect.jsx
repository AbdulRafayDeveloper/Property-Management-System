import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const CustomProtect = ({ children }) => {
	const user = useSelector((s) => s.user).data;

	if (Object.entries(user).length <= 0) {
		return <Navigate to="/" />;
	} else if (!user?.isDocumentUploaded) {
		return <Navigate to={{ pathname: '/register' }} />;
	} else {
		return <Outlet />;
	}
};

export default CustomProtect;
