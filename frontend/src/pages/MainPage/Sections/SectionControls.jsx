import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

import controlsStyle from "assets/jss/material-kit-react/views/mainPageSections/controlsStyle.jsx"
import Tooltip from "@material-ui/core/Tooltip"
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    flexBasis: 50,
  },
}));


function NewJobInput(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    jobLength: '10',
  });

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value});
  };

  return (
    <FormControl
      className={clsx(
        classes.margin,
        classes.withoutLabel,
        classes.textField
      )}
    >
      <Input
        id="adornment-add-job"
        value={values.jobLength}
        onChange={handleChange('jobLength')}
        endAdornment={
          <InputAdornment position="end">Mins</InputAdornment>
        }
        aria-describedby="add-job-helper-text"
        inputProps={{
          "aria-label": "Add job"
        }}
      />
      <Tooltip
        title="Add Job"
        classes={{ tooltip: classes.tooltip }}
        placement="bottom"
      >
        <Fab
          color="primary"
          aria-label="Add job"
          className={classes.fab}
          onClick={() => {
            props.onAddJobButtonClick(values.jobLength)
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <FormHelperText id="add-job-helper-text">Add job</FormHelperText>
    </FormControl>
  )
}

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
        <NewJobInput onAddJobButtonClick={this.props.onAddJobButtonClick}/>
      </div>
    )
  }
}

export default withStyles(controlsStyle)(SectionControls)
