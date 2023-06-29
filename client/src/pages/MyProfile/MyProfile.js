import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { profileReset, getProfile } from "../../redux/Profile/profileSlice";
import "./index.css";

const MyProfile = () => {
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get("from");
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.profile);
  const role = localStorage.getItem("role");

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    } else if (isSuccess) {
      const result = message !== "" ? toast.success(message) : null;
    }
    dispatch(profileReset());
  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(getProfile({ id: myParam, role: role }));
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>My Profile | Bidderbadger</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <LeftSideContent />
            <RightSideContent />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default MyProfile;
