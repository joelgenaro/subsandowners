import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

const Clock = ({ city }) => {
  const [time, setTime] = useState(moment().tz(city)?.format("hh:mm A"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(city).format("hh:mm A"));
    }, 1000);
    return () => clearInterval(interval);
  }, [city]);

  return (
    <React.Fragment>
      <>{time}</>
    </React.Fragment>
  );
};

export default Clock;
