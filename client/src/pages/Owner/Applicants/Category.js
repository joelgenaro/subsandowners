import React, { useState } from "react";
import { Nav, NavLink, NavItem, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import ReviewProposals from "./ReviewProposals/ReviewProposals";
import ViewJobPost from "./ViewJobPost/ViewJobPost";
import InviteFreelancers from "./InviteFreelancers/InviteFreelancers";
import Hire from "./Hire/Hire";

const Category = () => {
  const [activeTab, setActiveTab] = useState("3");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [basicActiveTab, setBasicActiveTab] = useState("3");

  const basicTabChange = (tab) => {
    if (basicActiveTab !== tab) setBasicActiveTab(tab);
  };

  return (
    <React.Fragment>
      <Nav className="nav-pills custom " role="tablist">
        <NavItem className="waves-effect waves-light category">
          <NavLink
            to="#"
            className={classnames({ active: basicActiveTab === "1" })}
            onClick={() => {
              basicTabChange("1");
            }}
            type="button"
          >
            <span>VIEW JOB POST</span>
          </NavLink>
        </NavItem>
        <NavItem className="waves-effect waves-light category">
          <NavLink
            to="#"
            className={classnames({ active: basicActiveTab === "2" })}
            // onClick={() => {
            //   basicTabChange("2");
            // }}
            type="button"
          >
            <span>INVITE FREELANCERS </span>
          </NavLink>
        </NavItem>
        <NavItem className="waves-effect waves-light category">
          <NavLink
            to="#"
            className={classnames({ active: basicActiveTab === "3" })}
            onClick={() => {
              basicTabChange("3");
            }}
            type="button"
          >
            <span>REVIEW PROPOSALS</span>
          </NavLink>
        </NavItem>
        <NavItem className="waves-effect waves-light category">
          <NavLink
            to="#"
            className={classnames({ active: basicActiveTab === "4" })}
            onClick={() => {
              basicTabChange("4");
            }}
            type="button"
          >
            <span>HIRE</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent
        activeTab={basicActiveTab}
        className="tab-content p-4 text-muted"
      >
        <TabPane tabId="1">
          <ViewJobPost />
        </TabPane>
        <TabPane tabId="2">
          <InviteFreelancers />
        </TabPane>
        <TabPane tabId="3">
          <ReviewProposals />
        </TabPane>
        <TabPane tabId="4">
          <Hire />
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};
export default Category;
