import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container, Row } from "reactstrap";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import Section from "./Section";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { profileReset, getProfile } from "../../redux/Profile/profileSlice";

const MyProfile = ({ match }) => {
  const {
    params: { userId },
  } = match;

  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.profile);

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    }
    dispatch(profileReset());
  }, [isSuccess, isError, message, history, dispatch]);

  useEffect(() => {
    dispatch(getProfile(userId));
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
