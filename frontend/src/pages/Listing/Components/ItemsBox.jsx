import React, { useState } from 'react';
import { formatDate } from '../../../helpers/utils';
import DetailsModal from './DetailsModal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postToServer } from '../../../helpers/requests';

function ItemsBox({ row }) {
	const user = useSelector((s) => s.user).data;
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const saveHandler = async () => {
		if (user && Object.entries(user)?.length > 0) {
			setLoading(true);
			const result = await postToServer(`saveListing/${row?._id}`);
			if (result.status) {
				toast.success('Item saved successfully');
			} else {
				toast.error(result.message);
			}
			setLoading(false);
		} else {
			toast.info('Please register/login to continue');
		}
	};

	return (
		<>
			{show && <DetailsModal data={row} open={show} handleClose={() => setShow(false)} />}
			<div className="card__item">
				<div className="img_container d-flex justify-content-center position-relative">
					<img src={row?.photos?.[0]} alt="" style={{ objectFit: 'cover', width: 'auto', maxWidth: '100%', height: '20rem' }} />
					<div className="d-flex align-items-center gap-3 position-absolute item__avaatr">
						<div className="item__avatar--container">
							<img src={row?.userId?.profileImageUrl} alt="" />
						</div>
						<div>
							{row?.userId?.firstName} {row?.userId?.lastName}
						</div>
					</div>
				</div>
				<div className="m-4">
					<p className="item__tag fs-5 fw-bold ">{row?.address}</p>
					<p className=" fs-5">
						{row?.spaceType} - {row?.bedrooms}BD - {row?.bathrooms}BR - {row?.propertyType} <br />
						{row?.duration == 'Flexible' ? formatDate(row?.moveOutDate) : row?.duration == 'Fixed' ? formatDate(row?.startDate) - formatDate(row?.endDate) : formatDate(row?.commitmentDate)}
						{' - '}
						{row?.duration}
					</p>
					<p className="item__price fs-3">${row?.monthlyRent} / mo</p>
				</div>
				<div className="pb-3 d-md-flex gap-2 w-100 justify-content-center">
					{/* <button className="primary-btn fs-4" onClick={() => setShow(!show)}>
						Details
					</button> */}
					<button disabled={loading} className="primary-btn fs-4" onClick={saveHandler}>
						Save
					</button>
				</div>
			</div>
		</>
	);
}

export default ItemsBox;
