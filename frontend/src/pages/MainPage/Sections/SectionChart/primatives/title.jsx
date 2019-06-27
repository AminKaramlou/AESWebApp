// @flow
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import { fontSizeAverage } from "../constants";

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin: "auto",
    marginTop: 10,
    width: 400,
    height: 500,
    maxWidth: "100%",
    maxHeight: "100%"
  },
  button: {
    position: "absolute",
    marginLeft: -320
  },
  titleDiv: {
    textAlign: "center",
    marginTop: 150,
    marginBottom: 150
  }
}));

const LargeTooltip = withStyles(theme => ({
  tooltip: {
    fontSize: fontSizeAverage,
    minWidth: 800
  }
}))(Tooltip);

function speak(isFemale, text) {
  let msg = new SpeechSynthesisUtterance();
  msg.text = text;
  let voices = window.speechSynthesis.getVoices();
  if (isFemale) {
    msg.voice = voices[49];
  } else {
    msg.voice = voices[50];
  }

  speechSynthesis.speak(msg);
}

function Title(props) {
  const classes = useStyles();
  const state = props.machineState;
  let text = "";
  if (state === "sad") {
    text = "I am sad because my colleagues jobs are not allocated efficiently ";
  }
  if (state === "angry") {
    text = "I am angry because my jobs are not allocated efficiently";
  }
  if (state === "happy") {
    if (props.title === "Alice") {
      text = "I am happy because all the nurses have the right amount of work";
    } else {
      text = "I am happy because we can take care of all the patients";
    }
  }
  if (state === "thinking") {
    text = "I think the schedule can still be improved";
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <LargeTooltip title={text} placement="right">
          <Avatar
            alt="Nurse"
            src={props.image}
            className={classes.bigAvatar}
            onClick={() => {
              speak(props.isFemale, text);
            }}
          />
        </LargeTooltip>
      </Grid>
      <Grid item xs={12} className={classes.titleDiv}>
        <Box fontSize={150}>{props.title}</Box>
      </Grid>
    </Grid>
  );
}

export default Title;
