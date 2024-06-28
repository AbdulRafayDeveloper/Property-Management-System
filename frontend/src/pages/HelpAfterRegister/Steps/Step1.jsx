import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';


function Step1({ validation }) {

  return (
    <Row>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-email-input">
            First Name
          </Label>
          <Input
            name="firstName"
            className="form-control"
            placeholder="Enter first name"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.firstName || ''}
            invalid={validation.touched.firstName && validation.errors.firstName ? true : false}
          />
          {validation.touched.firstName && validation.errors.firstName ? (
            <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-username-input">
            Middle Name
          </Label>
          <Input
            name="middleName"
            className="form-control"
            placeholder="Enter middle name (Otional)"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.middleName || ''}
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-username-input">
            Last Name
          </Label>
          <Input
            name="lastName"
            className="form-control"
            placeholder="Enter last name"
            type="text"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.lastName || ''}
            invalid={validation.touched.lastName && validation.errors.lastName ? true : false}
          />
          {validation.touched.lastName && validation.errors.lastName ? (
            <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback>
          ) : null}{' '}
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-email-input">
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
          {validation.touched.email && validation.errors.email ? (
            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-password-input">
            Create a Password
          </Label>
          <Input
            name="password"
            className="form-control"
            placeholder="Enter password"
            type="password"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.password || ''}
            invalid={validation.touched.password && validation.errors.password ? true : false}
          />
          {validation.touched.password && validation.errors.password ? (
            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
          ) : null}
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label" htmlFor="gen-info-email-input">
            Birthday
          </Label>
          <Input
            name="birthday"
            className="form-control"
            type="date"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.birthday || ''}
            invalid={validation.touched.birthday && validation.errors.birthday ? true : false}
          />
          {validation.touched.birthday && validation.errors.birthday ? (
            <FormFeedback type="invalid">{validation.errors.birthday}</FormFeedback>
          ) : null}{' '}
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <Label className="form-label">Gender</Label>
          <Input
            type="select"
            className="form-control"
            name="gender"
            value={validation.values.gender}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            invalid={validation.touched.gender && !!validation.errors.gender}
          >
            <option value="Prefer not to say">Prefer not to say</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Input>
          {validation.touched.gender && validation.errors.gender ? (
            <FormFeedback type="invalid">{validation.errors.gender}</FormFeedback>
          ) : null}
        </div>
      </Col>
    </Row>
  );
}

export default Step1;
