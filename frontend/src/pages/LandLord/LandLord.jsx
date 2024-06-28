import React from "react";
import interior7 from "../../assets/images/interior7.jpg";
import Offer from "./Components/Offer";
import FAQ from "./Components/FAQ";

function LandLord() {
  return (
    <main className='landing__pages'>
      <section className="" style={{ marginTop: "18rem" }}>
        <div className="row px-10rem">
          <div className="col-lg-6">
            <div className="d-flex flex-column justify-content-center h-100">
              <h2>Streamline Your Rental Experience with</h2>
              <p className="fs-2">
                Easy Listings, Verified Tenants, and Simplified Property
                Management
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-content-center">
              <img
                src={interior7}
                alt="LandLord"
                style={{
                  width: "80%",
                  objectFit: "cover",
                  height: "40rem",
                  borderRadius: "40px",
                }}
              />
            </div>
          </div>
        </div>
        <Offer />
        <FAQ />
      </section>
    </main>
  );
}

export default LandLord;
