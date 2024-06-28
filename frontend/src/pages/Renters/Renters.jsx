import React from 'react';
import interior5 from '../../assets/images/interior5.jpg';
import Offer from './Components/Offer';
import FAQ from './Components/FAQ';

function Renters() {
	return (
		<>
			<div>
				<div style={{ marginTop: '18rem' }}>
					<div className="row px-10rem">
						<div className="col-lg-6">
							<div className="d-flex flex-column justify-content-center h-100">
								<h2>Rent the home that you deserve for however long you want</h2>
								<p className="fs-2">With our unwavering support, you can break free and find your freedom again</p>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="d-flex justify-content-center">
								<img
									src={interior5}
									alt="renters"
									style={{
										width: '80%',
										objectFit: 'cover',
										height: '40rem',
										borderRadius: '40px'
									}}
								/>
							</div>
						</div>
					</div>
					<Offer />
					<FAQ />
				</div>
			</div>
		</>
	);
}

export default Renters;
