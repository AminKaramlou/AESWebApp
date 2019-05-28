import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from "@material-ui/icons/Save"
import PlayArrow from "@material-ui/icons/PlayArrow"
import CloudUpload from "@material-ui/icons/CloudUpload"

import controlsStyle from "assets/jss/material-kit-react/views/mainPageSections/controlsStyle.jsx"
import Tooltip from "@material-ui/core/Tooltip"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormControl from "@material-ui/core/FormControl"
import Avatar from "@material-ui/core/Avatar"

class SectionControls extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.fabDiv}>
        <Tooltip
          title="Solve debate"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            aria-label="Play"
            className={classes.fab}
            data-tut="find-winners"
            onClick={e => {
              this.props.onFindWinnersButtonClick()
            }}
          >
            <PlayArrow />
          </Fab>
        </Tooltip>
        <Tooltip
          title="Add argument"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            data-tut="argument-input"
            onClick={e => {
              this.props.onAddArgumentButtonClick()
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <Tooltip
          title="Save Debate"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            aria-label="Save"
            className={classes.fab}
            data-tut="save-button"
            onClick={e => {
              this.props.onSaveButtonClick()
            }}
          >
            <SaveIcon />
          </Fab>
        </Tooltip>

        <label htmlFor="myInput">
          <input
            id="myInput"
            type="file"
            className={classes.input}
            onChange={e => {
              this.props.onFileUpload(e)
            }}
          />
          <Tooltip
            title="Upload debate"
            classes={{ tooltip: classes.tooltip }}
            placement="bottom"
          >
            <Fab className={classes.fab} color="primary">
              <CloudUpload />
            </Fab>
          </Tooltip>
        </label>
        <Tooltip
          title="Tutorial"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            aria-label="Tutorial"
            className={classes.fab}
            onClick={e => {
              this.props.onQuickstartButtonClick()
            }}
          >
            <Avatar className={classes.avatar}>?</Avatar>
          </Fab>
        </Tooltip>
        <Tooltip
          title="Semantics"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            variant="extended"
            aria-label="Save"
            className={classes.fab}
          >
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Semantics"
                name="Semantics"
                className={classes.group}
                value={this.props.semantics}
                onChange={e => {
                  this.props.onSemanticsChange(e)
                }}
                row
              >
                <FormControlLabel
                  classes={{ label: classes.label }}
                  value="preferred"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Preferred"
                />
                <FormControlLabel
                  classes={{ label: classes.label }}
                  value="stable"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Stable"
                />
              </RadioGroup>
            </FormControl>
          </Fab>
        </Tooltip>
        <Tooltip
          title="Support interpretation"
          classes={{ tooltip: classes.tooltip }}
          placement="bottom"
        >
          <Fab
            color="primary"
            variant="extended"
            aria-label="Save"
            className={classes.fab}
          >
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="Support"
                name="Support"
                className={classes.group}
                value={this.props.supportInterpretation}
                onChange={e => {
                  this.props.onSupportInterpretationChange(e)
                }}
                row
              >
                <FormControlLabel
                  classes={{ label: classes.label }}
                  value="deductive"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Deductive"
                />
                <FormControlLabel
                  classes={{ label: classes.label }}
                  value="necessary"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Necessary"
                />
              </RadioGroup>
            </FormControl>
          </Fab>
        </Tooltip>
        <Fab
          variant="extended"
          className={classes.fab}
          data-tut="data-tut-status-button"
        >
          Status: {this.props.status}
        </Fab>
      </div>
    )
  }
}

export default withStyles(controlsStyle)(SectionControls)
