/*eslint-disable*/
import React from "react"
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import List from "@material-ui/core/List/index"
import ListItem from "@material-ui/core/ListItem/index"
import Tooltip from "@material-ui/core/Tooltip/index"

// @material-ui/icons
import { Subject, MailOutline } from "@material-ui/icons/index"

// React icons
import { FaGithub } from "react-icons/fa/index"

// core components
import Button from "components/material-kit-react/CustomButtons/Button.jsx"

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx"

import complexityPaper from "assets/papers/demo-paper.pdf"

function HeaderLinks({ ...props }) {
  const { classes } = props
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="github"
          title="Source code on GitHub"
          placement={
            typeof window !== "undefined" && window.innerWidth > 959
              ? "top"
              : "left"
          }
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://github.com/AminKaram/BipolarABAWebApp"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <FaGithub />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="paper"
          title="Read the publications"
          placement={
            typeof window !== "undefined" && window.innerWidth > 959
              ? "top"
              : "left"
          }
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href='/publications-page'
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Subject className={classes.icons} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="email"
          title="Email us"
          placement={
            typeof window !== "undefined" && window.innerWidth > 959
              ? "top"
              : "left"
          }
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="mailto:mak514@ic.ac.uk"
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <MailOutline className={classes.icons} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  )
}

export default withStyles(headerLinksStyle)(HeaderLinks)
