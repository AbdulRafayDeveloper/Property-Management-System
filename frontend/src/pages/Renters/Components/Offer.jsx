import React from "react";
import ic1 from "../../../assets/images/lc1.jpg";

function Offer() {
  return (
    <section style={{ marginTop: "10rem" }}>
      <div className="">
        <img
          src={ic1}
          alt=""
          style={{ height: "30rem", width: "100%", objectFit: "cover" }}
        />
        <div className="offering my-5">
          <h4>
            We make it easier to find a new home and get you in the door - with
            the flexibility tailored to your needs
          </h4>
        </div>
        <div className="row m-5">
          <div className="col-lg-4 col-md-6 p-5">
            <div className="card position-relative">
              <div
                className="card-body p-4"
                style={{ backgroundColor: "#F3E9D2" }}
              >
                <h2 className="fs-1 fw-bold offer-card-mt">Verified Renters</h2>
                <p className="fs-3">
                  We verify each renter so that you don't have to. Each renter
                  and landlord has to upload either their lease, utility bill or
                  their valid government ID.{" "}
                </p>
              </div>
              <div className="position-absolute card-top">
                <img src={ic1} className="card-top-image" />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 p-5">
            <div className="card position-relative">
              <div
                className="card-body p-4"
                style={{ backgroundColor: "#F3E9D2" }}
              >
                <h2 className="fs-1 fw-bold offer-card-mt">Break Free</h2>
                <p className="fs-3">
                  Need or just want to leave? We got you. List your apartment
                  and we will take care of the rest. Our AI will find just the
                  right person you can sublease to.
                </p>
              </div>
              <div className="position-absolute card-top">
                <img
                  src={
                    "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712693237798x874066794275054200%2Fpexels-photo-2834211.jpeg?w=128&h=193&auto=compress&dpr=1.25&fit=max"
                  }
                  className="card-top-image"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 p-5">
            <div className="card position-relative">
              <div
                className="card-body p-4"
                style={{ backgroundColor: "#F3E9D2" }}
              >
                <h2 className="fs-1 fw-bold offer-card-mt">Short or Long</h2>
                <p className="fs-3">
                  With our vast pool of renters and integrated AI, we will find
                  the perfect lease and apartment for you to fulfill all your
                  needs.
                </p>
              </div>
              <div className="position-absolute card-top">
                <img
                  src={
                    "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712693090138x948224690641547500%2Fstairs-home-loft-lifestyle.jpg?w=192&h=257&auto=compress&dpr=1.25&fit=max"
                  }
                  className="card-top-image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="div__image-timeline">
          <img
            className="offer-image-timeline"
            src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713453977216x242962464222256540%2FGuide%2520%25281%2529.png?w=1536&h=598&auto=compress&dpr=1.25&fit=max"
            alt=""
          />
        </div>
        <div className="row offer__testi bg-dull h-100">
          <div className="col-lg-6">
            <div className="texti__left d-flex flex-column h-100 justify-content-center">
              <h4>
                Our goal is to help renters find their desired home for the
                desired time.
              </h4>
              <p className="text-muted fs-2">
                Our service unlocks all your rental opportunities for all type
                of renters, because we won't let a lease restrict you.{" "}
              </p>
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <div className="d-flex flex-row justify-content-center gap-4 testi__titles">
                    <span>Susan K.</span>
                    <span>John D.</span>
                    <span>Mike L.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <div className="position-relative">
                <img
                  src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712696465262x282389592233150530%2Fpexels-photo-1381679.jpeg?w=512&h=768&auto=compress&dpr=1.25&fit=max"
                  alt=""
                  className="offer__test--main__image"
                />
                <div className="position-absolute offer__first texti_box">
                  <p className="fs-4">
                    "I had a sudden promotion at work that required me to
                    relocate and thanks to Casper I was able to sublet my
                    apartment until the end of my lease term. The process was so
                    smooth and time saving."
                  </p>
                </div>
                <div className="position-absolute offer__second">
                  <img
                    className="offer__second-image"
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712695572188x647656484528914000%2Fpexels-photo-3190541.jpeg?w=384&h=575&auto=compress&dpr=1.25&fit=max"
                    alt=""
                  />
                </div>
                <div className="position-absolute offer__third">
                  <img
                    className="offer__third-image"
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712695496442x911226427883441400%2Fpexels-photo-712513.jpeg?w=256&h=256&auto=compress&dpr=1.25&fit=max"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offer;
