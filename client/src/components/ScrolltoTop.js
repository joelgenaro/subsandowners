import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";

const ScrolltoTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const toggleVisible = () => {
    const scrolled = document.body.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  };

  return (
    <Button
      id="back-to-top"
      className="p-0"
      onClick={scrollTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <i className="mdi mdi-arrow-up"></i>
    </Button>
  );
};

export default ScrolltoTop;
