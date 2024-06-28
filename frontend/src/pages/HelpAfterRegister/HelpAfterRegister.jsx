import React, { useState } from 'react';
import { Form, Card, CardBody, CardHeader, Container, Row, Col, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';

import AuthSlider from '../AuthenticationInner/authCarousel';

import * as Yup from 'yup';
//Import images
import { loadAnimation } from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { ProgressBar } from 'react-bootstrap';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';

// register lottie and define custom element
defineElement(loadAnimation);

function WizardRegister() {
  const [passwordShow, setPasswordShow] = useState(false);

  const [step, setStep] = useState(1);

  // Handling step transition and validation
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: 'Prefer not to say',

    // step 2
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    employment: 'Employed',
    schoolName: '',
    schoolYear: '',

    // step 3
    isEmailVerified: false,

    // step 4
    profileImage: '',
    intro: '',
    IDImage: ''
  });

  // Yup.addMethod(Yup.mixed, 'fileRequired', function (message) {
  //   return this.test('fileRequired', message, (value) => {
  //     return value && typeof(value) == 'string' && value.length > 0;
  //   });
  // });

  const stepValidationSchemas = [
    Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Email is not valid').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(RegExp('(.*[a-z].*)'), 'At least lowercase letter')
        .matches(RegExp('(.*[A-Z].*)'), 'At least uppercase letter')
        .matches(RegExp('(.*[0-9].*)'), 'At least one number')
        .required('This field is required'),
      birthday: Yup.string().required('Birthday is required')

      // movingType: Yup.array()
      //   .of(Yup.string().required('Each moving type is required'))
      //   .min(1, 'At least one removal type is required')
      //   .required('Moving type is required')
    }),
    Yup.object().shape({
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string().required('Zip code is required'),
      country: Yup.string().required('Country is required'),
      employment: Yup.string().required('Employment is required'),
      schoolName: Yup.string().when('employment', (employment, schema) => {
        if (employment == 'Student') return schema.required('School name is required');
        return schema;
      }),
      schoolYear: Yup.string().when('employment', (employment, schema) => {
        if (employment == 'Student') return schema.required('School year is required');
        return schema;
      })
    }),
    Yup.object().shape({
      isEmailVerified: Yup.boolean().oneOf([true], 'Please verify your email to continue')
    }),
    Yup.object().shape({
      profileImage: Yup.mixed().required('Profile image is required'),
      IDImage: Yup.mixed().required('ID is required'),
      intro: Yup.string().required('Intro is required')
    }),

    Yup.object().shape({
      companyName: Yup.string().required('Company name is required'),
      businessType: Yup.string().required('Business type is required'),
      companyNumber: Yup.string().when('businessType', (businessType, schema) => {
        if (businessType == 'company') return schema.required('Company number is required');
        return schema;
      }),
      noOfEmployees: Yup.string().required('Number of employees is required'),
      aboutEmail: Yup.string().email('Email is not valid').required('Email is required'),
      aboutTelephone: Yup.string().required('Telephone is required'),
      isCorrectTelephone: Yup.boolean().oneOf([true], 'Telephone is not valid'),
      isCorrectPostalCode: Yup.boolean().oneOf([true], 'Postal code is not valid'),
      addressLine1: Yup.string().required('Address is required'),
      aboutTown: Yup.string().required('Town is required'),
      aboutPoscode: Yup.string().required('Postcode is required')
    }),
    Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required')
    })
  ];

  const currentValidationSchema = stepValidationSchemas[step - 1];

  const goBack = () => {
    setStep(step - 1);
    validation.setTouched({});
    validation.setSubmitting(false);
  };

  const [emailLoading, setEmailLoading] = useState();
  const handleVerifyEmail = async (actions) => {
    setEmailLoading(true);
    // call api
    setTimeout(() => {
      setEmailLoading(false);
      setStep(step + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }, 2000);
  };

  const handleSubmit = async (values, actions) => {
    if (step == 2) {
      await handleVerifyEmail(actions);
    } else if (step < 5) {
      setStep(step + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: values,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit
  });

  document.title = 'Wizard';

  return (
    <React.Fragment>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="overflow-hidden m-0">
                  <Row className="justify-content-center g-0">
                    <AuthSlider />

                    <Col lg={6}>
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Register Account</h5>
                          <p className="text-muted">Get your Free Velzon account now.</p>
                        </div>

                        <Form
                          className="mt-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                          action="#"
                        >
                          {step == 1 && <Step1 validation={validation} />}
                          {step == 2 && <Step2 validation={validation} />}
                          {step == 3 && <Step3 validation={validation} />}
                          {step == 4 && <Step4 validation={validation} />}

                          <div className="d-flex gap-2">
                            {!validation.values.isEmailVerified && step > 1 && (
                              <button type="button" onClick={goBack} className="btn btn-outline-success w-100 mt-4 fw-bold">
                                <FaArrowLeftLong className="me-1" /> Go back
                              </button>
                            )}

                            <button
                              type="submit"
                              disabled={emailLoading}
                              className="btn d-flex gap-2 justify-content-center align-items-center btn-success w-100 mt-4 fw-bold"
                            >
                              {emailLoading && <Spinner size="sm" />}
                              {step === 4 ? 'Submit' : step == 2 ? "Let's verify your email" : 'Proceed to next step'}
                              <FaArrowRightLong />
                            </button>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Already have an account ?{' '}
                            <Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline">
                              {' '}
                              Signin
                            </Link>{' '}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        <footer className="footer">
          <Container>
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">
                    {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default WizardRegister;
