import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

import { Link } from "gatsby"

// @material-ui/icons

// React icons

// core components
import GridContainer from "components/material-kit-react/Grid/GridContainer.jsx"
import GridItem from "components/material-kit-react/Grid/GridItem.jsx"
import Card from "components/material-kit-react/Card/Card.jsx"
import CardBody from "components/material-kit-react/Card/CardBody.jsx"

import papersStyle from "assets/jss/material-kit-react/views/publicationsPageSections/papersStyle.jsx"

import demoPaper from "assets/papers/demo-paper.pdf"
import complexityPaper from "assets/papers/complexity-paper.pdf"

class PapersSection extends React.Component {
  render() {
    const { classes } = this.props
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgCardTop,
      classes.imgFluid
    )
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Project Publications</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
                  <Link to={complexityPaper}>
                    {" "}
                    <img
                      src={complexityPaper}
                      alt="..."
                      className={imageClasses}
                    />{" "}
                  </Link>
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Complexity Results and Algorithms for Bipolar Argumentation
                </h4>
                <h5 className={classes.cardTitle}> Abstract </h5>
                <CardBody classes>
                  <p align="justify" className={classes.description}>
                    Bipolar Argumentation Frameworks (BAFs) admit several
                    interpretations of the support relation and diverging
                    definitions of semantics. Recently, several classes of BAFs
                    have been captured as instances of bipolar Assumption-Based
                    Argumentation, a class of Assumption-Based Argumentation
                    (ABA). In this paper, we establish the complexity of bipolar
                    ABA, and consequently of several classes of BAFs. In
                    addition to the standard five complexity problems, we
                    analyse the rarely-addressed extension enumeration problem
                    too. We also advance backtracking-driven algorithms for
                    enumerating extensions of bipolar ABA frameworks, and conse
                    quently of BAFs under several interpretations. We prove
                    soundness and completeness of our algorithms, describe their
                    implementation and provide a scalability evaluation. We thus
                    contribute to the study of the as yet uninvestigated
                    complexity problems of (variously interpreted) BAFs as well
                    as of bipolar ABA, and provide the lacking implementations
                    thereof.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card plain>
                <GridItem xs={6} sm={6} md={6} className={classes.itemGrid}>
                  <Link to={demoPaper}>
                    <img src={demoPaper} alt="..." className={imageClasses} />
                  </Link>
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Deciding the Winner of a Debate Using Bipolar Argumentation
                </h4>
                <h5> Abstract </h5>
                <CardBody>
                  <p align="justify" className={classes.description}>
                    Bipolar Argumentation Frameworks (BAFs) are an important
                    class of argumentation frameworks useful for capturing,
                    reasoning with, and deriving conclusions from debates. They
                    have the potential to make solid contributions to real-world
                    multi-agent systems and human-agent interaction in domains
                    such as legal reasoning, healthcare and politics. Despite
                    this fact, practical systems implementing BAFs are largely
                    lacking. In this demonstration, we provide a software system
                    implementing novel algorithms for calculating extensions
                    (winning sets of arguments) of BAFs. Participants in the
                    demonstration will be able to input their own debates into
                    our system, and watch a graphical representation of the
                    algorithms as they process information and decide which sets
                    of arguments are winners of the debate.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

export default withStyles(papersStyle)(PapersSection)
