import React, { useState } from 'react';
import { Row, Col, Label, Input, FormFeedback } from 'reactstrap';

const data = [
  // {
  //   name: 'Address',
  //   key: 'address'
  // },
  // {
  //   name: 'City',
  //   key: 'city'
  // },
  // {
  //   name: 'State',
  //   key: 'state'
  // },
  // {
  //   name: 'Zip Code',
  //   key: 'zipCode'
  // },
  {
    name: 'Current Address',
    key: 'address'
  },
  {
    name: 'Employment',
    key: 'employment',
    type: 'select',
    options: ['Employed', 'Unemployed', {key:'Self Employed', value:'Self Employed'}, 'Student']
  }
];

const Step2 = ({ validation }) => {
  return (
    <Row>
      {data?.map((d, i) => {
        return (
          <Col lg={12}>
            <div key={i} className="mb-3">
              <Label className="form-label">{d.name}</Label>
              {d?.type == 'select' ? (
                <Input
                  name={d.key}
                  className="form-control"
                  placeholder={`Enter ${d.placeholder || d.name}`}
                  type={d.type}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values[d.key] || ''}
                  invalid={validation.touched[d.key] && validation.errors[d.key] ? true : false}
                >
                  {d.options?.map((option, j) => {
                    if (typeof option === 'string') return <option key={option}>{option}</option>;
                    else return <option key={option.value}>{option.key}</option>;
                  })}
                </Input>
              ) : (
                <Input
                  name={d.key}
                  className="form-control"
                  placeholder={`Enter ${d.placeholder || d.name}`}
                  type={'text'}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values[d.key] || ''}
                  invalid={validation.touched[d.key] && validation.errors[d.key] ? true : false}
                />
              )}
              {validation.touched[d.key] && validation.errors[d.key] ? (
                <FormFeedback type="invalid">{validation.errors[d.key]}</FormFeedback>
              ) : null}
            </div>
          </Col>
        );
      })}
      {validation.values.employment == 'Student' ? (
        <>
          <Col lg={6}>
            <Label className="form-label">School name</Label>
            <Input
              name={'schoolName'}
              className="form-control"
              placeholder={`Enter school name`}
              type={'text'}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.schoolName || ''}
              invalid={validation.touched.schoolName && validation.errors.schoolName ? true : false}
            />
            {validation.touched.schoolName && validation.errors.schoolName ? (
              <FormFeedback type="invalid">{validation.errors.schoolName}</FormFeedback>
            ) : null}
          </Col>
          <Col lg={6}>
            <Label className="form-label">School year</Label>
            <Input
              name={'schoolYear'}
              className="form-control"
              placeholder={`Enter year`}
              type={'text'}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.schoolYear || ''}
              invalid={validation.touched.schoolYear && validation.errors.schoolYear ? true : false}
            />
            {validation.touched.schoolYear && validation.errors.schoolYear ? (
              <FormFeedback type="invalid">{validation.errors.schoolYear}</FormFeedback>
            ) : null}
          </Col>
        </>
      ) : (
        ''
      )}
    </Row>
  );
};

export default Step2;
