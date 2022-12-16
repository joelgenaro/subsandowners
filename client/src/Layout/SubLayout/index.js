import React, { Suspense } from "react";

//Importing Section
// const TopBar = import("../SubLayout/TopBar");
import TopBar from "../SubLayout/TopBar";
import NavBar from "../SubLayout/NavBar";
import Subscribe from "../SubLayout/Subscribe";
import Footer from "../SubLayout/Footer";
import StyleSwitcher from "../SubLayout/StyleSwitcher";
import ScrolltoTop from "../../components/ScrolltoTop";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Suspense>
        <div>
          <TopBar />
          <NavBar />
          <div className="main-content">
            <div className="page-content">{props.children}</div>
          </div>
          <Subscribe />
          <ScrolltoTop />
          <Footer />
          <StyleSwitcher />
        </div>
      </Suspense>
    </React.Fragment>
  );
};

export default Layout;
