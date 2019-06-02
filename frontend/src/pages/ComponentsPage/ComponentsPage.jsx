import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/material-kit-react/Header/Header.jsx";
import Footer from "components/material-kit-react/Footer/Footer.jsx";
// sections for this page
import HeaderLinks from "components/material-kit-react/Header/HeaderLinks.jsx";
import SectionBasics from "./Sections/SectionBasics.jsx";
import SectionNavbars from "./Sections/SectionNavbars.jsx";
import SectionTabs from "./Sections/SectionTabs.jsx";
import SectionPills from "./Sections/SectionPills.jsx";
import SectionNotifications from "./Sections/SectionNotifications.jsx";
import SectionTypography from "./Sections/SectionTypography.jsx";
import SectionJavascript from "./Sections/SectionJavascript.jsx";
import SectionCarousel from "./Sections/SectionCarousel.jsx";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.jsx";
import SectionLogin from "./Sections/SectionLogin.jsx";

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class ComponentsPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          brand="Bipolar Argumentation Solver"
          rightLinks={<HeaderLinks />}
          fixed
          color= "rose"
          {...rest}
        />
        <div className={classNames(classes.main)}>
          <SectionBasics />
          <SectionNavbars />
          <SectionTabs />
          <SectionPills />
          <SectionNotifications />
          <SectionTypography />
          <SectionJavascript />
          <SectionCarousel />
          <SectionCompletedExamples />
          <SectionLogin />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(ComponentsPage);
