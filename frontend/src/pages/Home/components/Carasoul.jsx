import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper';

import door from "../../../assets/images/main_door.png";
import carasoulImage1 from "../../../assets/images/lc1.jpg";
import carasoulImage2 from "../../../assets/images/lc2.jpg";
import carasoulImage3 from "../../../assets/images/lc3.jpg";
import carasoulImage4 from "../../../assets/images/lc4.jpg";
import carasoulImage5 from "../../../assets/images/lc5.jpg";

function Carasoul() {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="" style={{ marginTop: "20rem" }}>
      {/* <div className="position-relative">
        <Slider {...settings}>
          <div>
            <img
              src={carasoulImage1}
              className="hero-with-carousel-images__image"
              alt="Image 1"
            />
          </div>
          <div>
            <img
              src={carasoulImage2}
              className="hero-with-carousel-images__image"
              alt="Image 2"
            />
          </div>
          <div>
            <img
              src={carasoulImage3}
              className="hero-with-carousel-images__image"
              alt="Image 3"
            />
          </div>
          <div>
            <img
              src={carasoulImage4}
              className="hero-with-carousel-images__image"
              alt="Image 4"
            />
          </div>
          <div>
            <img
              src={carasoulImage5}
              className="hero-with-carousel-images__image"
              alt="Image 4"
            />
          </div>
        </Slider>
      <div className="hero-with-carousel__image-wrapper">
        <img src={door} alt="" style={{width:'70%', height:'auto'}} />
      </div>
      </div> */}
      <div className="">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          autoplay={{
            delay: 2500, // Delay between transitions (in ms)
            disableOnInteraction: false // Continue autoplay when the swiper is interacted with (e.g., swiped)
          }}
          effect={'coverflow'}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          // initialSlide={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          spaceBetween={30}
          className="swiper_contaier"
        >
          <SwiperSlide>
            <img src={carasoulImage1} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={carasoulImage2} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={carasoulImage3} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={carasoulImage4} alt="slide_image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={carasoulImage5} alt="slide_image" />
          </SwiperSlide>
        </Swiper>
      </div>
      
      <div className="hero-with-carousel__main">
        <h1
          className="hero-with-carousel__heading fw-bolder"
          style={{ marginTop: "14rem" }}
        >
          The Freedom to every home that you deserve.
        </h1>
        <p className="hero-with-carousel__description">
          Step into a new world of renting, with a true flexibility for both
          residents and operators—every lease, every time.
        </p>
      </div>
    </section>
  );
}

export default Carasoul;
