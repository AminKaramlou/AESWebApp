// @flow
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import manager from "assets/img/emoji-avatars/Manager.png"

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    margin:"auto",
    marginTop: 10,
    width: 220,
    height: 300,
    maxWidth: "100%",
    maxHeight: "100%"
  },
  button: {
    position:"absolute",
    marginLeft: -320
  },
}));

function speak(state, jobs) {
  let msg = new SpeechSynthesisUtterance();
  if (state === "sad") {
    msg.text = "I am overworked ";
  }
  if (state === "neutral") {
    msg.text = "I am happy with how much work I have.";
  }
  if (state === "happy") {
    msg.text = "I am underworked.";
  }
  let action = "";
  for (let job of jobs) {
    if (job.actions.length !== 0) {
      action += `${job.actions[0].reason}`;
      break;
    }
  }
  msg.text += action;
  let voices = window.speechSynthesis.getVoices();
  console.log(voices);
  msg.voice = voices[0];
  speechSynthesis.speak(msg);
}

function Title(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={11}>
        <Avatar alt="Nurse" src={manager} className={classes.bigAvatar} />
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="How are you?" placement="right">
        <IconButton
          className={classes.button}
          aria-label="speak"
          onClick={() => {
            speak(props.machineState, props.jobs);
          }}
        >
          <ChatBubbleOutline />
        </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={12}>
        {props.title}
      </Grid>
    </Grid>
  );
}

export default Title;
