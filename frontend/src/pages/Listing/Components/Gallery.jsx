import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function Gallery() {
  return (
    <div className="listing__gallery" style={{overflowX:'auto'}}>
      <div className="d-md-flex gap-4 align-items-start">
        <div>
          <div
            className="card listing__galler__card right_shadow"
            style={{ width: "35rem" }}
          >
            <div
              className="card-body p-4 inner d-flex flex-column justify-content-around"
              style={{ backgroundColor: "#D9CBBB" }}
            >
              <h2 className="fs-1" style={{ lineHeight: "1.3" }}>
                Elevate Your Renting Experience with Our Integrated AI Assistant
              </h2>
              <p className="fs-3">Seamless Leasing process</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713887891582x533928623611273900%2Fpexels-photo-1374125.jpeg?w=384&h=508&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_1"
          />
        </div>
        <div className="d-flex gap-4 align-items-end pb-5">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713896706389x699210695909353100%2Fpexels-ketut-subiyanto-4473903.jpg?w=256&h=259&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_2"
          />
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713896901620x808806521973624000%2Fpexels-karolina-grabowska-4203100.jpg?w=192&h=283&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_3"
          />
        </div>

        <div className="last__card__first__row">
          <div
            className="card listing__galler__card right_shadow "
            style={{ width: "35rem" }}
          >
            <div
              className="card-body p-4 inner d-flex flex-column justify-content-around"
              style={{ backgroundColor: "#254638" }}
            >
              <h2 className="fs-1 text-light fw-bold" style={{ lineHeight: "1.3" }}>
                Craft Your Ideal Rental: Explore Our Curated Property Listings{" "}
              </h2>
              <div className="text-end w-100">
                <button className="btn btn-success fs-4">Explore Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-md-flex gap-4">
        <div>
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713896598789x317994398726798340%2Fpexels-charlotte-may-5825586.jpg?w=256&h=385&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_4"
          />
        </div>
        <div>
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713888151684x400113971755163600%2Fpexels-photo-417273.jpeg?w=512&h=325&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_5"
          />
        </div>
        <div className="card__bottom">
          <div
            className="card listing__galler__card right_shadow"
            style={{ width: "35rem" }}
          >
            <div
              className="card-body p-4 inner d-flex flex-column justify-content-around"
              style={{ backgroundColor: "#264346" }}
            >
              <h2
                className="fs-1 text-light fw-bold"
                style={{ lineHeight: "1.4" }}
              >
                Transform Your Living Experience: Discover the Perfect Rental
                that Fits Your Lifestyle and Budget{" "}
              </h2>
              <div className="text-end w-100">
                <button className="btn btn-light fs-3">Sign up</button>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex gap-4 align-items-end pb-5">
          <img
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713894246960x669658336559860700%2Fpexels-photo-911738.jpeg?w=384&h=277&auto=compress&dpr=1.25&fit=max"
            alt=""
            className="right_shadow image_6"
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
