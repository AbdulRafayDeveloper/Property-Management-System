import React, { createContext, useEffect, useRef, useState } from 'react';

//import Scss
// import './assets/css/home.css';
// import './assets/css/custom.css';
// import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
// import fakeBackend from './helpers/AuthType/fakeBackend';
import { getFromServer } from './helpers/requests';
import { toast } from 'react-toastify';
import { localItems } from './helpers/utils';
import { useDispatch } from 'react-redux';
import { setUserDataR } from './slices/store/userSlice';
import { useLocation } from 'react-router-dom';

// Activating fake backend
// fakeBackend();

const SocketContext = createContext();

function App() {
	const [socket, setSocket] = useState(null);
	const socketHandler = (sock) => {
		setSocket(sock);
	};

	const location = useLocation();
	const prevLocationRef = useRef(location);
	const specificRoutes = ['/renters', '/landlords', '/listings', '/'];

	useEffect(() => {
		const shouldReload = (prevPath, currentPath) => {
			const isPrevRouteSpecific = specificRoutes.includes(prevPath);
			const isCurrentRouteSpecific = specificRoutes.includes(currentPath);
			return (isPrevRouteSpecific && !isCurrentRouteSpecific) || (!isPrevRouteSpecific && isCurrentRouteSpecific);
		};

		const currentPath = location.pathname;
		const prevPath = prevLocationRef.current.pathname;

		if (shouldReload(prevPath, currentPath)) {
			window.location.reload();
		}

		prevLocationRef.current = location;
	}, [location]);

	useEffect(() => {
		const importTheme = async () => {
			if (specificRoutes.includes(location.pathname)) {
				await import('bootstrap/dist/css/bootstrap.min.css');
				await import('./assets/css/home.css');
				await import('./assets/css/custom.css');
				await import('./assets/css/listing.css');
			} else {
				await import('./assets/scss/themes.scss');
			}
		};

		importTheme();
	}, []);

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const init = async () => {
		const token = localStorage.getItem(localItems['token']);
		if (token) {
			const result = await getFromServer('user');
			console.log(result);
			if (result.status) {
				dispatch(setUserDataR(result.data.user));
			} else {
				toast.error(result.message);
			}
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		init();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<React.Fragment>
			<SocketContext.Provider value={{ socket, socketHandler }}>
				<Route />
			</SocketContext.Provider>
		</React.Fragment>
	);
}

export default App;
export {SocketContext}
