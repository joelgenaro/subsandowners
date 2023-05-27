import React, { useEffect } from "react";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import Content from "./Content";
import Section from "./Section";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, settingsReset } from "../../redux/Extra/settingsSlice";

const Settings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector(
    (state) => state.settings
  );

  // Check message
  useEffect(() => {
    if (isError) {
      toast.error(message);
      if (message === "Not authorized!") {
        history.push("/signin");
      }
    }else{
      const result = message !== "" ? toast.success(message) : null;
    }

    dispatch(settingsReset());
  }, [isSuccess, isError, message, history, dispatch]);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Bidderbadger</title>
      </MetaTags>
      <Section />
      <section className="section">
        <Container>
          <Content />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Settings;
