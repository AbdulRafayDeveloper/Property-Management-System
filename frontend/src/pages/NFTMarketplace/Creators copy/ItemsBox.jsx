import React from "react";

function ItemsBox({row}) {
  return (
    <div className="card__item">
      <div className="img_container position-relative">
        <img
src={row}          alt=""
        />
        {/* <div className="d-flex align-items-center gap-3 position-absolute item__avaatr">
          <div className="item__avatar--container">
            <img
              src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712703114616x726392270981764100%2Fpexels-photo-91227.jpeg?w=64&h=63&auto=compress&dpr=1.25&fit=max"
              alt=""
            />
          </div>
          <div>John D. - 30</div>
        </div> */}
      </div>
      <div className="m-4">
        <p className="item__tag fs-5 fw-bold ">Hackney, London</p>
        <p className=" fs-5">
          Private Room - 1BD - 1BR - Apartment 30 April, 2024 - 4 Months
        </p>
        <p className="item__price fs-3">$3.500 / mo</p>
      </div>
    </div>
  );
}

export default ItemsBox;
