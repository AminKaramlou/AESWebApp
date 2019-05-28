import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// React icons

// core components
import Header from "components/material-kit-react/Header/Header.jsx";
import Footer from "components/material-kit-react/Footer/Footer.jsx";
import HeaderLinks from "components/material-kit-react/Header/HeaderLinks.jsx";

import publicationsPageStyle from "assets/jss/material-kit-react/views/publicationsPage.jsx";

// Sections for this page
import TeamSection from "./Sections/PapersSection.jsx";

class PublicationsPage extends React.Component {
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
          <div className={classes.container}>
            <TeamSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(publicationsPageStyle)(PublicationsPage);
