import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

import controlsStyle from "assets/jss/material-kit-react/views/mainPageSections/controlsStyle.jsx"
import Tooltip from "@material-ui/core/Tooltip"

class SectionControls extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.fabDiv}>
        <Tooltip
          title="Add Resource"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={e => {
              this.props.onAddResourceButtonClick()
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    )
  }
}

export default withStyles(controlsStyle)(SectionControls)
