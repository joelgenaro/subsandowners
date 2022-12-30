import React, { useState, useEffect } from "react";
import { Container, Collapse, NavbarToggler, NavItem } from "reactstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, authReset } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, withRouter, useHistory } from "react-router-dom";
import darkLogo from "../../assets/images/logo-dark.png";
import lightLogo from "../../assets/images/logo-light.png";

const NavBar = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { authToken, isLogoutSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const Token = cookies.token;
  const Role = cookies.role;

  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //Notification Dropdown
  const [notification, setNotification] = useState(false);
  const dropDownnotification = () => setNotification((prevState) => !prevState);

  //user Profile Dropdown
  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  //scroll navbar
  const [navClass, setnavClass] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  // authentication
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isLogoutSuccess) {
      window.location.reload();
    }
    dispatch(authReset());
  }, [isLogoutSuccess, isError, message, history, dispatch]);

  //menu activation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    var matchingMenuItem = null;
    var ul = document.getElementById("navbarCollapse");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  // Logout
  const logoutHandler = (e) => {
    dispatch(logoutUser());
  };

  function scrollNavigation() {
    var scrollup = window.pageYOffset;
    if (scrollup > 0) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  }

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement.parentElement.parentElement;

    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg fixed-top sticky p-0 " + navClass}
        id="navigation"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand text-dark fw-bold me-auto" to="/">
            <img src={darkLogo} height="22" alt="" className="logo-dark" />
            <img src={lightLogo} height="22" alt="" className="logo-light" />
          </Link>
          <div>
            <NavbarToggler className="me-3" type="button">
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              {Role == "owner" ? (
                <>
                  {" "}
                  <NavItem>
                    <Link className="nav-link" to="/jobpost">
                      Job post
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/candidatelist">
                      candidate list
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/joblist">
                      job list
                    </Link>
                  </NavItem>
                </>
              ) : (
                ""
              )}
              {Role == "subcontractor" ? (
                <>
                  {" "}
                  <NavItem>
                    <Link className="nav-link" to="/joblist">
                      Job list
                    </Link>
                  </NavItem>
                </>
              ) : (
                ""
              )}
            </ul>
          </Collapse>

          <ul className="navbar-nav mx-auto navbar-center">
            {Token ? (
              <>
                <NavItem>
                  <Link
                    className="nav-link"
                    onClick={logoutHandler}
                    to="signin"
                  >
                    log out
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link className="nav-link" to="/signin">
                    log in
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/chooseOption">
                    sign up
                  </Link>
                </NavItem>
              </>
            )}
          </ul>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
