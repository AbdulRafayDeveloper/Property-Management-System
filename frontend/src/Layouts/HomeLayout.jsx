import React, { useEffect } from 'react';
import withRouter from '../Components/Common/withRouter';

//redux
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const HomeLayout = ({ children }) => {
	const nonauthData = createSelector(
		(state) => state.Layout.layoutModeType,
		(layoutModeType) => layoutModeType
	);
	// Inside your component
	const layoutModeType = useSelector(nonauthData);

	// useEffect(() => {
	// 	if (layoutModeType === 'dark') {
	// 		document.body.setAttribute('data-bs-theme', 'dark');
	// 	} else {
	// 		document.body.setAttribute('data-bs-theme', 'light');
	// 	}
	// 	return () => {
	// 		document.body.removeAttribute('data-bs-theme');
	// 	};
	// }, [layoutModeType]);

	return (
		<div style={{ overflowX: 'hidden' }} className='landing__pages'>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default withRouter(HomeLayout);
