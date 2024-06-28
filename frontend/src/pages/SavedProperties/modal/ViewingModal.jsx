import React, { useState } from 'react';
import { Button, Card, Col, Form, FormFeedback, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import { Pagination, Navigation, Autoplay } from 'swiper';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import ValidateInputDate from '../../../Components/Common/ValidateInputDate';
import { toast } from 'react-toastify';
import { postToServer } from '../../../helpers/requests';
import ValidateInputTime from '../../../Components/Common/ValidateInputTime';

function ViewingModal({ data, open, handleClose }) {
	const [values, setValues] = useState({
		date: '',
		time: '',
	});

	const validationSchema = Yup.object().shape({
		date: Yup.string().required('Date is required'),
		time: Yup.string().required('Time is required'),
	});

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		setLoading(true);
		const result = await postToServer(`viewings/${data._id}`, values);
		if (result.status) {
			toast.success('Viewings submitted successfully');
			handleClose()
		} else {
			toast.error(result.message);
		}
		setLoading(false);
	};

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,
		initialValues: values,
		validationSchema: validationSchema,
		onSubmit: handleSubmit
	});

	return (
		<div>
			<Modal
				isOpen={open}
				toggle={() => {
					handleClose();
				}}
			>
				<ModalHeader
					className="modal-title"
					toggle={() => {
						handleClose();
					}}
				>
					Application
				</ModalHeader>
				<ModalBody>
					<div>
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							pagination={{ clickable: true }}
							navigation={true}
							loop={true}
							autoplay={{ delay: 2500, disableOnInteraction: false }}
							className="mySwiper swiper navigation-swiper rounded"
						>
							<div className="swiper-wrapper">
								{data?.photos?.map((d) => {
									return (
										<SwiperSlide>
											<img src={d} alt="" className="object-fit-contain card-img-top" height="180" />
										</SwiperSlide>
									);
								})}
							</div>
						</Swiper>
					</div>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
							validation.handleSubmit();
							return false;
						}}
						action="#"
						className="mt-4"
					>
						<div className="row g-3">
							<Col>
								<ValidateInputDate label={'Date'} validation={validation} name={'date'} placeholder={'Date'} />
							</Col>
							<Col>
								<ValidateInputTime label={'Time'} validation={validation} name={'time'} placeholder={'Time'} />
							</Col>
							<Col lg={12}>
								<div className="hstack gap-2 justify-content-end">
									<Button color="light" onClick={handleClose}>
										Close
									</Button>
									<Button disabled={loading} color="primary" type="submit">
										Submit
									</Button>
								</div>
							</Col>
						</div>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default ViewingModal;
