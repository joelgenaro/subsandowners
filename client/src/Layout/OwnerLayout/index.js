import React, { Suspense } from "react";

//Importing Section
// const TopBar = import("../OwnerLayout/TopBar");
import TopBar from "../OwnerLayout/TopBar";
import NavBar from "../OwnerLayout/NavBar";
import Subscribe from "../OwnerLayout/Subscribe";
import Footer from "../OwnerLayout/Footer";
import StyleSwitcher from "../OwnerLayout/StyleSwitcher";
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
