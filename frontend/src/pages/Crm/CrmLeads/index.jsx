import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
  Table,
  ButtonGroup,
  UncontrolledButtonDropdown,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";


const CrmLeads = () => {
  document.title = "Leads";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Viewings" pageTitle="" />
          <Row>
            <Col lg={12}>
              <Card id="leadsList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <Col sm={3}>
                      <div className="search-box">
                        <Input
                          type="text"
                          className="form-control search"
                          placeholder="Search for..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="table-responsive">
                    <Table className="table-striped table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Date</th>
                          <th scope="col">Action</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="fw-medium">01</td>
                          <td>Bobby Davis</td>
                          <td>Contact info</td>
                          <td>Nov 14, 2021</td>
                          <td>
                            <ButtonGroup>
                              <UncontrolledButtonDropdown id="btnGroupDrop1">
                                <DropdownToggle color="transparent" >
                                  <span className="badge bg-danger">
                                    Decline
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    {" "}
                                    <span className="badge bg-success">
                                      Accept
                                    </span>{" "}
                                  </DropdownItem>
                                  <DropdownItem>
                                    {" "}
                                    <span className="badge bg-warning">
                                      Reshedule
                                    </span>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                            </ButtonGroup>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">02</td>
                          <td>Christopher Neal</td>
                          <td>Contact info</td>
                          <td>Nov 21, 2021</td>
                          <td>
                            <ButtonGroup>
                              <UncontrolledButtonDropdown id="btnGroupDrop1">
                                <DropdownToggle color="transparent">
                                  <span className="badge bg-success">
                                    Accept
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <span className="badge bg-danger">
                                      Decline
                                    </span>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <span className="badge bg-warning">
                                      Reshedule
                                    </span>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                            </ButtonGroup>{" "}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">03</td>
                          <td>Monkey Karry</td>
                          <td>Contact info</td>
                          <td>Nov 24, 2021</td>
                          <td>
                            <ButtonGroup>
                              <UncontrolledButtonDropdown id="btnGroupDrop1">
                                <DropdownToggle color="transparent" >
                                  <span className="badge bg-danger">
                                    Decline
                                  </span>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    {" "}
                                    <span className="badge bg-success">
                                      Accept
                                    </span>{" "}
                                  </DropdownItem>
                                  <DropdownItem>
                                    {" "}
                                    <span className="badge bg-warning">
                                      Reshedule
                                    </span>
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledButtonDropdown>
                            </ButtonGroup>{" "}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-light"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CrmLeads;
