import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

//import images
import flagUs from "../../assets/images/flags/us.jpg";
import flagSp from "../../assets/images/flags/spain.jpg";
import flagGr from "../../assets/images/flags/germany.jpg";
import flagIt from "../../assets/images/flags/italy.jpg";
import flagRu from "../../assets/images/flags/russia.jpg";

const TopBar = () => {
  const iconTobar = [
    {
      id: 1,
      classname: "uil uil-whatsapp",
    },
    {
      id: 2,
      classname: "uil uil-facebook-messenger-alt",
    },
    {
      id: 3,
      classname: "uil uil-instagram",
    },
    {
      id: 4,
      classname: "uil uil-envelope",
    },
    {
      id: 5,
      classname: "uil uil-twitter-alt",
    },
  ];
  //Language Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //Signup Modal
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className="top-bar" style={{ zIndex: 1030 }}>
        <Container fluid className="custom-container">
          <Row className="g-0 align-items-center">
            <Col md={7}>
              <ul className="list-inline mb-0 text-center text-md-start">
                <li className="list-inline-item">
                  <p className="fs-13 mb-0">
                    {" "}
                    <i className="mdi mdi-map-marker"></i>
                  </p>
                </li>
                <li className="list-inline-item">
                  <ul className="topbar-social-menu list-inline mb-0">
                    {(iconTobar || []).map((icon, key) => (
                      <li className="list-inline-item" key={key}>
                        <Link to="/" className="social-link">
                          <i className={icon.classname}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </Col>

            <Col md={5}>
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item py-2 me-2 align-middle">
                  <span
                    onClick={openModal}
                    role="button"
                    className="text-dark fw-medium fs-13"
                  >
                    <i className="uil uil-lock"></i>
                  </span>
                </li>
                <li className="list-inline-item align-middle">
                  <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggle}
                    className="d-inline-block language-switch"
                  >
                    <DropdownMenu className="dropdown-menu-end" end>
                      <DropdownItem
                        to="/"
                        className="dropdown-item notify-item language"
                        data-lang="eng"
                      >
                        <img src={flagUs} alt="" className="me-1" height="12" />
                        <span className="align-middle">English</span>
                      </DropdownItem>
                      <DropdownItem
                        to="/"
                        className="dropdown-item notify-item language"
                        data-lang="sp"
                      >
                        <img src={flagSp} alt="" className="me-1" height="12" />
                        <span className="align-middle">Spanish</span>
                      </DropdownItem>
                      <DropdownItem
                        to="/"
                        className="dropdown-item notify-item language"
                        data-lang="gr"
                      >
                        <img src={flagGr} alt="" className="me-1" height="12" />
                        <span className="align-middle">German</span>
                      </DropdownItem>
                      <DropdownItem
                        to="/"
                        className="dropdown-item notify-item language"
                        data-lang="it"
                      >
                        <img src={flagIt} alt="" className="me-1" height="12" />
                        <span className="align-middle">Italian</span>
                      </DropdownItem>
                      <DropdownItem
                        to="/"
                        className="dropdown-item notify-item language"
                        data-lang="ru"
                      >
                        <img src={flagRu} alt="" className="me-1" height="12" />
                        <span className="align-middle">Russian</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
