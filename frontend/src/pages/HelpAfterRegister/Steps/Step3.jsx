import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'reactstrap';

const Step3 = ({ validation }) => {
  const [d1, setD1] = useState();
  const [d2, setD2] = useState();
  const [d3, setD3] = useState();
  const [d4, setD4] = useState();
  const getInputElement = (index) => {
    return document.getElementById('digit' + index + '-input');
  };

  const moveToNext = (index) => {
    if (getInputElement(index).value.length === 1) {
      if (index !== 4) {
        getInputElement(index + 1).focus();
      } else {
        getInputElement(index).blur();
        // Submit code
        console.log('submit code');
      }
    }
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    if ((d1, d2, d3, d4)) {
      console.log(d1, d2, d3, d4);
      validation.setFieldValue('isEmailVerified', true);
    }
  };

  return (
    <>
      {validation.values.isEmailVerified ? (
        <div className="pt-3 text-center">
          <div className="avatar-lg mx-auto mt-2">
            <div className="avatar-title bg-light text-success display-3 rounded-circle">
              <i className="ri-checkbox-circle-fill"></i>
            </div>
          </div>
          <div className="mt-4 pt-2">
            <h4>Email address verified !</h4>
            <p className="text-muted mx-4">Aww yeah, you successfully verify your email.</p>
          </div>
        </div>
      ) : (
        <div className="p-lg-5 p-4">
          <div className="mb-4">
            <div className="avatar-lg mx-auto">
              <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                <i className="ri-mail-line"></i>
              </div>
            </div>
          </div>
          <div className="text-muted text-center mx-lg-3">
            <h4 className="">Verify Your Email</h4>
            <p>
              Please enter the 4 digit code sent to <span className="fw-semibold">{validation.values.email}</span>
            </p>
          </div>

          <div className="mt-4">
            <form onSubmit={confirmHandler}>
              <Row>
                <Col className="col-3">
                  <div className="mb-3">
                    <label htmlFor="digit1-input" className="visually-hidden">
                      Digit 1
                    </label>
                    <input
                      value={d1}
                      onChange={(e) => setD1(e.target.value)}
                      type="text"
                      className="form-control form-control-lg bg-light border-light text-center"
                      maxLength="1"
                      id="digit1-input"
                      onKeyUp={() => moveToNext(1)}
                    />
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="mb-3">
                    <label htmlFor="digit2-input" className="visually-hidden">
                      Digit 2
                    </label>
                    <input
                      value={d2}
                      onChange={(e) => setD2(e.target.value)}
                      type="text"
                      className="form-control form-control-lg bg-light border-light text-center"
                      maxLength="1"
                      id="digit2-input"
                      onKeyUp={() => moveToNext(2)}
                    />
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="mb-3">
                    <label htmlFor="digit3-input" className="visually-hidden">
                      Digit 3
                    </label>
                    <input
                      value={d3}
                      onChange={(e) => setD3(e.target.value)}
                      type="text"
                      className="form-control form-control-lg bg-light border-light text-center"
                      maxLength="1"
                      id="digit3-input"
                      onKeyUp={() => moveToNext(3)}
                    />
                  </div>
                </Col>

                <Col className="col-3">
                  <div className="mb-3">
                    <label htmlFor="digit4-input" className="visually-hidden">
                      Digit 4
                    </label>
                    <input
                      value={d4}
                      onChange={(e) => setD4(e.target.value)}
                      type="text"
                      className="form-control form-control-lg bg-light border-light text-center"
                      maxLength="1"
                      id="digit4-input"
                      onKeyUp={() => moveToNext(4)}
                    />
                  </div>
                </Col>
              </Row>

              <div className="mt-3">
                <Button type="button" onClick={confirmHandler} color="success" className="w-100">
                  Confirm
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-5 text-center">
            <p className="mb-0">
              Didn't receive a code ?{' '}
              <Link to="/auth-pass-reset-cover" className="fw-semibold text-primary text-decoration-underline">
                Resend
              </Link>{' '}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Step3;
