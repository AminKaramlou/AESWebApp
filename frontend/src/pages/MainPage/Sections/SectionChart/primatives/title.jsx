// @flow
import styled from "@emotion/styled";
import { colors } from "@atlaskit/theme";
import { grid } from "../constants";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import NurseImg from "assets/img/nurse-avatar.png";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function Title(props) {
  const classes = useStyles();

  return (
    <h4>
      <Avatar alt="Nurse" src={NurseImg} className={classes.bigAvatar} />
      {props.title}
    </h4>
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
