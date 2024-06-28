import React from "react";
import { Col, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const Section = (props) => {
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">Good Morning, Anna!</h4>
              {/* <p className="text-muted mb-0">Here's what's happening with your store today.</p> */}
            </div>
            <div className="mt-3 mt-lg-0">
              <form action="#">
                <Row className="g-3 mb-0 align-items-center">
                  <div className="col-sm-auto">
                    <div className="input-group">
                      <Flatpickr
                        className="form-control border-0 dash-filter-picker shadow rounded-pill"
                        options={{
                          mode: "range",
                          dateFormat: "d M, Y",
                          defaultDate: ["01 Jan 2022", "31 Jan 2022"],
                        }}
                      />
                      {/* <div className="input-group-text bg-primary border-primary text-white">
                        <i className="ri-calendar-2-line"></i>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-auto">
                    {/* <button type="button" className="btn btn-soft-success shadow-none"><i className="ri-add-circle-line align-middle me-1"></i> Add Product</button> */}
                    <select className="form-select rounded-pill">
                      <option defaultValue="1">All</option>
                      <option defaultValue="2">Property 1</option>
                      <option defaultValue="3">Property 2</option>
                    </select>
                  </div>
                  <div className="col-auto">
                  <select className="form-select rounded-pill">
                      <option defaultValue="1">Last 30 days</option>
                      <option defaultValue="2">Last 3 months</option>
                      <option defaultValue="3">Last year</option>
                    </select>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
