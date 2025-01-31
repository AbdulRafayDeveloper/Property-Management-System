import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import withRouter from '../../Components/Common/withRouter';
// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// actions
import { loginUser, socialLogin, resetLoginFlag } from '../../slices/thunks';

import logoLight from '../../assets/images/logoBlue.png';

import { createSelector } from 'reselect';
import { postToServerNoToken } from '../../helpers/requests';
import { toast } from 'react-toastify';
import { setUserDataR } from '../../slices/store/userSlice';
import { localItems } from '../../helpers/utils';
//import images

const Login = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const validation = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Please Enter Your Email'),
			password: Yup.string().required('Please Enter Your Password')
		}),
		onSubmit: async (values) => {
			const result = await postToServerNoToken('user/login', { email: values.email, password: values.password });
			if (result.status) {
                const user = result.data.data
                toast.success('User successfully login')
                localStorage.setItem(localItems['token'], result.data.access)
				dispatch(setUserDataR(user));
                if(user.isLandlord){
                    navigate('/dashboard')
                }
                else{
                    navigate('/saved-properties')
                }
			} else {
				toast.error(result.message);
			}
		}
	});

	document.title = 'Casper Login';
	return (
		<React.Fragment>
			<ParticlesAuth>
				<div className="auth-page-content">
					<Container>
						<Row>
							<Col lg={12}>
								<div className="text-center mt-sm-5 mb-4 text-white-50">
									<div>
										<Link to="/" className="d-inline-block auth-logo">
											<img src={logoLight} alt="" height="100" />
										</Link>
									</div>
									{/* <p className="mt-3 fs-15 fw-medium">Signin to continue</p> */}
								</div>
							</Col>
						</Row>

						<Row className="justify-content-center">
							<Col md={8} lg={6} xl={5}>
								<Card className="mt-4">
									<CardBody className="p-4">
										<div className="text-center mt-2">
											<h5 className="text-primary">Welcome Back !</h5>
											<p className="text-muted">Sign in to continue to Casper.</p>
										</div>
										<div className="p-2 mt-4">
											<Form
												onSubmit={(e) => {
													e.preventDefault();
													validation.handleSubmit();
													return false;
												}}
												action="#"
											>
												<div className="mb-3">
													<Label htmlFor="email" className="form-label">
														Email
													</Label>
													<Input
														name="email"
														className="form-control"
														placeholder="Enter email"
														type="email"
														onChange={validation.handleChange}
														onBlur={validation.handleBlur}
														value={validation.values.email || ''}
														invalid={validation.touched.email && validation.errors.email ? true : false}
													/>
													{validation.touched.email && validation.errors.email ? <FormFeedback type="invalid">{validation.errors.email}</FormFeedback> : null}
												</div>

												<div className="mb-3">
													{/* <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div> */}
													<Label className="form-label" htmlFor="password-input">
														Password
													</Label>
													<div className="position-relative auth-pass-inputgroup mb-3">
														<Input
															name="password"
															value={validation.values.password || ''}
															type={showPassword ? 'text' : 'password'}
															className="form-control pe-5"
															placeholder="Enter Password"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															invalid={validation.touched.password && validation.errors.password ? true : false}
														/>
														{validation.touched.password && validation.errors.password ? <FormFeedback type="invalid">{validation.errors.password}</FormFeedback> : null}
														<button
															className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted shadow-none"
															onClick={() => setShowPassword(!showPassword)}
															type="button"
															id="password-addon"
														>
															<i className="ri-eye-fill align-middle"></i>
														</button>
													</div>
												</div>

												<div className="form-check">
													<Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
													<Label className="form-check-label" htmlFor="auth-remember-check">
														Remember me
													</Label>
												</div>

												<div className="mt-4">
													<Button color="success" className="btn btn-success w-100" type="submit">
														{loading ? (
															<Spinner size="sm" className="me-2">
																{' '}
																Loading...{' '}
															</Spinner>
														) : null}
														Sign In
													</Button>
												</div>
											</Form>
										</div>
									</CardBody>
								</Card>

								<div className="mt-4 text-center">
									<p className="mb-0">
										Don't have an account ?{' '}
										<Link to="/register" className="fw-semibold text-primary text-decoration-underline">
											{' '}
											Signup{' '}
										</Link>{' '}
									</p>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</ParticlesAuth>
		</React.Fragment>
	);
};

export default withRouter(Login);
