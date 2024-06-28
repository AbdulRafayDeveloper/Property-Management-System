import React from 'react';

function Audience() {
  return (
    <section className="audience">
      <div className="d-flex justify-content-center">
        <h2 className="audience__heading">
          Unlock Seamless Flexible Lease Transitions and Effortless Rental Management with Casper - Your All-in-One Solution!
        </h2>
      </div>
      <div className="row mt-6">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <div className="d-lg-flex gap-5">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <div class="p-5">
                      <h5 class="card-title">Landlord</h5>
                      <p>Discover Peace of Mind - </p>
                      <p>Secure your investments with qualified renters, protect and manage all your properties, and increase your ROI</p>
                      <button className="primary-btn mt-4">Learn more</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <img
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712686895145x391303376448144200%2Fpexels-photo-2682452.jpeg?w=384&h=577&auto=compress&dpr=1.25&fit=max"
                    class="img-fluid rounded-start h-100"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1712688603532x350794710487936960%2Fpexels-photo-774909.jpeg?w=384&h=577&auto=compress&dpr=1.25&fit=max"
                    class="img-fluid rounded-start h-100"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <div class="p-5">
                      <h5 class="card-title">Renters</h5>
                      <p>Live wherever and leave whenever.</p>
                      <p>
                        Say goodbye to lease worries - Sublet your space quickly and easily. Your solution for Hassle-free lease
                        transitions.
                      </p>
                      <button className="primary-btn mt-4">Learn more</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </section>
  );
}

export default Audience;
