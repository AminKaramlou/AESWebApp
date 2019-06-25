import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
});

const actions = [
  { icon: <SaveIcon />, name: "Save" },
  { icon: <CloudUploadIcon />, name: "Upload" }
];

class SpeedDials extends React.Component {
  state = {
    open: false,
    hidden: false
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    const speedDialClassName = clsx(classes.speedDial);

    return (
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={speedDialClassName}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
        direction="up"
      >
        <SpeedDialAction
          key={"Save"}
          icon={<SaveIcon />}
          tooltipTitle={"Save"}
          onClick={e => {
            this.props.onSaveClick();
            this.handleClick();
          }}
        />
        <input
          id="myInput"
          type="file"
          ref={ref => (this.upload = ref)}
          style={{ display: "none" }}
          onChange={e => {
            this.props.onFileUpload(e.target.files[0]);
            this.handleClick();
          }}
        />
        <SpeedDialAction
          key={"Upload"}
          icon={<CloudUploadIcon />}
          tooltipTitle={"Upload"}
          onClick={e => this.upload.click()}
        />
        ))}
      </SpeedDial>
    );
  }
}

SpeedDials.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SpeedDials);
