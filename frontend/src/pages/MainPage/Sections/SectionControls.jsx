import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import controlsStyle from "assets/jss/material-kit-react/views/mainPageSections/controlsStyle.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Column from "./SectionChart/column";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 50
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  group: {
    margin: theme.spacing(1, 0),
  },
}));

function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    jobLength: "10",
    assignee: props.machines[0],
    pfd: "",
    nfd: []
  });

  const handleChange = prop => event => {
    console.log(values.jobLength);
    setValues({ ...values, [prop]: event.target.value });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new job
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new job</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter job details below</DialogContentText>
          <FormControl
            className={clsx(
              classes.margin,
              classes.withoutLabel,
              classes.textField
            )}
          >
            <Input
              id="adornment-job-length"
              value={values.jobLength}
              onChange={handleChange("jobLength")}
              endAdornment={
                <InputAdornment position="end">Mins</InputAdornment>
              }
              aria-describedby="job-length-helper-text"
              inputProps={{
                "aria-label": "job-length"
              }}
            />
            <FormHelperText id="job-length-helper-text">
              Job length
            </FormHelperText>
          </FormControl>
          <FormControl
            className={clsx(
              classes.margin,
              classes.withoutLabel,
              classes.textField
            )}
          >
            <InputLabel htmlFor="age-simple">Assignee</InputLabel>
            <Select
              value={values.assignee}
              onChange={handleChange("assignee")}
              inputProps={{
                name: "assignee",
                id: "assignee"
              }}
            >
              {props.machines.map((key: string, index: number) => (
                <MenuItem value={key.name}> {key.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Must be assigned to</FormLabel>
            <RadioGroup
              aria-label="pfd"
              name="pfd"
              className={classes.group}
              value={values.pfd}
              onChange={handleChange("pfd")}
            >
              {props.machines.map((key: string, index: number) => (
                <FormControlLabel value={key.name} control={<Radio />} label={key.name} />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onAddJobButtonClick(values.jobLength, values.assignee);
              handleClose();
            }}
            color="primary"
          >
            Add job
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
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
              this.props.onAddResourceButtonClick();
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <FormDialog
          onAddJobButtonClick={this.props.onAddJobButtonClick}
          machines={this.props.machines}
        />
      </div>
    );
  }
}

export default withStyles(controlsStyle)(SectionControls);
