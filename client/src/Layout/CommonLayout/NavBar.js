import React, { useState, useEffect } from "react";
import {
  Container,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { Link, withRouter, useHistory } from "react-router-dom";
import classname from "classnames";

import darkLogo from "../../assets/images/logo-dark.png";
import lightLogo from "../../assets/images/logo-light.png";
import userImage2 from "../../assets/images/user/img-02.jpg";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, authReset } from "../../redux/Extra/authSlice";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const NavBar = (props) => {
  // Auth
  const [cookies, setCookie] = useCookies();
  const { isLogoutSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );
  let Token = cookies.token;
  let Role = localStorage.getItem("role");
  let both = localStorage.getItem("both");

  const history = useHistory();
  const dispatch = useDispatch();

  // NavItems
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [jobs, setJobs] = useState(false);
  const [candidates, setCandidates] = useState(false);
  const [ownerReports, setOwnerReports] = useState(false);
  const [findWork, setFindWork] = useState(false);
  const [myJobs, setMyJobs] = useState(false);
  const [subReports, setSubReports] = useState(false);

  //Notification Dropdown
  const [notification, setNotification] = useState(false);
  const dropDownnotification = () => setNotification((prevState) => !prevState);

  //user Profile Dropdown
  const [userProfile, setUserProfile] = useState(false);
  const dropDownuserprofile = () => setUserProfile((prevState) => !prevState);

  //scroll navbar
  const [navClass, setnavClass] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  // Auth
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isLogoutSuccess) {
      history.push("/signin");
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

  const switchAccount = (e) => {
    const accountToSwitch = e.target.name;

    localStorage.setItem("role", accountToSwitch);

    accountToSwitch === "sub"
      ? history.push("/job-list")
      : history.push("/job-post");
  };

  const logoutHandler = (e) => {
    dispatch(logoutUser());
    history.push("/signin");
  };

  const scrollNavigation = () => {
    var scrollup = window.pageYOffset;

    if (scrollup > 0) {
      setnavClass("nav-sticky");
    } else {
      setnavClass("");
    }
  };

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

  const activateParentDropdown = (item) => {
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
  };

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
            <NavbarToggler
              className="me-3"
              type="button"
              onClick={() => toggle()}
            >
              <i className="mdi mdi-menu"></i>
            </NavbarToggler>
          </div>
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="navbarCollapse"
          >
            <ul className="navbar-nav mx-auto navbar-center">
              {Role === "owner" ? (
                <>
                  <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="#"
                      id="ownerJobs"
                      className="arrow-none"
                      onClick={() => setJobs(!jobs)}
                    >
                      Jobs <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: jobs,
                        }
                      )}
                      aria-labelledby="ownerJobs"
                    >
                      <li>
                        <Link className="dropdown-item" to="/job-post">
                          Post a Job
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" to="/my-jobs">
                          My Jobs
                        </Link>
                      </li> */}
                      <li>
                        <Link className="dropdown-item" to="/all-jobs">
                          All Job Posts
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" to="#">
                          All Contracts
                        </Link>
                      </li> */}
                    </ul>
                  </NavItem>
                  <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="#"
                      id="ownerTalent"
                      role="button"
                      onClick={() => setCandidates(!candidates)}
                    >
                      Talent <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: candidates,
                        }
                      )}
                      aria-labelledby="ownerTalent"
                    >
                      <li>
                        <Link className="dropdown-item" to="/candidate-list">
                          Discover
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" to="#">
                          Your hires
                        </Link>
                      </li> */}
                      <li>
                        <Link className="dropdown-item" to="/saved-talents">
                          Saved Talent
                        </Link>
                      </li>
                    </ul>
                  </NavItem>
                  {/* <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="#"
                      id="ownerReporst"
                      role="button"
                      onClick={() => setOwnerReports(!ownerReports)}
                    >
                      Reports <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: ownerReports,
                        }
                      )}
                      aria-labelledby="ownerReporst"
                    ></ul>
                  </NavItem> */}

                  <NavItem>
                    <Link className="nav-link" to="#">
                      Messages
                    </Link>
                  </NavItem>
                </>
              ) : (
                ""
              )}
              {Role === "sub" ? (
                <>
                  <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="/job-list"
                      id="subFindWork"
                      className="arrow-none"
                      onClick={() => setFindWork(!findWork)}
                    >
                      Find Work <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: findWork,
                        }
                      )}
                      aria-labelledby="subFindWork"
                    >
                      <li>
                        <Link className="dropdown-item" to="/job-list">
                          Find Work
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/saved-jobs">
                          Saved Jobs
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/proposals">
                          Proposals
                        </Link>
                      </li>
                    </ul>
                  </NavItem>
                  <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="/active-contracts"
                      id="subMyJobs"
                      role="button"
                      onClick={() => setMyJobs(!myJobs)}
                    >
                      My Jobs <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: myJobs,
                        }
                      )}
                      aria-labelledby="subMyJobs"
                    >
                      <li>
                        <Link className="dropdown-item" to="/active-contracts">
                          My Jobs
                        </Link>
                      </li>
                      {/* <li>
                        <Link className="dropdown-item" to="#">
                          All Contracts
                        </Link>
                      </li> */}
                    </ul>
                  </NavItem>
                  {/* <NavItem className="dropdown dropdown-hover">
                    <NavLink
                      to="#"
                      id="subReports"
                      role="button"
                      onClick={() => setSubReports(!subReports)}
                    >
                      Reports <div className="arrow-down"></div>
                    </NavLink>
                    <ul
                      className={classname(
                        "dropdown-menu dropdown-menu-center",
                        {
                          show: subReports,
                        }
                      )}
                      aria-labelledby="subReports"
                    ></ul>
                  </NavItem> */}

                  <NavItem>
                    <Link className="nav-link" to="#">
                      Messages
                    </Link>
                  </NavItem>
                </>
              ) : (
                ""
              )}
            </ul>
          </Collapse>

          {Token ? (
            <ul className="header-menu list-inline d-flex align-items-center mb-0">
              <Dropdown
                onClick={() => setUserProfile(!userProfile)}
                isOpen={userProfile}
                toggle={dropDownuserprofile}
                className="list-inline-item"
              >
                <DropdownToggle
                  to="#"
                  className="header-item"
                  id="userdropdown"
                  type="button"
                  tag="a"
                  aria-expanded="false"
                >
                  <img
                    src={
                      currentUser?.avatar == null
                        ? userImage2
                        : currentUser?.avatar
                    }
                    alt="mdo"
                    width="35"
                    height="35"
                    className="rounded-circle me-1"
                  />{" "}
                  <span className="d-none d-md-inline-block fw-medium">
                    {currentUser?.first_name + " " + currentUser?.last_name}
                  </span>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-end"
                  aria-labelledby="userdropdown"
                  end
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  {both === "true" && Role == "sub" ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        name="owner"
                        onClick={switchAccount}
                      >
                        Owner
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  {both === "true" && Role == "owner" ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        to="#"
                        name="sub"
                        onClick={switchAccount}
                      >
                        SubContractor
                      </Link>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={logoutHandler}
                    >
                      Log out
                    </Link>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </ul>
          ) : (
            <ul className="navbar-nav mx-auto navbar-center">
              <NavItem>
                <Link className="nav-link" to="/signin">
                  Log In
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/choose-option">
                  Sign Up
                </Link>
              </NavItem>
            </ul>
          )}
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(NavBar);
