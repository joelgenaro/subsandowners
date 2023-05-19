import React, { useState, useRef, useEffect } from "react";
import {
  Col,
  Row,
  Nav,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Input,
  Form,
  NavItem,
  CardBody,
  Label,
} from "reactstrap";
import classnames from "classnames";
import userImage2 from "../../assets/images/user/img-02.jpg";

const Content = () => {
  const [activeTab, setActiveTab] = useState("1");
  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const role = localStorage.getItem("role");

  return (
    <React.Fragment>
      <Row>
        <Col lg={4}>
          <Card className="profile-sidebar me-lg-4">
            <CardBody className="p-4">
              <Nav
                className="profile-content-nav nav-pills border-bottom mb-4"
                id="pills-tab"
                role="tablist"
                vertical
              >
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    Email
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    Membership
                  </NavLink>
                </NavItem>
                <NavItem role="presentation">
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    type="button"
                  >
                    Password
                  </NavLink>
                </NavItem>
                {role == "sub" ? (
                  <NavItem role="presentation">
                    <NavLink
                      to="#"
                      className={classnames({ active: activeTab === "4" })}
                      onClick={() => {
                        tabChange("4");
                      }}
                      type="button"
                    >
                      Service
                    </NavLink>
                  </NavItem>
                ) : null}
              </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="profile-content-page mt-4 mt-lg-0">
            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <div>
                    <h5 className="fs-18 fw-bold">Email</h5>
                    <p className="text-muted mt-4"></p>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div>
                    <h5 className="fs-18 fw-bold">Memebership</h5>
                    <p className="text-muted mt-4"></p>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div>
                    <h5 className="fs-18 fw-bold">Password</h5>
                    <p className="text-muted mt-4"></p>
                  </div>
                </TabPane>
                {role == "sub" ? (
                  <TabPane tabId="4">
                    <div>
                      <h5 className="fs-18 fw-bold">Service</h5>
                      <p className="text-muted mt-4"></p>
                    </div>
                  </TabPane>
                ) : null}
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Content;
