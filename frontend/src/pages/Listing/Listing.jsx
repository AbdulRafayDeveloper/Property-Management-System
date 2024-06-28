import React, { useEffect, useState } from 'react';
import SearchArea from './Components/SearchArea';
import ItemsBox from './Components/ItemsBox';
import SimpleItemsBox from './Components/SimpleItemsBox';
import Gallery from './Components/Gallery';
import { getFromServer } from '../../helpers/requests';
import { toast } from 'react-toastify';
import { useFilterQuery } from '../../helpers/FilterQuery';

function Listing() {
	const { filters, updateFilter, buildQuery } = useFilterQuery();
	const [loading, setLoading] = useState(true);
	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [items, setItems] = useState([]);
	const init = async () => {
    setLoading(true)
		const query = buildQuery();
		const result = await getFromServer(`listings?${query}`);
		if (result.status) {
			setItems([...items, ...result.data]);
			setTotalPages(result.totalPages);
		} else {
			toast.error(result.message);
		}
		setLoading(false);
	};
	useEffect(() => {
		init();
	}, [filters]);
	const nextPageHandler = () => {
		setPageNo(pageNo + 1);
		updateFilter('page', pageNo + 1);
	};
	return (
		<main className="landing__pages">
			<section>
				<div className="search__main">
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8">
							<SearchArea />
						</div>
						<div className="col-lg-2"></div>
					</div>
				</div>
				<div className="listings">
					<div className="searcharea text-center filter d-flex justify-content-center align-items-center gap-3">
						<h3>Sort:</h3>
						<select className="form-control">
							<option value="">By</option>
						</select>
					</div>
					<div className="row">
						{items?.map((i) => {
							return (
								<div className="col-md-3">
									<ItemsBox row={i} />
								</div>
							);
						})}
					</div>
					{totalPages == pageNo ? (
						''
					) : (
						<div className="text-center mt-5">
							<button className="primary-btn" disabled={loading} onClick={nextPageHandler}>
								Show more
							</button>
						</div>
					)}
				</div>
				<div className="neighborhood">
					<div className="text-center pb-5">
						<h4>Popular Neighborhoods</h4>
					</div>
					<div className="row">
						<div className="col-md-3">
							<SimpleItemsBox />
						</div>
						<div className="col-md-3">
							<SimpleItemsBox />
						</div>
						<div className="col-md-3">
							<SimpleItemsBox />
						</div>
						<div className="col-md-3">
							<SimpleItemsBox />
						</div>
					</div>
				</div>
				<Gallery />
			</section>
		</main>
	);
}

export default Listing;
