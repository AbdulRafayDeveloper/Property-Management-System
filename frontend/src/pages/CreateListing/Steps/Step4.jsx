import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback, Card } from 'reactstrap';
import ValidateInput from '../../../Components/Common/ValidateInput';
import { FaWifi, FaBath, FaBell, FaTv, FaAirFreshener, FaThermometerHalf, FaBed, FaCat, FaDoorOpen, FaShieldAlt } from 'react-icons/fa';
import {
	MdOutlineLocalLaundryService,
	MdOutlineBalcony,
	MdOutlinePool,
	MdOutlineFireExtinguisher,
	MdOutdoorGrill,
	MdFitnessCenter,
	MdElevator,
	MdSmokeFree,
	MdStairs,
	MdHandyman,
	MdCameraOutdoor
} from 'react-icons/md';
import { GiTabletopPlayers, GiFirstAidKit } from 'react-icons/gi';
import { FaGear } from 'react-icons/fa6';
import { IoIosKey } from 'react-icons/io';
import { RiParkingBoxLine, RiParkingBoxFill } from 'react-icons/ri';

const data = [
	{ icon: <MdOutlineLocalLaundryService className="fs-4" />, name: 'In-unit laundry' },
	{ icon: <FaWifi className="fs-4" />, name: 'Wifi included' },
	{ icon: <FaThermometerHalf className="fs-4" />, name: 'Utilities included' },
	{ icon: <FaBed className="fs-4" />, name: 'Unfurnished' },
	{ icon: <FaBed className="fs-4" />, name: 'Furnished' },
	{ icon: <FaAirFreshener className="fs-4" />, name: 'Air Conditioning' },
	{ icon: <IoIosKey className="fs-4" />, name: 'Month to month' },
	{ icon: <FaTv className="fs-4" />, name: 'TV' },
	{ icon: <FaBath className="fs-4" />, name: 'Private bath' },
	{ icon: <FaCat className="fs-4" />, name: 'Pets welcome' },
	{ icon: <MdOutlinePool className="fs-4" />, name: 'Large closet' },
	{ icon: <MdOutlineBalcony className="fs-4" />, name: 'Balcony' },

	// property

	{ icon: <MdFitnessCenter className="fs-4" />, name: 'Exercise equipment' },
	{ icon: <MdElevator className="fs-4" />, name: 'Elevator' },
	{ icon: <FaDoorOpen className="fs-4" />, name: 'Doorman' },
	{ icon: <FaGear className="fs-4" />, name: 'Heating' },
	{ icon: <RiParkingBoxFill className="fs-4" />, name: 'Free parking' },
	{ icon: <RiParkingBoxLine className="fs-4" />, name: 'Paid parking' },
	{ icon: <MdCameraOutdoor className="fs-4" />, name: 'Outdoor space' },
	{ icon: <MdOutlinePool className="fs-4" />, name: 'Swimming Pool' },
	{ icon: <MdOutlineFireExtinguisher className="fs-4" />, name: 'Fire pit' },
	{ icon: <GiTabletopPlayers className="fs-4" />, name: 'Pool table' },
	{ icon: <MdOutdoorGrill className="fs-4" />, name: 'BBQ grill' },

	// safety

	{ icon: <MdSmokeFree className="fs-4" />, name: 'Smoke alarm' },
	{ icon: <GiFirstAidKit className="fs-4" />, name: 'First aid kit' },
	{ icon: <FaBell className="fs-4" />, name: 'Carbon monoxide' },
	{ icon: <MdOutlineFireExtinguisher className="fs-4" />, name: 'Fire extinguisher' },
	{ icon: <MdHandyman className="fs-4" />, name: 'Handicap accessible' },
	{ icon: <FaShieldAlt className="fs-4" />, name: 'Security system' },
	{ icon: <MdStairs className="fs-4" />, name: 'Must climb stairs' }
];

const Step4 = ({ validation }) => {
	const toggleAmenity = (category, amenity) => {
		const updatedCategory = validation.values.amenities[category].includes(amenity)
			? validation.values.amenities[category].filter((item) => item !== amenity)
			: [...validation.values.amenities[category], amenity];

		validation.setFieldValue(`amenities.${category}`, updatedCategory);
	};
	return (
		<>
			<h5 className={`mb-4 fs-2 fw-bold`}>Amenities</h5>
			<Row className="mt-3">
				<Label className="form-label">In the home</Label>
				<div className="d-flex flex-wrap gap-2 mt-2">
					{data.slice(0, 12).map((amenity, i) => (
						<span
							key={i}
							className={`d-flex amenity gap-2 align-items-center rounded-pill btn ${validation.values.amenities['inTheHome'].includes(amenity.name) ? 'btn-success' : 'btn-light'} m-1`}
							onClick={() => toggleAmenity('inTheHome', amenity.name)}
						>
							<span className="amenity__icon bg-success"> {amenity.icon} </span> {amenity.name}
						</span>
					))}
				</div>
			</Row>
			<Row className="mt-3">
				<Label className="form-label">On the property</Label>
				<div className="d-flex flex-wrap gap-2 mt-2">
					{data.slice(12, 23).map((amenity, i) => (
						<span
							key={i}
							className={`d-flex amenity gap-2 align-items-center rounded-pill btn ${validation.values.amenities['onTheProperty'].includes(amenity.name) ? 'btn-primary' : 'btn-light'} m-1`}
							onClick={() => toggleAmenity('onTheProperty', amenity.name)}
						>
							<span className="amenity__icon bg-primary"> {amenity.icon} </span> {amenity.name}
						</span>
					))}
				</div>
			</Row>
			<Row className="mt-3">
				<Label className="form-label">Safety</Label>
				<div className="d-flex flex-wrap gap-2 mt-2">
					{data.slice(23).map((amenity, i) => (
						<span
							key={i}
							className={`d-flex amenity gap-2 align-items-center rounded-pill btn ${validation.values.amenities['safety'].includes(amenity.name) ? 'btn-warning' : 'btn-light'} m-1`}
							onClick={() => toggleAmenity('safety', amenity.name)}
						>
							<span className="amenity__icon bg-warning"> {amenity.icon} </span> {amenity.name}
						</span>
					))}
				</div>
			</Row>
			{validation.touched.amenities && validation.errors.amenities ? <div className="text-danger fs-5 mt-3 ">{validation.errors.amenities}</div> : null}
		</>
	);
};

export default Step4;
