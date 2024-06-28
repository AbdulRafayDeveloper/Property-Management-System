import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout';
import VerticalLayout from '../Layouts/index';

//routes
import { authProtectedRoutes, caperLandingRoutes, protectedWithoutSidebar, publicRoutes } from './allRoutes';
import { AuthProtected } from './AuthProtected';
import HomeLayout from '../Layouts/HomeLayout';
import CustomProtect from './CustomProtect';
import { FilterQueryProvider } from '../helpers/FilterQuery';

const Index = () => {
	return (
		<FilterQueryProvider>
			<Routes>
				<Route>
					{caperLandingRoutes.map((route, idx) => (
						<Route path={route.path} element={<HomeLayout>{route.component}</HomeLayout>} key={idx} exact={true} />
					))}
				</Route>

				<Route>
					{publicRoutes.map((route, idx) => (
						<Route path={route.path} element={<NonAuthLayout>{route.component}</NonAuthLayout>} key={idx} exact={true} />
					))}
				</Route>

				<Route element={<CustomProtect />}>
					{protectedWithoutSidebar.map((route, idx) => (
						<Route path={route.path} element={<NonAuthLayout>{route.component}</NonAuthLayout>} key={idx} exact={true} />
					))}
				</Route>

				<Route element={<CustomProtect />}>
					{authProtectedRoutes.map((route, idx) => (
						<Route
							path={route.path}
							element={
								<AuthProtected>
									<VerticalLayout>{route.component}</VerticalLayout>
								</AuthProtected>
							}
							key={idx}
							exact={true}
						/>
					))}
				</Route>
			</Routes>
		</FilterQueryProvider>
	);
};

export default Index;
