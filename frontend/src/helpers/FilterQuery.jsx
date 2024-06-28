import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import Loader from '../../../components/Common/Loader';

const FilterQueryContext = createContext();

export const useFilterQuery = () => useContext(FilterQueryContext);

export const FilterQueryProvider = ({ children }) => {
	const location = useLocation();

	const [filters, setFilters] = useState({});

	const updateFilter = useCallback((key, value) => {
		setFilters((prev) => {
			return { ...prev, [key]: [value] };
		});
	}, []);

	const updateFilterByList = useCallback((list) => {
		setFilters((prev) => ({ ...prev, ...list }));
	}, []);

	const addFilterList = useCallback((list, id = null) => {
		setFilters((prev) => list);
	}, []);

	const buildQuery = useCallback(() => {
		return Object.entries(filters)
			?.map(([key, values]) => `${encodeURIComponent(key)}=${values.join(',')}`)
			.join('&');
	}, [filters]);

	useEffect(() => {
		setFilters({});
	}, [location.pathname]);

	return (
		<FilterQueryContext.Provider
			value={{
				filters,
				updateFilter,
				buildQuery,
				updateFilterByList,
				addFilterList
			}}
		>
			{children}
		</FilterQueryContext.Provider>
	);
};

export const useQuoteFilter = () => {
	const { filters, updateFilter, buildQuery, updateFilterByList, addFilterList } = useFilterQuery();
	return {
		filters,
		updateFilter,
		buildQuery,
		updateFilterByList,
		addFilterList
	};
};
