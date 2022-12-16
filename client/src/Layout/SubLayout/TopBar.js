import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
