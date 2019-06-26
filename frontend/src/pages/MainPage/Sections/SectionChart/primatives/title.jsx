// @flow
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

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

function speak(state, jobs, isFemale) {
  let msg = new SpeechSynthesisUtterance();
  if (state === "sad") {
    msg.text =
      "I am sad because my colleagues jobs are not allocated efficiently ";
  }
  if (state === "angry") {
    msg.text = "I am angry because my jobs are not allocated efficiently";
  }
  if (state === "happy") {
    msg.text = "I am happy because we can take care of all the patients";
  }
  if (state === "thinking") {
    msg.text = "I think the schedule can still be improved";
  }
  let voices = window.speechSynthesis.getVoices();

  window.speechSynthesis.onVoicesChanged = () => {};

  if (isFemale) {
    msg.voice = voices[49];
  } else {
    msg.voice = voices[50];
  }

  speechSynthesis.speak(msg);
}

function Title(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Tooltip title="How are you?" placement="right">
          <Avatar
            alt="Nurse"
            src={props.image}
            className={classes.bigAvatar}
            onClick={() => {
              speak(props.machineState, props.jobs, props.isFemale);
            }}
          />
        </Tooltip>
      </Grid>
      <Grid item xs={12} className={classes.titleDiv}>
        <Box fontSize={200}>{props.title}</Box>
      </Grid>
    </Grid>
  );
}

export default Title;
