import React from "react";
import CountUp from "react-countup";

const PaymentRecieved = () => {
  return (
    <React.Fragment>
      <div className="col-xl-12">
        <div className="card crm-widget">
          <div className="card-body p-0">
            <div className="">
              <div className="">
                <div className="py-4 px-3">
                  <h5 className="text-muted text-uppercase fs-13">
                    Rent Recieved
                  </h5>
                  <div className="d-flex gap-5 align-items-center justify-content-center">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className={" display-6 text-muted"}></i>
                      </div>
                      <div className="flex-grow-1 ms-3 text-info">
                        <h2 className="mb-0">
                          <span className="counter-value" data-target="197">
                            <CountUp
                              start={0}
                              prefix={"€"}
                              separator={","}
                              end={107867}
                              decimals={0}
                              className="text-info"
                              duration={4}
                            />
                          </span>
                        </h2>
                        <span>Recieved</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className={" display-6 text-muted"}></i>
                      </div>
                      <div className="flex-grow-1 ms-3 ">
                        <h2 className="mb-0">
                          <span className="counter-value" data-target="197">
                            <CountUp
                              start={0}
                              prefix={"€"}
                              separator={","}
                              end={107867}
                              decimals={0}
                              duration={4}
                            />
                          </span>
                        </h2>
                        <span>Overdue Rent</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <i className={" display-6 text-muted"}></i>
                      </div>
                      <div className="flex-grow-1 ms-3 ">
                        <h2 className="mb-0">
                          <span className="counter-value" data-target="197">
                            <CountUp
                              start={0}
                              prefix={"€"}
                              separator={","}
                              end={107867}
                              decimals={0}
                              duration={4}
                            />
                          </span>
                        </h2>
                        <span>Total Due</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentRecieved;
