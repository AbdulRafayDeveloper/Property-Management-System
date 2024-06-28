import React from "react";
import RatingStar from "../../../Components/Common/RatingStar";
// import RatingStar from "../../../components/common/RatingStar";

function SimpleItemsBox() {
  return (
    <div className="card__item">
      <div className="img_container">
        <img
          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712706543441x148604239044196600%2Fpexels-photo-16149662.jpeg?w=512&h=312&auto=compress&dpr=1.25&fit=max"
          alt=""
        />
      </div>
      <div className="m-4">
        <p className="item__tag fs-5 fw-bold ">Hackney, London</p>
        <p className=" fs-5">
          58 listings - Avg. rent $2200.00 <br />
          Flexible, 1 year + leases available{" "}
        </p>
        <p className="item__price fs-3 d-flex gap-4 align-items-center justify-content-end">
          4.5 <RatingStar /> (7)
        </p>
      </div>
    </div>
  );
}

export default SimpleItemsBox;
