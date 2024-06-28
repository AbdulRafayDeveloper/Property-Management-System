import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import ProjectsStatus from "../DashboardProject/ProjectsStatus";
import PaymentRecieved from "./PaymentRecieved";
import BalanceOverview from "../DashboardCrm/BalanceOverview";
import DealsStatus from "../DashboardCrm/DealsStatus";

const DashboardEcommerce = () => {
  document.title = "Dashboard";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widget />
                </Row>
                <Row>
                  <ProjectsStatus />
                  <BalanceOverview />

                </Row>
                <Row>
                  <DealsStatus />
                  <Col xl={6}>
                    <PaymentRecieved />
                  </Col>

                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
