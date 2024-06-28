import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { IoSearch } from 'react-icons/io5';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const [inputPage, setInputPage] = useState('');

	const getDisplayedPages = () => {
		let pages = [];

		if (totalPages <= 6) {
			// Display all pages if there are 6 or fewer
			pages = Array.from({ length: totalPages }, (_, i) => i + 1);
		} else {
			// Always include the first page
			pages.push(1);

			// Determine range to display around the current page or input page
			let startPage = Math.max(2, currentPage - 2);
			let endPage = Math.min(totalPages - 1, currentPage + 2);

			// Adjust if the current page is near the start or end
			if (currentPage <= 4) {
				endPage = 6;
			} else if (currentPage >= totalPages - 3) {
				startPage = totalPages - 5;
			}

			// Handle large gaps due to direct input navigation
			if (startPage > 2) {
				pages.push('...');
			}

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (endPage < totalPages - 1) {
				pages.push('...');
			}

			// Always include the last page
			pages.push(totalPages);
		}

		return pages;
	};

	const handleInputPageChange = (e) => {
		const value = e.target.value;
		setInputPage(value.replace(/\D/, '')); // Allow only numbers
	};

	const handleGoToPage = (e) => {
		e.preventDefault();
		const pageNumber = Number(inputPage);
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			onPageChange(pageNumber);
			setInputPage('');
		}
	};

	return (
		<div className="d-md-flex gap-2 justify-content-center align-items-start">
			{/* <div className="mt-">
				<InputGroup className="mb-3">
					<Form.Control type="text" style={{ maxWidth: '4rem' }} className="form-control" value={inputPage} onChange={handleInputPageChange} placeholder="Go" />
					<InputGroup.Text id="basic-addon1" onClick={handleGoToPage}>
						<IoSearch className="pointer" />
					</InputGroup.Text>
				</InputGroup>
			</div> */}
			<div className="d-flex justify-content-center">
				<nav aria-label="Page navigation">
					<ul className="pagination">
						{getDisplayedPages().map((page, index) =>
							typeof page === 'number' ? (
								<li className={`page-item ${currentPage === page ? 'active' : ''}`} key={index}>
									<a
										className="page-link"
										href="#"
										onClick={(e) => {
											e.preventDefault();
											onPageChange(page);
										}}
									>
										{page}
									</a>
								</li>
							) : (
								<li className="page-item disabled" key={index}>
									<span className="page-link">{page}</span>
								</li>
							)
						)}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Pagination;
