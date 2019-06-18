// @flow
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid } from "../constants";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";


const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function speak (state, jobs) {
  let msg = new SpeechSynthesisUtterance();
  if (state === "sad") {
    msg.text = "I am overworked "
  }
  if (state === "neutral") {
    msg.text = "I am happy with how much work I have."
  }
  if (state === "happy") {
    msg.text = "I am underworked."
  }
  let action = ""
  console.log(jobs)
  for (let job of jobs) {
    if (job.actions.length !== 0) {
      action += `${job.actions[0].reason}`;
      break;
    }
  }
  msg.text += action
  let voices = window.speechSynthesis.getVoices()
  console.log(voices)
  msg.voice = voices[0]
  speechSynthesis.speak(msg)
}

function Title(props) {
  const classes = useStyles();

  return (
    <div>
      <Avatar alt="Nurse" src={props.image} className={classes.bigAvatar} />
      <IconButton className={classes.button} aria-label="Delete">
        <ChatBubbleOutline onClick={() => {speak(props.machineState, props.jobs)}}/>
      </IconButton>
      {props.title}
    </div>
  );
}

export default styled(Title)`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid ${colors.P100};
    outline-offset: 2px;
  }
`;
