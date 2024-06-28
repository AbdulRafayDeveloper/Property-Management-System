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

import { useNavigate } from 'react-router-dom';

function DetailsModal({ data, open, handleClose }) {
	const navigate = useNavigate();

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
											<img src={d} alt="" className="W-100 object-fit-contain card-img-top" height="180" />
										</SwiperSlide>
									);
								})}
							</div>
						</Swiper>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default DetailsModal;
